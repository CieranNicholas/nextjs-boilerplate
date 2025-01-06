import { getUserById } from "@/data-access/user";
import LinksTab from "./links-tab";
import { getUser } from "@/actions/session.actions";

const DashboardHome = async () => {
  const sessionUser = await getUser();
  const userId = sessionUser.user?.id;
  if (!userId) return null;
  const user = await getUserById(userId);

  return (
    <main className="flex-1 p-8 overflow-y-auto bg-background">
      <div className="w-full max-w-5xl">
        <LinksTab user={user} />
      </div>
    </main>
  );
};

export default DashboardHome;
