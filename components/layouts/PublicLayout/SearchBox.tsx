"use client";

import React, { FC, useEffect } from "react";
import { usePostArticleGetArticleUsingSearch } from "@/hooks/apis/articleHookApi";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { FileText, Search, UserCheck } from "react-feather";
import { useSearchBox } from "@/components/providers/SearchBoxProvider";

const SearchBox = () => {
  //
  const {
    inputText,
    debouncedInputText,
    setInputText,
    isFocus,
    setIsFocus,
    searchBoxRef,
  } = useSearchBox();
  //
  const { data, isLoading } = usePostArticleGetArticleUsingSearch(
    inputText
      ? { "ArticleSearchViewModel.serachValue": debouncedInputText }
      : null,
  );
  //
  const handleClickOutside = (event: PointerEvent) => {
    if (
      searchBoxRef.current &&
      !searchBoxRef.current.contains(event.target as Node)
    ) {
      setIsFocus(false);
    }
  };
  //
  useEffect(() => {
    document.addEventListener("pointerdown", handleClickOutside);
    return () => {
      document.removeEventListener("pointerdown", handleClickOutside);
    };
  }, []);
  //
  return (
    <div className="relative" ref={searchBoxRef}>
      <span className="absolute start-0 top-0 grid size-11 place-items-center">
        <Search className="text-primary" />
      </span>
      <input
        className="h-11 w-full rounded border border-[#e9e7e7] ps-11"
        type="text"
        placeholder="جست و جو ..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onFocus={() => setIsFocus(true)}
      />
      <div
        className={cn(
          "absolute bottom-0 z-10 max-h-[350px] w-full translate-y-[calc(100%+5px)] overflow-y-auto rounded border border-[gainsboro] bg-[#f4f4f4] shadow-[0_5px_10px_0_rgba(0,0,0,0.22)]",
          { "pointer-events-none opacity-0": !isFocus },
        )}
      >
        {ListContent({
          isLoading,
          data,
          inputText,
          onLinkClicked: () => setIsFocus(false),
        })}
      </div>
    </div>
  );
};

interface ListContentProps {
  isLoading: boolean;
  data: any;
  inputText: any;
  onLinkClicked: () => void;
}

const ListContent: FC<ListContentProps> = ({
  isLoading,
  data,
  inputText,
  onLinkClicked,
}) => {
  if (inputText === "") {
    return <div className="p-2 text-center">مقاله خود را جستجو کنید ...</div>;
  } else if (data?.length === 0 && isLoading) {
    return <div className="p-2 text-center">در حال جستجو ...</div>;
  } else if (data?.length > 0) {
    return (
      <ul className="p-2">
        {data.map((suggestion: any) => {
          return (
            <li key={suggestion.Id}>
              <Link
                prefetch={false}
                href={`/article/${suggestion?.Id}/${suggestion.Name.replace(
                  " ",
                  "_",
                ).replace(/ /g, "_")}`}
                onClick={onLinkClicked}
                className="flex gap-2 rounded border-[1.5px] border-dashed border-transparent px-1 py-2 hover:border-[rgb(85,85,85)] hover:bg-[#dfdfdf]"
              >
                <div className="flex-grow overflow-hidden">
                  <div className="flex gap-1">
                    <FileText className="w-5 flex-shrink-0" />
                    <span className="truncate">{suggestion.Name}</span>
                  </div>
                  <div className="truncate ps-6 text-xs text-[gray]">
                    {suggestion.Breadcrumbs}
                  </div>
                </div>
                <div className="hidden flex-shrink-0 basis-1/4 sm:block">
                  <UserCheck className="w-5 flex-shrink-0" />
                  {suggestion.AuthorName}
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    );
  } else {
    return <div className="p-2 text-center">نتیجه ای یافت نشد!</div>;
  }
};

export default SearchBox;
