import { useCallback, useEffect, useRef, useState } from "react";
import { HiMenu } from "react-icons/hi";
import { AiFillCloseCircle } from "react-icons/ai";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { Sidebar, UserProfile } from "../components";
import { client } from "../sanity/client";
import { Pins } from ".";
import { userQuery } from "../utils/data";
import { UserFromSanity } from "../interfaces/sanity_interfaces";
import Logo from "../assets/logo.png";

const Home = () => {
  const [toggleSidebar, setToggleSidebar] = useState<boolean>(false);
  const [user, setUser] = useState<UserFromSanity>();
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleRedirect = useCallback(() => {
    localStorage.clear();
    navigate("/login");
  }, [navigate]);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, 0);

    const userInfo = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user") || "")
      : handleRedirect();

    const query = userQuery(userInfo?.sub);
    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, [handleRedirect]);

  return (
    <div className="flex bg-gray md:flex-row flex-col h-screen transaction-height duration-75 ease-out">
      {/*Desktop Menu */}
      <div className="hidden md:flex h-screen flex-initial">
        <Sidebar user={user && user} />
      </div>
      {/*Mobile Menu */}
      <div className="md:hidden flex flex-row">
        <div className="p-2 w-full flex flex-row justify-between items-center shadow-md">
          <HiMenu
            fontSize={40}
            className="cursor-pointer"
            onClick={() => setToggleSidebar(true)}
          />
          <Link to="/">
            <img src={Logo} className="w-28" alt="logo" />
          </Link>
          <Link to={`user-profile/${user?._id}`}>
            <img src={user?.image} alt="" className="w-8 rounded-full" />
          </Link>
        </div>
        {toggleSidebar && (
          <div className="fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
            <div className="absolute w-full flex justify-end items-center p-2">
              <AiFillCloseCircle
                fontSize={30}
                className="cursor-pointer "
                onClick={() => setToggleSidebar(false)}
              />
            </div>
            <Sidebar user={user && user} closeToggle={setToggleSidebar} />
          </div>
        )}
      </div>
      {/*Page Content */}
      <div
        className="pb-2 flex-1 h-screen overflow-y-scroll bg-gray-50"
        ref={scrollRef}>
        <Routes>
          <Route path="/user-profile/:userId" element={<UserProfile />} />
          <Route path="/*" element={<Pins user={user && user} />} />
        </Routes>
      </div>
    </div>
  );
};

export default Home;
