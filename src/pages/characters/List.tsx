import { Typography, Button, Input } from "@material-tailwind/react";
import { Link, useLoaderData } from "react-router-dom";

import { Character, useCharacters } from "../../api/marvel/marvelApi";

export function CharacterList() {
  const { data, isLoading, error } = useCharacters();
  const loaderData = useLoaderData();
  console.log("loaderData", loaderData);
  return (
    <div className="">
      <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
        <div>
          <Typography variant="h5" color="blue-gray">
            Characters
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            These are details about the characterss
          </Typography>
        </div>
        <div className="flex w-full shrink-0 gap-2 md:w-max">
          <div className="w-full md:w-72">
            <Input label="Search" />
          </div>
          <Button className="flex items-center gap-3" size="sm">
            Search
          </Button>
        </div>
      </div>
      {isLoading ? (
        <div>isLoading</div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {data.map((item: Character) => (
            <div
              key={item.id}
              className="relative my-6 flex w-96 flex-col rounded-lg border border-slate-200 bg-white shadow-sm"
            >
              <div className="relative m-2.5 h-56 overflow-hidden rounded-md text-white">
                <img
                  alt={item.name}
                  src={`${item.thumbnail.path}.${item.thumbnail.extension}`}
                />
              </div>
              <div className="p-4">
                <h6 className="mb-2 text-xl font-semibold text-slate-800">
                  {item.name}
                </h6>
                <p className="font-light leading-normal text-slate-600">
                  {item.description}
                </p>
              </div>
              <div className="mt-2 px-4 pb-4 pt-0">
                <Link
                  className="rounded-md border border-transparent bg-slate-800 px-4 py-2 text-center text-sm text-black shadow-md transition-all hover:bg-slate-700 hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  to={`characters/${item.id}`}
                >
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
