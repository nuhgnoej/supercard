import type { ActionFunctionArgs } from "react-router";
import { redirect } from "react-router";
import { sessionStorage } from "~/utils/session.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );

  return redirect("/login", {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session),
    },
  });
};
