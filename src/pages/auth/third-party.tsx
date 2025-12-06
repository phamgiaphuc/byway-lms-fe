import { Spinner } from "@/components/ui/spinner";

const ThirdParty = () => {
  return (
    <div className="relative flex min-h-[calc(100vh-20rem)] flex-col">
      <div className="container mx-auto flex flex-1 items-center justify-center px-5">
        <p>
          <Spinner />
          Wait for redirecting to the home page...
        </p>
      </div>
    </div>
  );
};

export default ThirdParty;
