import Image from "next/image";
import Link from "next/link";

interface LinkCardProps {
  title: string;
  url: string;
  image: string;
}

export function LinkCard({ title, url, image }: LinkCardProps) {
  return (
    <Link href={url} passHref>
      <div className="flex items-center p-2 bg-white rounded-lg border border-gray-200 transition-all hover:border-gray-300 hover:scale-105">
        <Image
          src={image}
          alt={title}
          width={50}
          height={50}
          className="rounded-md"
        />
        <span className="ml-4 text-lg font-medium text-gray-800">{title}</span>
      </div>
    </Link>
  );
}
