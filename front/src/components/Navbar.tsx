import { ChangeEvent, Dispatch, FC, SetStateAction } from "react";
import { useNavigate, Link } from "react-router-dom";
import { IoMdAdd, IoMdSearch } from "react-icons/io";
import { UserFromSanity } from "../interfaces/sanity_interfaces";

interface Props {
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  user: UserFromSanity | undefined;
}

const Navbar: FC<Props> = ({ searchTerm, setSearchTerm, user }) => {
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  if (!user) {
    return null;
  }
  return (
    <div className="flex gap-2 md:gap-5 w-full mt-5 pb-7">
      <div className="flex justify-start items-center w-full px-2 rounded-md bg-white border-none outline-none focus-within:shadow-sm">
        <IoMdSearch fontSize={21} className={"ml-1"} />
        <input
          type="text"
          onChange={handleChange}
          placeholder="search"
          value={searchTerm}
          onFocus={() => navigate("/search")}
          className="p-2 w-full bg-white outline-none"
        />
      </div>
      <div className="flex gap-3">
        <Link to={`/user-profile/${user?._id}`} className="hidden md:block">
          <img src={user?.image} className="w-12 h-10 rounded-lg" alt="user" />
        </Link>
        <Link to={`/create-pin`} className="hidden md:block">
          <IoMdAdd className="bg-black text-white rounded-lg w-10 h-10 " />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
