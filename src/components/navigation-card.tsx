import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";

export type NavigationCardProps = {
  to?: string;
  icon: React.ReactNode;
  title: string;
  description: string;
};

export type ContentCardProps = Pick<NavigationCardProps, "title" | "icon" | "description">;

const ContentCard = (props: ContentCardProps) => {
  const { title, icon, description } = props;
  return (
    <Card className="border-input hover:border-primary h-full border p-6 transition-colors hover:shadow-[4px_4px_0px_0px_rgb(2,6,23)]">
      <CardHeader className="gap-0 p-0">
        <div className="text-primary [&_svg]:size-6">{icon}</div>
        <CardTitle className="mt-2 mb-1 text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
    </Card>
  );
};

export const NavigationCard = (props: NavigationCardProps) => {
  const { to, ...rest } = props;
  if (to) {
    return (
      <Link to={to}>
        <ContentCard {...rest} />
      </Link>
    );
  }
  return <ContentCard {...rest} />;
};

export default NavigationCard;
