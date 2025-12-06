import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const DashboardPage = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-14 items-center px-4">
          <SidebarTrigger />
        </header>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardPage;
