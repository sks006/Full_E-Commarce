
import Layout from "@/components/layout/Layout";
import HeroBanner from "@/components/home/HeroBanner";
import PromotionBanner from "@/components/home/PromotionBanner";
import CategoryGrid from "@/components/home/CategoryGrid";
import TrendingProductSection from "@/components/home/TrendingProductSection";
import WeeklyOfferSection from "@/components/home/WeeklyOfferSection";
import SummerCollection from "@/components/home/SummerCollection";
import BrandShowcase from "@/components/home/BrandShowcase";

const Index = () => {
  return (
    <Layout>
      <HeroBanner />
      <PromotionBanner />
      <CategoryGrid />
      <TrendingProductSection />
      <WeeklyOfferSection />
      <SummerCollection />
      <BrandShowcase />
    </Layout>
  );
};

export default Index;
