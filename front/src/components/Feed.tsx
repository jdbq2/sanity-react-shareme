import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { client } from "../sanity/client";
import { MasonryLayout, Spinner } from "./";
import { feedQuery, searchQuery } from "../utils/data";

const Feed = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pins, setPins] = useState();
  const { categoryId } = useParams();

  useEffect(() => {
    setIsLoading(true);
    if (categoryId) {
      const query = searchQuery(categoryId);
      client.fetch(query).then((data) => {
        setPins(data);
        setIsLoading(false);
      });
    } else {
      client.fetch(feedQuery).then((data) => {
        setPins(data);
        setIsLoading(false);
      });
    }
  }, [categoryId]);

  if (isLoading)
    return <Spinner message="We are adding new ideas to your feed" />;

  return <div>{pins && <MasonryLayout pins={pins} />}</div>;
};

export default Feed;
