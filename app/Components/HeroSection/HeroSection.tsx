import Image from "next/image";

const HeroSection = () => {
  return (
    <div className="mx-0">
      <Image
        src={"/images/hero-bg.jpg"}
        alt="Hero Section Background"
        width={1920}
        height={1080}
      />
      <h1 className="absolute inset-0 flex items-center justify-center text-white text-9xl font-bold pointer-events-none">
        CONSUME
      </h1>
    </div>
  );
};

export default HeroSection;
