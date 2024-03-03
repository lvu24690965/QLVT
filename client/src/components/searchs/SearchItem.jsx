import React from "react";

const SearchItem = ({ title, children }) => {
  return (
    <div className="flex gap-2 flex-col border-r justify-center items-center">
      <h3 className="font-bold text-main-600">{title}</h3>
      {children}
    </div>
  );
};

export default SearchItem;
