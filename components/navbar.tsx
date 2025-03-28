import * as React from "react"
import Link from "next/link"
import { User, Briefcase, LogIn, LogOut, Menu } from 'lucide-react'

import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { getUserFromToken } from "@/lib/actions"
import { LogoutButton } from "./logout"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import MobileNav from "./MobileNav"

const Navbar = async () => {
  const userData = await getUserFromToken()
  const isLoggedIn = !userData.error
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex justify-center">
      <div className="w-screen mx-10 h-14 items-center justify-between px-4 hidden md:flex">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Briefcase className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">Mihan</span>
          </Link>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Find Jobs
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              {
                isLoggedIn && (
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Admin</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="p-4 bg-popover rounded-md shadow-md space-y-2 w-60">
                        <li>
                          <NavigationMenuLink href="/admin/application" className="text-muted-foreground hover:text-foreground">
                            Applications
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink href="/admin/jobs" className="text-muted-foreground hover:text-foreground">My Job</NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink href="/admin/new-job" className="text-muted-foreground hover:text-foreground">New job</NavigationMenuLink>
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                )
              }
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center">
            {isLoggedIn ? (
              <div className="flex items-center space-x-2">
                <Button variant="outline">
                  <div className="text-muted-foreground">{userData.email}</div>
                  <User className="h-5 w-5" />
                </Button>
                <LogoutButton />
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/auth/login">
                  <Button variant="outline">
                    <LogIn className="mr-2 h-5 w-5" />
                    Log in
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button variant="default">Sign up</Button>
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>
      {/* Mobile Nav */}
      <div className="md:hidden flex justify-between items-center w-full px-4 h-14">
        <Link href="/" className="flex items-center space-x-2">
          <Briefcase className="h-6 w-6" />
          <span className="font-bold">Mihan</span>
        </Link>
        <MobileNav isLoggedIn={isLoggedIn} userData={userData} />
      </div>
    </header>
  )
}

export default Navbar

