'use client';
import * as React from "react"
import Link from "next/link"
import { User, Briefcase, LogIn, Menu } from 'lucide-react'

import { Button } from "@/components/ui/button"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { LogoutButton } from "./logout"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import { usePathname } from "next/navigation";
import { DialogTitle } from "@radix-ui/react-dialog";

interface MobileNavProps {
    isLoggedIn: boolean
    userData: { email: string } | { error: string }
}

const MobileNav: React.FC<MobileNavProps> = ({ isLoggedIn, userData }) => {
    const pathname = usePathname()
    const [isSheetOpen, setIsSheetOpen] = React.useState(false)
    React.useEffect(() => {
        setIsSheetOpen(false)
    }, [pathname])
    return (
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="mr-2">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle navigation menu</span>
                </Button>
            </SheetTrigger>
            <DialogTitle style={{ display: 'none' }}></DialogTitle>
            <SheetContent side="right">
                <div className="flex flex-col h-full">
                    <div className="flex items-center mb-6">
                        <Briefcase className="h-6 w-6 mr-2" />
                        <span className="font-bold">Mihan</span>
                    </div>
                    <nav className="space-y-4">
                        <Link href="/" className="block py-2 text-lg font-medium">
                            Find Jobs
                        </Link>
                        {isLoggedIn && (
                            <Accordion type="single" collapsible>
                                <AccordionItem value="admin">
                                    <AccordionTrigger>Admin</AccordionTrigger>
                                    <AccordionContent>
                                        <div className="pl-4 space-y-2">
                                            <Link href="/admin/application" className="block py-2">
                                                Applications
                                            </Link>
                                            <Link href="/admin/jobs" className="block py-2">
                                                My Job
                                            </Link>
                                            <Link href="/admin/new-job" className="block py-2">
                                                New job
                                            </Link>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        )}
                    </nav>
                    <div className="mt-auto">
                        {isLoggedIn ? (
                            <div className="space-y-4">
                                <Button variant="outline" className="w-full justify-start overflow-hidden">
                                    <User className="h-5 w-5 mr-2" />
                                    <div className="text-muted-foreground">
                                        {(userData as { email: string }).email}
                                    </div>
                                </Button>
                                <LogoutButton className="w-full" />
                            </div>
                        ) : (
                            <div className="flex flex-col space-y-4">
                                <Link href="/auth/login">
                                    <Button variant="outline" className="w-full">
                                        <LogIn className="mr-2 h-5 w-5" />
                                        Log in
                                    </Button>
                                </Link>
                                <Link href="/auth/register">
                                    <Button variant="default" className="w-full">Sign up</Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default MobileNav

