"use client"

import { LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export function LogoutButton() {
    const router = useRouter();
    async function logout(e: any) {
        e.preventDefault();
        const response = await fetch("/api/auth/logout", {
            method: "POST",
        });
        if (response.ok) {
            router.push("/auth/login");
        }
    }

    return (
        <Button onClick={logout} variant="default">
            <LogOut className="mr-2 h-5 w-5" />
            Logout
        </Button>
    )
}