import { Outlet } from "react-router";
import Top from "./Top";
import Footer from "./Footer";

export default function Navigation() {
  return (
    <div className="min-h-screen flex flex-col">
      <Top />
      <main className="bg-gray-100 flex justify-center items-center min-h-[calc(100vh-168px)]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
