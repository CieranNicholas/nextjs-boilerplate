import Image from "next/image";
import placeholder from "@/assets/product-default.svg";
import { getUserByUsername } from "@/actions/user.actions";
import { TabSelector } from "@/app/[username]/_components/tab-selector";
import { getLinksByUserId } from "@/data-access/links";
import { SOCIAL_PLATFORMS } from "@/constants";
import { X } from "lucide-react";

// todo: helper method to ensure https:// is prepended to the url

const bgVideo =
  "https://fg92krreal8mypv5.public.blob.vercel-storage.com/urlfern/these%20clouds%20spotify%20canvas-BgxPR1YQkp3sjStMxVCz2lfTSFARD9.mp4";

export default async function ArtistPage({
  params,
}: {
  params: { username: string };
}) {
  const user = await getUserByUsername(params.username);
  if (!user) return <div>User not found</div>;

  const links = await getLinksByUserId(user.id);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src={bgVideo} type="video/mp4" />
        </video>
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
      </div>
      <div className="relative z-10 min-h-screen bg-black bg-opacity-50 px-4 py-8 flex flex-col">
        <div className="max-w-md mx-auto flex-grow">
          {/* Profile Info */}
          <div className="flex items-center mb-6 justify-center">
            <Image
              src={user.avatar || placeholder}
              alt="Profile Picture"
              width={100}
              height={100}
              className="rounded-full border-2 border-gray-200 flex-shrink-0"
            />
            <div className="ml-4 flex flex-col items-start">
              <h1 className="text-3xl font-bold text-white">{user.username}</h1>
              <p className="mt-2 text-gray-200 max-w-sm">{user.description}</p>
            </div>
          </div>

          {/* Tab Selector */}
          <TabSelector links={links} />

          {/* Social Links */}
          <div className="mt-8 flex justify-center space-x-4">
            {SOCIAL_PLATFORMS.filter(
              (platform) => user[platform.value as keyof typeof user],
            ).map((platform, index) => (
              <a
                key={index}
                href={
                  platform.prefix + user[platform.value as keyof typeof user] ||
                  ""
                }
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-300 transition-colors"
              >
                {platform.icon ? <platform.icon size={24} /> : <X size={24} />}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
