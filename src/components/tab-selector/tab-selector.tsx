"use client";

import { useState } from "react";
import { LinkCard } from "@/components/link-card/link-card";
import { ShowDates } from "./show-dates";
import { MerchTab } from "./merch-tab";
import placeholder from "@/assets/product-default.svg";

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

export function TabSelector() {
  const [activeTab, setActiveTab] = useState("links");

  return (
    <div>
      <div className="flex mb-4">
        <button
          className={`flex-1 py-2 px-4 text-center ${
            activeTab === "links"
              ? "bg-white text-black"
              : "bg-gray-700 text-white"
          } rounded-tl-lg rounded-tr-lg`}
          onClick={() => setActiveTab("links")}
        >
          Links
        </button>
        <button
          className={`flex-1 py-2 px-4 text-center ${
            activeTab === "showDates"
              ? "bg-white text-black"
              : "bg-gray-700 text-white"
          } rounded-tl-lg rounded-tr-lg`}
          onClick={() => setActiveTab("showDates")}
        >
          Show Dates
        </button>
        <button
          className={`flex-1 py-2 px-4 text-center ${
            activeTab === "merch"
              ? "bg-white text-black"
              : "bg-gray-700 text-white"
          } rounded-tl-lg rounded-tr-lg`}
          onClick={() => setActiveTab("merch")}
        >
          Merch
        </button>
      </div>
      {activeTab === "links" && (
        <div className="space-y-1 gap-1 flex flex-col">
          {links.map((link, index) => (
            <LinkCard key={index} {...link} />
          ))}
        </div>
      )}
      {activeTab === "showDates" && <ShowDates />}
      {activeTab === "merch" && <MerchTab />}
    </div>
  );
}
