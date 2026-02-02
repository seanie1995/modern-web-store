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
    </div>
  );
};

export default HeroSection;
