import { removeCard, updateCard } from "~/utils/db";
import type { Route } from "../+types/about";
import { redirect } from "react-router";
import { saveImage } from "~/utils/card-repo";

export async function action({ request, params }: Route.ActionArgs) {
  const id = params.cardId;
  if (request.method === "DELETE") {
    try {
      if (id) {
        await removeCard(Number(id));
      }
    } catch (err) {
      console.error(err);
    }
    return { success: true, message: `Card with ID ${id} has been deleted.` };
  } else if (request.method === "PUT") {
    const formData = await request.formData();

    const title = formData.get("title");
    const content = formData.get("content");
    const tier = formData.get("tier");
    const answer = formData.get("answer");
    const supercard = formData.get("supercard");
    const file = formData.get("image");

    const box = formData.get("box");
    const reviewInterval = formData.get("reviewInterval");
    const nextReview = formData.get("nextReview");
    const lastReview = formData.get("lastReview");
    const reviewCount = formData.get("reviewCount");

    let image = null;

    if (file && file instanceof File) {
      if (file.size !== 0) {
        image = await saveImage(file);
      }
    }

    const data = {
      title,
      content,
      tier,
      answer,
      supercard,
      box,
      reviewInterval,
      nextReview,
      lastReview,
      reviewCount,
      image,
    };

    try {
      if (id) {
        await updateCard(Number(id), data);
      }
    } catch (err) {
      console.error(err);
    }
    return { success: true, message: `Card with ID ${id} has been updated.` };
  }
}

export default function API() {
  return <div>Card updated...</div>;
}
