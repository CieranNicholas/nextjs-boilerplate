import { redirect } from "next/navigation";
import { DASHBOARD_TABS } from "./tabs";

export default function Dashboard() {
  redirect(DASHBOARD_TABS[0].href);
}
