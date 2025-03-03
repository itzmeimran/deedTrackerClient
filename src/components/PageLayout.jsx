import React from "react";

const PageLayout = ({ sectionHeading, sectionDescription, children }) => {
  return (
    <div className="border m-auto border-black sm:w-[380px] md:w-[calc(100%-10rem)] pt-4 pb-4 h-fit min-h-[100vh]">
      <div className=" border-b border-black">
        <h1 className="sm:text-sm md:text-xl sm:font-bold text-center">
          {sectionHeading}
        </h1>
        <p className="sm:text-sm sm:font-semibold text-center">
          {sectionDescription}
        </p>
      </div>
      <div className="p-5 flex flex-col gap-3">{children}</div>
    </div>
  );
};

export default PageLayout;
