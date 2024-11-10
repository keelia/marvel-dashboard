import { Input } from "@material-tailwind/react";
import { debounce } from "lodash";

const SearchBox = ({
  placeholder = "Search",
  onSearch,
}: {
  placeholder?: string;
  onSearch: (searchText: string) => void;
}) => (
  <div className="w-full md:w-72">
    <Input
      label={placeholder}
      onChange={(e) => debounce(onSearch, 300)(e.target.value)}
    />
  </div>
);
export default SearchBox;
