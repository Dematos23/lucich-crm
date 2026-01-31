"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  KanbanSquare,
  Briefcase,
  Users,
  HardDrive,
  Settings,
} from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar";
import Image from "next/image";

const navItems = [
  { href: "/funnel", label: "Funnel", icon: KanbanSquare },
  { href: "/opportunities", label: "Oportunidades", icon: Briefcase },
  { href: "/clients", label: "Clientes", icon: Users },
];

const secondaryNavItems = [
    { href: "/files", label: "Archivos", icon: HardDrive },
    { href: "/settings", label: "Ajustes", icon: Settings },
];

export function SidebarNav() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path || (path !== "/" && pathname.startsWith(path));
  };

  return (
    <>
      <SidebarHeader>
        <Link href="/funnel" className="flex items-center gap-2.5">
          <Image
            src="/logo-small.png"
            alt="Lucich CRM"
            width={32}
            height={32}
          />
          <div className="group-data-[collapsible=icon]:hidden">
            <h2 className="text-lg font-semibold text-sidebar-foreground">
              Lucich CRM
            </h2>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={isActive(item.href)}
                tooltip={item.label}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          {secondaryNavItems.map((item) => (
             <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={isActive(item.href)}
                tooltip={item.label}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarFooter>
    </>
  );
}
