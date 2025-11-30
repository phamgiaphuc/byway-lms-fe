import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Link } from "@tanstack/react-router";
import CourseImg from "@/assets/images/course.jpg";
import { Star } from "lucide-react";

const CourseSection = () => {
  return (
    <div>
      <div className="container mx-auto flex flex-col gap-6 px-5">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold capitalize">Top courses</h2>
          <Label asChild className="text-blue-500">
            <Link to="/">See All</Link>
          </Label>
        </div>
        <div className="grid grid-cols-4 gap-6">
          <Card>
            <CardContent className="space-y-4">
              <div className="relative h-48 overflow-hidden rounded-md">
                <img src={CourseImg} alt="Course image" className="object-cover" />
              </div>
              <div className="flex flex-col gap-2">
                <h5 className="text-lg font-semibold">Beginner’s Guide to Design</h5>
                <span className="text-muted-foreground">By Ronald Richards</span>
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <Star className="size-5 fill-yellow-500 stroke-yellow-500" />
                    <Star className="size-5 fill-yellow-500 stroke-yellow-500" />
                    <Star className="size-5 fill-yellow-500 stroke-yellow-500" />
                    <Star className="size-5 fill-yellow-500 stroke-yellow-500" />
                    <Star className="size-5 fill-yellow-500 stroke-yellow-500" />
                  </div>
                  <span className="text-xs font-semibold">(1200 Ratings)</span>
                </div>
                <span className="text-muted-foreground">
                  22 Total Hours. 155 Lectures. Beginner
                </span>
                <label className="text-xl font-semibold">$149.9</label>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="space-y-4">
              <div className="relative h-48 overflow-hidden rounded-md">
                <img src={CourseImg} alt="Course image" className="object-cover" />
              </div>
              <div className="flex flex-col gap-2">
                <h5 className="text-lg font-semibold">Beginner’s Guide to Design</h5>
                <span className="text-muted-foreground">By Ronald Richards</span>
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <Star className="size-5 fill-yellow-500 stroke-yellow-500" />
                    <Star className="size-5 fill-yellow-500 stroke-yellow-500" />
                    <Star className="size-5 fill-yellow-500 stroke-yellow-500" />
                    <Star className="size-5 fill-yellow-500 stroke-yellow-500" />
                    <Star className="size-5 fill-yellow-500 stroke-yellow-500" />
                  </div>
                  <span className="text-xs font-semibold">(1200 Ratings)</span>
                </div>
                <span className="text-muted-foreground">
                  22 Total Hours. 155 Lectures. Beginner
                </span>
                <label className="text-xl font-semibold">$149.9</label>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="space-y-4">
              <div className="relative h-48 overflow-hidden rounded-md">
                <img src={CourseImg} alt="Course image" className="object-cover" />
              </div>
              <div className="flex flex-col gap-2">
                <h5 className="text-lg font-semibold">Beginner’s Guide to Design</h5>
                <span className="text-muted-foreground">By Ronald Richards</span>
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <Star className="size-5 fill-yellow-500 stroke-yellow-500" />
                    <Star className="size-5 fill-yellow-500 stroke-yellow-500" />
                    <Star className="size-5 fill-yellow-500 stroke-yellow-500" />
                    <Star className="size-5 fill-yellow-500 stroke-yellow-500" />
                    <Star className="size-5 fill-yellow-500 stroke-yellow-500" />
                  </div>
                  <span className="text-xs font-semibold">(1200 Ratings)</span>
                </div>
                <span className="text-muted-foreground">
                  22 Total Hours. 155 Lectures. Beginner
                </span>
                <label className="text-xl font-semibold">$149.9</label>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="space-y-4">
              <div className="relative h-48 overflow-hidden rounded-md">
                <img src={CourseImg} alt="Course image" className="object-cover" />
              </div>
              <div className="flex flex-col gap-2">
                <h5 className="text-lg font-semibold">Beginner’s Guide to Design</h5>
                <span className="text-muted-foreground">By Ronald Richards</span>
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <Star className="size-5 fill-yellow-500 stroke-yellow-500" />
                    <Star className="size-5 fill-yellow-500 stroke-yellow-500" />
                    <Star className="size-5 fill-yellow-500 stroke-yellow-500" />
                    <Star className="size-5 fill-yellow-500 stroke-yellow-500" />
                    <Star className="size-5 fill-yellow-500 stroke-yellow-500" />
                  </div>
                  <span className="text-xs font-semibold">(1200 Ratings)</span>
                </div>
                <span className="text-muted-foreground">
                  22 Total Hours. 155 Lectures. Beginner
                </span>
                <label className="text-xl font-semibold">$149.9</label>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseSection;
