import { getUserById } from "@/data-access/user";
import LinksTab from "./links-tab";
import { getUser } from "@/actions/session.actions";
import { getLinks } from "./links.actions";
import { getTheme } from "@/actions/theme.actions";

const LinksPage = async () => {
  const sessionUser = await getUser();
  const userId = sessionUser.user?.id;
  if (!userId) return null;
  const user = await getUserById(userId);
  const links = await getLinks(userId);
  const theme = await getTheme(userId);

  return (
    <main className="flex-1 p-8 overflow-y-auto bg-background">
      <div className="w-full max-w-5xl">
        <LinksTab user={user} userLinks={links} theme={theme} />
      </div>
    </main>
  );
};

export default LinksPage;
