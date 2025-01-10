import { LayoutDashboard } from "lucide-react";
import ProtectedLayout from "@/components/protected-layout";
import LayoutSidebar from "@/components/layout-sidebar";
import { DASHBOARD_TABS } from "./tabs";
interface Props {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<Props> = ({ children }) => {
  const tabs = DASHBOARD_TABS;

  return (
    <ProtectedLayout redirectUrl="/auth">
      <div className="flex h-screen bg-background">
        <LayoutSidebar
          tabs={tabs}
          title="Dashboard"
          headerIcon={<LayoutDashboard />}
        />
        {children}
      </div>
    </ProtectedLayout>
  );
};

export default DashboardLayout;
