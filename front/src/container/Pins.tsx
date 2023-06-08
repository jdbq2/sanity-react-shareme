import { FC, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Navbar, PinDetail, CreatePin, Feed, Search } from "../components";
import { UserFromSanity } from "../interfaces/sanity_interfaces";

interface Props {
  user: UserFromSanity | undefined;
}

const Pins: FC<Props> = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  return (
    <div className="px-2 md:px-5">
      <div>
        <Navbar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          user={user && user}
        />
      </div>
      <div className="h-full">
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/category/" element={<Navigate to="/" replace />} />
          <Route path="/category/:categoryId" element={<Feed />} />
          <Route path="/pin-detail/" element={<Navigate to="/" replace />} />
          <Route
            path="/pin-detail/:pinId"
            element={<PinDetail user={user && user} />}
          />
          <Route
            path="/create-pin"
            element={<CreatePin user={user && user} />}
          />
          <Route
            path="/search"
            element={
              <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default Pins;
