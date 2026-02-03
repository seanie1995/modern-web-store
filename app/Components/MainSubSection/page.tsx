import Image from "next/image";

const SubSection = () => {
  return (
    <div className="relative ">
      <h1 className="absolute flex inset-0 items-center justify-center text-9xl font-bold text-white pointer-events-none">
        CONFORM
      </h1>
      <Image
        src={"/images/subsection-bg.jpg"}
        alt="Hero Section Background"
        width={1920}
        height={1080}
      />
    </div>
  );
};

export default SubSection;
