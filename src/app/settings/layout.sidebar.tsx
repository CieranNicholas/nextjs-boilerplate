"use client";

import React from "react";
import { CreditCard, LayoutDashboard, Lock, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default async function SettingsLayoutSidebar() {
  const pathname = usePathname();

  const tabs = [
    {
      key: "account",
      label: "Account",
      icon: <Settings className={"mr-2 h-4 w-4"} />,
      href: "/settings/account",
    },
    {
      key: "security",
      label: "Security",
      icon: <Lock className={"mr-2 h-4 w-4"} />,
      href: "/settings/security",
    },
    {
      key: "billing",
      label: "Billing",
      icon: <CreditCard className={"mr-2 h-4 w-4"} />,
      href: "/settings/billing",
    },
  ];

  return (
    <aside className="w-64 bg-card p-6 shadow-md">
      <div className="flex items-center mb-8">
        <LayoutDashboard className="h-8 w-8 text-primary mr-2" />
        <h2 className="text-2xl font-bold text-foreground">Settings</h2>
      </div>
      <nav>
        {tabs.map((tab) => (
          <Link href={tab.href} key={tab.key}>
            <Button
              key={tab.key}
              className="w-full justify-start mb-2"
              variant={pathname === tab.href ? "default" : "ghost"}
            >
              {tab.icon}
              {tab.label}
            </Button>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
