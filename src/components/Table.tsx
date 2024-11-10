import React, { ReactNode, useCallback, useEffect, useRef } from "react";
import Loading from "./Loading";
import { debounce } from "lodash";
export enum ActionPosition {
  Left,
  Right,
}

const Table = ({
  title,
  subTitle,
  columns,
  dataSource,
  isLoading,
  actions,
  allLoaded,
  onLoadMore,
}: {
  title: string;
  subTitle?: string;
  isLoading: boolean;
  columns: {
    dataKey: string;
    title?: ReactNode;
    className?: string;
    width?: number;
    onHeaderRender?: (title: any) => ReactNode;
    render?: (
      text: any,
      item: any,
      col: {
        colIndex: number;
        dataKey: string;
      },
    ) => ReactNode;
  }[];
  actions?: { key: string; position: ActionPosition; componnet: ReactNode }[];
  dataSource: any[];
  allLoaded: boolean;
  onLoadMore: () => void;
}) => {
  const scrollRef = useRef<{
    clientHeight: number;
    scrollHeight: number;
    scrollTop: number;
  }>();
  const onDebouncedScoll = useCallback(
    debounce(({ clientHeight, scrollHeight, scrollTop }) => {
      if (scrollRef.current) {
        const isScrollToBottom =
          scrollRef.current.scrollTop < scrollTop &&
          clientHeight + scrollTop >= scrollHeight * 0.75;
        if (isScrollToBottom && !allLoaded) {
          onLoadMore();
        }
      }
      scrollRef.current = { clientHeight, scrollHeight, scrollTop };
    }, 200),
    [scrollRef, allLoaded, onLoadMore],
  );

  return (
    <div className="flex h-full w-full flex-col rounded-xl bg-white bg-clip-border text-gray-700">
      <div className="mx-4 mt-4 overflow-hidden rounded-none bg-white bg-clip-border text-gray-700">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <h5 className="text-blue-gray-900 block font-sans text-xl font-semibold leading-snug tracking-normal antialiased">
              {title}
            </h5>
            <p className="mt-1 block font-sans text-base font-normal leading-relaxed text-gray-700 antialiased">
              {subTitle}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="block w-full">
            {actions
              ?.filter((action) => action.position === ActionPosition.Left)
              .map((action) => (
                <React.Fragment key={action.key}>
                  {action.componnet}
                </React.Fragment>
              ))}
          </div>
          <div className="w-full md:w-72">
            <div className="h-10 w-full min-w-[200px]">
              {actions
                ?.filter((action) => action.position === ActionPosition.Right)
                .map((action) => (
                  <React.Fragment key={action.key}>
                    {action.componnet}
                  </React.Fragment>
                ))}
            </div>
          </div>
        </div>
      </div>
      <div className="p-6 px-0">
        <div
          className="table-wrp block max-h-[80vh] overflow-y-auto"
          onScroll={(e) => onDebouncedScoll(e.target)}
        >
          <table className="w-full table-auto">
            <thead className="sticky top-0 z-10 border-b bg-white">
              <tr>
                {columns.map((col) => (
                  <th
                    key={col.dataKey}
                    className={`border-blue-gray-100 bg-blue-gray-50/50 hover:bg-blue-gray-50 cursor-pointer border-y p-4 transition-colors`}
                  >
                    <p className="text-blue-gray-900 flex items-center justify-between gap-2 font-sans text-sm font-normal leading-none antialiased opacity-70">
                      {col.onHeaderRender
                        ? col.onHeaderRender(col.title)
                        : col.title}
                    </p>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <Loading />
              ) : (
                dataSource.map((item, index) => (
                  <tr key={index}>
                    {columns.map((col, colIndex) => (
                      <td
                        key={`${col.dataKey}-${index}`}
                        className="border-blue-gray-50 w-1 overflow-hidden text-ellipsis text-wrap border-b p-4"
                      >
                        {col.render
                          ? col.render(item[col.dataKey], item, {
                              dataKey: col.dataKey,
                              colIndex,
                            })
                          : item[col.dataKey]}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Table;
