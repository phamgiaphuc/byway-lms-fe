import CategorySection from "@/pages/home/category-section";
import CourseSection from "@/pages/home/course-section";
import HeroSection from "@/pages/home/hero-section";
import StatsSection from "@/pages/home/stats-section";
import SupportSection from "@/pages/home/support-section";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_public/")({
  component: Index,
});

function Index() {
  return (
    <div className="space-y-12">
      <HeroSection />
      <StatsSection />
      <CategorySection />
      <CourseSection />
      <SupportSection />
    </div>
  );
}
