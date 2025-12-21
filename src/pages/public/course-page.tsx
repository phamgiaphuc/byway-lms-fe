import CourseFilter from "@/pages/public/course-filter";
import CourseList from "@/pages/public/course-list";

const CoursePage = () => {
  return (
    <div className="container mx-auto flex min-h-[calc(100vh-20rem)] flex-col space-y-6 px-5 py-10 pb-5">
      <div>
        <h1 className="text-2xl font-semibold capitalize">Explore courses</h1>
      </div>
      <div className="grid grid-cols-[300px_1fr] gap-12">
        <CourseFilter />
        <CourseList />
      </div>
    </div>
  );
};

export default CoursePage;
