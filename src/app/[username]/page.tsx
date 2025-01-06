import Image from "next/image";
import { LinkCard } from "@/components/link-card/link-card";
import placeholder from "@/assets/product-default.svg";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const links = [
  {
    title: "My GitHub",
    url: "https://github.com",
    image: placeholder,
  },
  {
    title: "My Portfolio",
    url: "https://example.com/portfolio",
    image: placeholder,
  },
  {
    title: "My Blog",
    url: "https://example.com/blog",
    image: placeholder,
  },
  {
    title: "Contact Me",
    url: "mailto:example@example.com",
    image: placeholder,
  },
];

const profileImage = placeholder;

const socialLinks = [
  { icon: Facebook, url: "https://facebook.com" },
  { icon: Twitter, url: "https://twitter.com" },
  { icon: Instagram, url: "https://instagram.com" },
  { icon: Linkedin, url: "https://linkedin.com" },
];

const bgVideo =
  "https://fg92krreal8mypv5.public.blob.vercel-storage.com/urlfern/these%20clouds%20spotify%20canvas-BgxPR1YQkp3sjStMxVCz2lfTSFARD9.mp4";

/*
user {
    username: string;
    avatar: string;
    bio: string;
    links: {
        title: string;
        url: string;
        image: string;
    }[];
    socials: { // get icons from https://icons.getbootstrap.com/
        platform: string;
        url: string;
    }[];
}
*/

export default function LinksPage({
  params,
}: {
  params: { username: string };
}) {
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
          {/* Your browser does not support the video tag. */}
        </video>
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
      </div>
      <div className="relative z-10 min-h-screen bg-black bg-opacity-50 px-4 py-8 flex flex-col">
        <div className="max-w-md mx-auto flex-grow">
          {/* Profile Info*/}
          <div className="flex items-center mb-6 justify-center">
            <Image
              src={profileImage}
              alt="Profile Picture"
              width={100}
              height={100}
              className="rounded-full border-2 border-gray-200 flex-shrink-0"
            />
            <div className="ml-4 flex flex-col items-start">
              <h1 className="text-3xl font-bold text-white">Tesko</h1>
              {/* <h2 className="text-md font-bold text-gray-300">
                @{params.username}
              </h2> */}
              <p className="mt-2 text-gray-200 max-w-sm">
                Web developer passionate about creating awesome user
                experiences.
              </p>
            </div>
          </div>

          {/* Links */}
          <div className="space-y-1 gap-1 flex flex-col">
            {links.map((link, index) => (
              <LinkCard key={index} {...link} />
            ))}
          </div>

          {/* Social Links */}
          <div className="mt-8 flex justify-center space-x-4">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
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
