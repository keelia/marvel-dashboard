import { useState } from "react";
import { Link } from "react-router-dom";
import { Typography, Tooltip } from "@material-tailwind/react";
import { ChevronUpDownIcon } from "@heroicons/react/24/outline";
import SearchBox from "../../components/SearchBox";
import Table, { ActionPosition } from "../../components/Table";
import Avatar from "../../components/Avatar";
import { useCharactersInfinite } from "../../api/marvelApi";
import { Character } from "../../model/Character";

export function CharacterList() {
  const [queryParams, setQueryParams] = useState({
    nameStartsWith: "",
    orderBy: "name",
    limit: 20,
    offset: 0,
  });
  const { characters, isLoading, allLoaded, size, setSize, isLoadMore } =
    useCharactersInfinite(queryParams);
  return (
    <Table
      title="Characters"
      isLoading={isLoading}
      isLoadMore={isLoadMore}
      allLoaded={allLoaded}
      onLoadMore={() => {
        if (!isLoading && !isLoadMore && !allLoaded) {
          setSize(size + 1);
        }
      }}
      actions={[
        {
          key: "search",
          position: ActionPosition.Right,
          componnet: (
            <SearchBox
              placeholder="Search by Name or Comics"
              onSearch={(search) =>
                setQueryParams((prev) => ({ ...prev, nameStartsWith: search }))
              }
            />
          ),
        },
      ]}
      dataSource={characters || []}
      columns={[
        {
          title: "Thumbnail",
          dataKey: "thumbnail",
          render: (
            thumbnail: {
              path: string;
              extension: string;
            },
            item: Character,
          ) => (
            <Avatar
              src={`${thumbnail.path}.${thumbnail.extension}`}
              alt={item.name}
            />
          ),
        },
        {
          title: "Name",
          dataKey: "name",
          onHeaderRender: (title) => (
            <Tooltip
              content={
                queryParams.orderBy.startsWith("-")
                  ? "Order by Asc"
                  : "Order by Desc"
              }
            >
              <Typography
                className="flex w-full justify-between text-left"
                onClick={() =>
                  setQueryParams((prev) => ({
                    ...prev,
                    orderBy: prev.orderBy.startsWith("-") ? "name" : "-name",
                  }))
                }
              >
                <>
                  {title}
                  <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                </>
              </Typography>
            </Tooltip>
          ),
        },
        {
          title: "Descriptions",
          dataKey: "description",
        },
        {
          dataKey: "id",
          render: (id: string) => (
            <Link to={`characters/${id}`}>Read More</Link>
          ),
        },
      ]}
    />
  );
}
