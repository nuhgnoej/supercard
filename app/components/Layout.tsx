import { Outlet, type LoaderFunctionArgs } from "react-router";
import Top from "./Top";
import Footer from "./Footer";

export default function Layout({ user }: { user: any }) {
  return (
    <div className="flex flex-col">
      <div>
        {/* <Top user={user} /> */}
        <main className="transparent flex flex-grow justify-center items-center min-h-[calc(100vh-210px)] mt-4 mb-4">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}
