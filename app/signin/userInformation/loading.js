
import React from "react";
import Image from "next/image";
const loading = () => {
  return (
    <div className="h-screen w-full absolute z-[105] bg-gray-100/85 flex justify-center items-center flex-col">
      <Image src="/loader.webp" alt="" className="w-[250px]" height={100} width={200} />
      <h1 className="bold text-xl ">Signin you in...</h1>
    </div>
  );
};

export default loading;
