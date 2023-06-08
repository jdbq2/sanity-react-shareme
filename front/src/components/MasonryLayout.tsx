import Masonry from "react-masonry-css";
import { Pin } from "./";
import { PinFromSanity } from "../interfaces/sanity_interfaces";
import { FC } from "react";

const breakpointObject = {
  default: 4,
  3000: 4,
  2000: 3,
  1200: 2,
  1000: 1,
  500: 1,
};

interface Props {
  pins: PinFromSanity[];
}

const MasonryLayout: FC<Props> = ({ pins }) => {
  return (
    <Masonry
      className="flex animate-slide-fws"
      breakpointCols={breakpointObject}>
      {pins.map((pin) => (
        <Pin key={pin._id} pin={pin} className={"w-max"} />
      ))}
    </Masonry>
  );
};

export default MasonryLayout;
