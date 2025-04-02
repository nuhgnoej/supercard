import type { LoaderFunctionArgs } from "react-router";
import { redirect, useLoaderData } from "react-router";
import { prisma } from "~/utils/db.server";
import { getSession } from "~/utils/session.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await getSession(request);
  const userId = session.get("userId");

  if (!userId) {
    return redirect("/login");
  }

  const user = await prisma.users.findUnique({ where: { id: userId } });
  if (!user) {
    return redirect("/login");
  }

  return { name: user.name, email: user.email };
};

export default function Dashboard() {
  const { name, email } = useLoaderData<typeof loader>();

  return (
    <div>
      <h1>대시보드</h1>
      <p>
        환영합니다, {name} ({email})님!
      </p>
      <form method="post" action="/logout">
        <button type="submit">로그아웃</button>
      </form>
    </div>
  );
}
