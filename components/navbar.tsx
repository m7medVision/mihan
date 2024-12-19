import * as React from "react"
import Link from "next/link"
import { User, Briefcase, LogIn, LogOut } from 'lucide-react'

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
import { NewJobDialog } from "./new-job-dialog"
import { getUserFromToken } from "@/lib/actions"
import { LogoutButton } from "./logout"

const Navbar = async () => {
  const userData = await getUserFromToken()
  const isLoggedIn = !userData.error
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex justify-center">
      <div className="container flex h-14 items-center justify-between px-4">
        <div className="mr-4 hidden md:flex">
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
                          <NewJobDialog />
                        </li>
                        <li>
                          <NavigationMenuLink href="/my-job" className="text-muted-foreground hover:text-foreground">My Job</NavigationMenuLink>
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
    </header>
  )
}

export default Navbar

