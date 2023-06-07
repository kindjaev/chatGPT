import Chat from "../components/Messages_AI/Chat";
import Model from "../components/Model";
import NavbarChatPage from "../components/NavbarChatPage";
import SideBar from "../components/Sidebar_AI/SideBar";

function Layout() {
  return (
    <div>
      <NavbarChatPage />
      <div className="flex">
        <div className="bg-[#202123] h-[calc(100vh-48px)] hidden md:block md:min-w-[20rem] overflow-y-auto text-gray-300">
          <SideBar />
        </div>
        <div className="md:hidden absolute left-[50%] translate-x-[-50%]">
          <Model />
        </div>
        <div className="bg-[#F2F2F2] flex-1 h-[calc(100vh-48px)] lg:px-[10%]">
          <Chat />
        </div>
      </div>
    </div>
  );
}

export default Layout;
