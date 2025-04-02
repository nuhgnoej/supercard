// app/utils/user.ts

import type { LoaderFunction } from "react-router";
import { useLoaderData } from "react-router";
import { prisma } from "~/utils/db.server";
import { getUserId } from "~/utils/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request);
  if (!userId) return { user: null };

  const user = await prisma.users.findUnique({ where: { id: userId } });
  if (!user) return { user: null };

  return { user: { id: user.id, name: user.name, email: user.email } };
};

export function useOptionalUser() {
  const data = useLoaderData<typeof loader>() ?? { user: null };
  return data.user;
}
