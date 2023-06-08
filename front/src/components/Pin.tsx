import { Link, useNavigate } from "react-router-dom";
import { FC, useState } from "react";
import { PinFromSanity } from "../interfaces/sanity_interfaces";
import { urlFor, client } from "../sanity/client";
import { v4 as uuidv4 } from "uuid";
import { MdDownloadForOffline } from "react-icons/md";
import { AiTwotoneDelete } from "react-icons/ai";
import { BsFillArrowUpRightCircleFill } from "react-icons/bs";
import { DecodedResponse } from "../interfaces/googleSignIn";

interface Props {
  pin: PinFromSanity;
  className?: string;
}

const Pin: FC<Props> = ({ pin }) => {
  const [postHovered, setPostHovered] = useState<boolean>(false);

  const navigate = useNavigate();

  const userInfo: DecodedResponse = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const alreadySaved = !!pin?.save?.filter(
    (item) => item.postedBy?._id === userInfo?.sub
  )?.length;

  const savePin = (id: string) => {
    if (!alreadySaved) {
      client
        .patch(id)
        .setIfMissing({ save: [] })
        .insert("after", "save[-1]", [
          {
            key: uuidv4(),
            userId: userInfo.sub,
            postedBy: {
              _type: "PostedBy",
              _ref: userInfo.sub,
            },
          },
        ])
        .commit()
        .then(() => window.location.reload());
    }
  };

  const deletePin = (id: string) => {
    client.delete(id).then(() => window.location.reload);
  };

  return (
    <div className="m-2">
      <div
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        onClick={() => navigate(`/pin-detail/${pin._id}`)}
        className="relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out">
        <img
          className="rounded-lg w-full"
          src={urlFor(pin.image).width(250).url()}
          alt="user-post"
        />
        {postHovered && (
          <div
            className="absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50"
            style={{ height: "100%" }}>
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <a
                  href={`${pin.image?.asset?.url}?dl=`}
                  download
                  onClick={(e) => e.stopPropagation()}
                  className="bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none">
                  <MdDownloadForOffline />
                </a>
              </div>
              {alreadySaved ? (
                <button
                  type="button"
                  className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none">
                  {pin.save?.length} Saved
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    savePin(pin._id);
                  }}
                  type="button"
                  className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none">
                  Save
                </button>
              )}
            </div>
            <div className="flex justify-between items-center gap-2 w-full">
              {pin.destination && (
                <a
                  onClick={(e) => e.stopPropagation()}
                  href={pin.destination}
                  target="_blank"
                  rel="noreferrer"
                  className=" bg-white flex items-center gap-2 text-black font-bold p-2 pl-4 pr-4 rounded-full opacity-70 hover:opacity-100 hover:shadow-md">
                  <BsFillArrowUpRightCircleFill />
                  {pin.destination.length > 20
                    ? pin.destination.slice(8, 20)
                    : pin.destination.slice(8)}
                </a>
              )}
              {pin.postedBy._id === userInfo.sub && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deletePin(pin._id);
                  }}
                  type="button"
                  className="flex items-center bg-white p-2 opacity-70 hover:opacity-100 text-black  rounded-3xl hover:shadow-md outline-none">
                  <AiTwotoneDelete />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      <Link
        to={`/user-profile/${userInfo.sub}`}
        className="flex gap-2 mt-2 items-center">
        <img
          src={userInfo.picture}
          alt="user-profile"
          className="w-8 h-8 rounded-full object-cover"
        />
        <p className="font-semibold capitalize">{pin.postedBy.userName}</p>
      </Link>
    </div>
  );
};

export default Pin;
