"use client"

import type React from "react"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { LayoutDashboard, Coins, History, ImageIcon, ActivityIcon, SettingsIcon, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  collapsed?: boolean
}

export function SidebarNav({ className, collapsed = false, ...props }: SidebarNavProps) {
  const pathname = usePathname()

  const routes = [
    {
      href: "/dashboard",
      icon: LayoutDashboard,
      title: "Dashboard",
    },
    {
      href: "/tokens",
      icon: Coins,
      title: "Tokens",
    },
    {
      href: "/transactions",
      icon: History,
      title: "Transactions",
    },
    {
      href: "/nfts",
      icon: ImageIcon,
      title: "NFTs",
    },
    {
      href: "/activity",
      icon: ActivityIcon,
      title: "Activity",
    },
    {
      href: "/settings",
      icon: SettingsIcon,
      title: "Settings",
    },
  ]

  return (
    <nav
      className={cn("flex flex-col gap-2 transition-all duration-300", collapsed ? "w-[60px]" : "w-[240px]", className)}
      {...props}
    >
      {routes.map((route) => {
        const isActive = pathname === route.href

        return (
          <Link key={route.href} href={route.href} passHref>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start relative h-10 transition-all",
                isActive ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:text-foreground",
                collapsed ? "px-2" : "px-4",
              )}
            >
              <route.icon className={cn("h-5 w-5 shrink-0", collapsed ? "mr-0" : "mr-2")} />

              {!collapsed && <span className="truncate">{route.title}</span>}

              {isActive && (
                <motion.div
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  layoutId="sidebar-indicator"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronRight className="h-4 w-4" />
                </motion.div>
              )}
            </Button>
          </Link>
        )
      })}
    </nav>
  )
}

