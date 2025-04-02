import type { LoaderFunctionArgs } from "react-router";
import { getUser } from "~/utils/session.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user = await getUser(request);
  // console.log(user);
  return { user };
};
