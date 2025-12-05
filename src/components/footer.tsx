import { Link } from "@tanstack/react-router";
import GoogleLogo from "@/assets/brands/google.svg";
import FacebookLogo from "@/assets/brands/facebook.svg";

const Footer = () => {
  return (
    <div className="bg-primary">
      <div className="container mx-auto flex h-64 items-center justify-between px-5 text-white">
        <div className="max-w-[450px]">
          <div className="flex items-center gap-1">
            <img src="/favicon.svg" alt="Byway LMS" className="size-10" />
            <span className="text-xl font-medium">Byway</span>
          </div>
          <div className="mt-4 ml-2 space-y-1">
            <p className="leading-5 text-white/75">
              Empowering learners through accessible and engaging online education.
            </p>
            <p className="leading-5 text-white/75">
              Byway is a leading online learning platform dedicated to providing high-quality,
              flexible, and affordable educational experiences.
            </p>
          </div>
        </div>
        <div className="flex space-x-40">
          <div className="flex flex-col gap-2">
            <h5 className="text-lg font-medium">Get Help</h5>
            <Link to="/" className="text-white/75 hover:text-white">
              Contact Us
            </Link>
            <Link to="/" className="text-white/75 hover:text-white">
              Latest Artilces
            </Link>
            <Link to="/" className="text-white/75 hover:text-white">
              FAQ
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <h5 className="text-lg font-medium">Programs</h5>
            <Link to="/" className="text-white/75 hover:text-white">
              Art & Design
            </Link>
            <Link to="/" className="text-white/75 hover:text-white">
              Business
            </Link>
            <Link to="/" className="text-white/75 hover:text-white">
              IT Software
            </Link>
            <Link to="/" className="text-white/75 hover:text-white">
              Languages
            </Link>
            <Link to="/" className="text-white/75 hover:text-white">
              Programming
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <h5 className="text-lg font-medium">Contact Us</h5>
            <p className="text-white/75">Address: 123 Main Street, Anytown, CA 12345</p>
            <p className="text-white/75">Tel: +(123) 456-7890</p>
            <p className="text-white/75">Mail: bywayedu@webkul.in</p>
            <div className="mt-2 flex gap-4">
              <span className="flex size-10 items-center justify-center rounded-full bg-white">
                <img src={GoogleLogo} alt="Google" className="size-6" />
              </span>
              <span className="flex size-10 items-center justify-center rounded-full bg-white">
                <img src={FacebookLogo} alt="Facebook" className="size-6" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
