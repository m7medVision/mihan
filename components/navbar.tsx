"use client"

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

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(true) // TODO: This should be replaced with actual auth logic

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
                          <Link href="/admin/application" passHref>
                            <NavigationMenuLink className="text-muted-foreground hover:text-foreground">
                              Applications
                            </NavigationMenuLink>
                          </Link>
                        </li>
                        <li>
                          <NewJobDialog />
                        </li>
                        <li>
                          <Link href="/" passHref>
                            <NavigationMenuLink className="text-muted-foreground hover:text-foreground">My Job</NavigationMenuLink>
                          </Link>
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
                  <div className="text-muted-foreground">something@gmail.com</div>
                  <User className="h-5 w-5" />
                </Button>
                <Button variant="default">
                  <LogOut className="mr-2 h-5 w-5" />
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/login" passHref>
                  <Button variant="outline">
                    <LogIn className="mr-2 h-5 w-5" />
                    Log in
                  </Button>
                </Link>
                <Link href="/signup" passHref>
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

