import Support1Img from "@/assets/images/support-1.png";
import Support2Img from "@/assets/images/support-2.png";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const SupportSection = () => {
  return (
    <div className="py-10">
      <div className="container mx-auto flex flex-col gap-10 px-5">
        <div className="flex items-center justify-evenly">
          <img src={Support1Img} alt="Support 1 image" className="w-[380px]" />
          <div className="flex max-w-[500px] flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h4 className="text-lg font-semibold">Become an Instructor</h4>
              <p className="font-light">
                Instructors from around the world teach millions of students on Byway. We provide
                the tools and skills to teach what you love.
              </p>
            </div>
            <Button className="w-fit">
              Start Your Instructor Journey
              <ArrowRight />
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-evenly">
          <div className="flex max-w-[500px] flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h4 className="text-lg font-semibold">Transform your life through education</h4>
              <p className="font-light">
                Learners around the world are launching new careers, advancing in their fields, and
                enriching their lives.
              </p>
            </div>
            <Button className="w-fit">
              Checkout Courses
              <ArrowRight />
            </Button>
          </div>
          <img src={Support2Img} alt="Support 2 image" className="w-[400px]" />
        </div>
      </div>
    </div>
  );
};

export default SupportSection;
