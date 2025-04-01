import { Outlet } from "react-router";
import Top from "./Top";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Top />
      <main
        className="bg-gray-100 flex justify-center items-center min-h-[calc(100vh-168px)]"
        style={{
          backgroundImage: 'url("pexels-alscre-2847648.jpg")', // 이미지 경로
          backgroundSize: "cover", // 이미지가 배경을 완전히 덮도록
          backgroundPosition: "center center", // 이미지를 중앙에 배치
          backgroundRepeat: "no-repeat",
        }}
      >
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
