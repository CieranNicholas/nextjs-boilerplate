import { getUser } from "@/lib/lucia";
import { redirect } from "next/navigation";

interface Props {
  children: React.ReactNode;
  redirectUrl?: string;
}

const ProtectedLayout: React.FC<Props> = async ({ children, redirectUrl }) => {
  const { user, session } = await getUser();

  if (!user || !session) {
    redirect(redirectUrl ?? "/");
  }

  return <>{children}</>;
};

export default ProtectedLayout;
