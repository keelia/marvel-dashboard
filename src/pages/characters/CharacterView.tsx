import { useParams } from "react-router-dom";
import { useCharacter } from "../../api/marvelApi";
import Loading from "../../components/Loading";
import { Avatar, Breadcrumbs } from "@material-tailwind/react";
import { Link } from "react-router-dom";

export function CharacterView() {
  const { characterId } = useParams();
  const { data, isLoading } = useCharacter(characterId);
  return (
    <div className="bg-gray-100">
      <Breadcrumbs className="m-2 bg-transparent">
        <Link to={"/"} className="opacity-60">
          Characters
        </Link>
        {!isLoading && <a href="#">{data?.name}</a>}
      </Breadcrumbs>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="bg-white p-6">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            <Avatar
              src={`${data?.thumbnail.path}.${data?.thumbnail.extension}`}
              alt={data?.name}
            />
            {data?.name}
          </h2>
          <div className="mx-auto grid max-w-2xl grid-cols-1 items-start gap-x-8 gap-y-16 py-24 sm:py-32 lg:max-w-7xl lg:grid-cols-2">
            <div>
              <p className="mt-4 text-gray-500">{data?.description}</p>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Comics
              </h2>
              <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
                {data?.comics?.items?.map((item: { name: string }) => (
                  <div
                    key={item.name}
                    className="border-t border-gray-200 pt-4"
                  >
                    {item.name}
                  </div>
                ))}
              </dl>
            </div>
            <div className="">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Series
              </h2>
              <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
                {data?.series?.items?.map((item: { name: string }) => (
                  <div
                    key={item.name}
                    className="border-t border-gray-200 pt-4"
                  >
                    {item.name}
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
