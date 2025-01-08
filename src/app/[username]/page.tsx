import Image from "next/image";
import placeholder from "@/assets/product-default.svg";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { getUserByUsername } from "@/actions/user.actions";
import { TabSelector } from "@/components/tab-selector/tab-selector";

const profileImage = placeholder;

const bgVideo =
  "https://fg92krreal8mypv5.public.blob.vercel-storage.com/urlfern/these%20clouds%20spotify%20canvas-BgxPR1YQkp3sjStMxVCz2lfTSFARD9.mp4";

export default async function LinksPage({
  params,
}: {
  params: { username: string };
}) {
  const user = await getUserByUsername(params.username);
  if (!user) {
    return <div>User not found</div>;
  }

  const socialLinks = [
    { icon: Facebook, url: "https://facebook.com/" + user.facebookUsername },
    { icon: Twitter, url: "https://twitter.com/" + user.twitterUsername },
    { icon: Instagram, url: "https://instagram.com/" + user.instagramUsername },
    { icon: Youtube, url: "https://youtube.com/" + user.youtubeUsername },
  ];

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
              src={profileImage}
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
          <TabSelector />

          {/* Social Links */}
          <div className="mt-8 flex justify-center space-x-4">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url || ""}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-300 transition-colors"
              >
                <link.icon size={24} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
