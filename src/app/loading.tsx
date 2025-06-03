import Image from "next/image";

const LoadingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <div className="relative flex items-center justify-center">
        <div
          style={{
            borderTop: "4px solid rgb(168 85 247)",
            borderBottom: "4px solid black",
          }}
          className="absolute w-32 h-32 border-t-2 border-b-2 border-purple-500 rounded-full animate-spin"
        ></div>
        <Image
          height={112}
          width={112}
          src="https://www.svgrepo.com/show/509001/avatar-thinking-9.svg"
          className="rounded-full h-28 w-28"
          alt="Loading..."
        />
      </div>
      <p className="mt-[20px] text-lg font-medium text-center text-gray-700 animate-pulse">
        Almost there...
      </p>
    </div>
  );
};

export default LoadingPage;
