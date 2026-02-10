import HeroSection from "./Components/HeroSection/HeroSection";
import SubSection from "./Components/MainSubSection/page";
import ProductGrid from "./Components/ui/ProductGrid";

export default function Home(params: PageProps<"/">) {
  return (
    <div>
      <main className="">
        <HeroSection />
        <ProductGrid searchParams={params.searchParams} />
        <SubSection />
      </main>
    </div>
  );
}
