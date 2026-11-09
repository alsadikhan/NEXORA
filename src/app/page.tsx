import Banner from "@/components/homepage/banner";
import Categories from "@/components/homepage/categories";
import FeaturedProducts from "@/components/homepage/featured-products";
import BrandShowcase from "@/components/homepage/brand-showcase";

export default function Home() {
  return (
    <main>
      {/* Hero section with banner */}
      <Banner />
      
      {/* Main content sections */}
      <div className="pt-[500px] md:pt-[600px] lg:pt-[700px]">
        <Categories />
        <FeaturedProducts />
        <BrandShowcase />
        
        {/* Add other homepage sections here */}
      </div>
    </main>
  );
}
