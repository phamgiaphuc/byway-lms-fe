import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Link } from "@tanstack/react-router";
import { Atom, Briefcase, Telescope, Terminal } from "lucide-react";

const CategorySection = () => {
  return (
    <div>
      <div className="container mx-auto flex flex-col gap-6 px-5">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold capitalize">Top categories</h2>
          <Label asChild className="text-blue-500">
            <Link to="/">See All</Link>
          </Label>
        </div>
        <div className="grid grid-cols-4 gap-6">
          <Card className="gap-2">
            <CardHeader className="flex flex-col items-center gap-4 text-center">
              <div className="flex size-20 items-center justify-center rounded-full bg-blue-100">
                <Telescope className="size-8 text-blue-500" />
              </div>
              <CardTitle className="text-lg">Astrology</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p>11 Courses</p>
            </CardContent>
          </Card>
          <Card className="gap-2">
            <CardHeader className="flex flex-col items-center gap-4 text-center">
              <div className="flex size-20 items-center justify-center rounded-full bg-blue-100">
                <Terminal className="size-8 text-blue-500" />
              </div>
              <CardTitle className="text-lg">Development</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p>11 Courses</p>
            </CardContent>
          </Card>
          <Card className="gap-2">
            <CardHeader className="flex flex-col items-center gap-4 text-center">
              <div className="flex size-20 items-center justify-center rounded-full bg-blue-100">
                <Briefcase className="size-8 text-blue-500" />
              </div>
              <CardTitle className="text-lg">Marketing</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p>11 Courses</p>
            </CardContent>
          </Card>
          <Card className="gap-2">
            <CardHeader className="flex flex-col items-center gap-4 text-center">
              <div className="flex size-20 items-center justify-center rounded-full bg-blue-100">
                <Atom className="size-8 text-blue-500" />
              </div>
              <CardTitle className="text-lg">Physics</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p>11 Courses</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CategorySection;
