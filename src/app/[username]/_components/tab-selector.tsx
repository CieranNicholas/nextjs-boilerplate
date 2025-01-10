"use client";

import { useState } from "react";
import { LinkCard } from "@/app/[username]/_components/link-card";
// import { ShowDates } from "./show-dates";
// import { MerchTab } from "./merch-tab";
import { LinkDto } from "@/data-access/links";
import { LinksTab } from "./links-tab";

export function TabSelector({ links }: { links: LinkDto[] }) {
  const [activeTab, setActiveTab] = useState("links");

  return (
    <div>
      {/* <div className="flex mb-4">
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
      </div> */}
      {activeTab === "links" && <LinksTab links={links} />}
      {/* {activeTab === "showDates" && <ShowDates />} */}
      {/* {activeTab === "merch" && <MerchTab />} */}
    </div>
  );
}
