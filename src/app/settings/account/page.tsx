import { getUser } from "@/actions/session.actions";
import AccountTab from "./account-tab";

export default async function AccountSettingsPage() {
  const { user } = await getUser();
  if (!user) return null;
  return (
    <main className="flex-1 p-8 overflow-y-auto bg-background">
      <div className="w-full max-w-5xl">
        <AccountTab user={user} />
      </div>
    </main>
  );
}
