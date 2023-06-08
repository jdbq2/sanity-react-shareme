import { Dispatch, FC, SetStateAction } from "react";

interface Props {
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
}

const Search: FC<Props> = ({ searchTerm, setSearchTerm }) => {
  return <div>Search</div>;
};

export default Search;
