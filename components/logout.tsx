"use client"

import { LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export function LogoutButton({ className }: { className?: string }) {
    const router = useRouter();
    async function logout(e: any) {
        e.preventDefault();
        const response = await fetch("/api/auth/logout", {
            method: "POST",
        });
        if (response.ok) {
            router.push("/auth/login");
            router.refresh();
        }
    }

    return (
        <Button onClick={logout} variant="default" className={className}>
            <LogOut className="mr-2 h-5 w-5" />
            Logout
        </Button>
    )
}