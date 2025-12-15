import Greeting from "@/components/greeting";
import { formatDate } from "@/lib/helpers";
import CoverBackground from "@/assets/backgrounds/cover.png";
import { Bell, DollarSign, MessageSquare, Presentation } from "lucide-react";
import { NavigationCard, type NavigationCardProps } from "@/components/navigation-card";

const navs: NavigationCardProps[] = [
  {
    to: "/instructor/course",
    icon: <Presentation />,
    title: "Course",
    description: "Click here to view and manage courses",
  },
  {
    to: "/instructor/message",
    icon: <MessageSquare />,
    title: "Message",
    description: "Click here to view and manage messages",
  },
  {
    to: "/instructor/revenue",
    icon: <DollarSign />,
    title: "Revenue",
    description: "Click here to view and manage revenue",
  },
  {
    to: "/instructor/notification",
    icon: <Bell />,
    title: "Notification",
    description: "Click here to view and manage notification",
  },
];

const DashboardPage = () => {
  return (
    <div>
      <div className="bg-primary/5 border-input border-b px-20 py-10">
        <p className="text-muted-foreground text-lg font-medium">
          {formatDate(new Date(), "EEEE, MMMM d, yyyy")}
        </p>
        <Greeting />
        <p className="text-base font-medium">What would you like to do today?</p>
      </div>
      <div className="p-4">
        <div className="border-input relative max-h-48 overflow-hidden rounded-xl border">
          <img src={CoverBackground} className="object-cover object-center" />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4 px-4">
        {navs.map((nav) => (
          <NavigationCard
            key={nav.title}
            to={nav.to}
            title={nav.title}
            description={nav.description}
            icon={nav.icon}
          />
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
