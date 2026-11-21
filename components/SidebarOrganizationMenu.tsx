"use client"

import {
    ChevronsUpDown,
    Check,
    Plus,
    Settings, Users,
    Replace, LogOut,
} from "lucide-react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuPortal,
    DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
    Avatar,
    AvatarFallback,
} from "@/components/ui/avatar"
import Link from "next/link";

const organizations = [
    {
        id: "nexa",
        name: "NexaCRM",
        plan: "Business plan",
        initials: "N",
    },
    {
        id: "ocean",
        name: "Ocean of Tech",
        plan: "Enterprise plan",
        initials: "OT",
    },
]

export function SidebarOrganizationMenu() {
    return (
        <div className="sidebar-switcher flex flex-col gap-2">
            <DropdownMenu>
                <DropdownMenuTrigger
                    render={
                        <button
                            type="button"
                            className="sidebar-switcher-trigger flex h-12 w-full items-center gap-2 overflow-hidden rounded-md p-1 text-left text-sm outline-none transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 focus-visible:ring-sidebar-ring data-[popup-open]:bg-sidebar-accent data-[popup-open]:text-sidebar-accent-foreground"
                        >
                            <Avatar className="sidebar-switcher-avatar size-8 shrink-0 rounded-md bg-transparent">
                                <AvatarFallback className="rounded-md bg-primary text-primary-foreground font-semibold">
                                    N
                                </AvatarFallback>
                            </Avatar>

                            <div className="sidebar-switcher-details grid min-w-0 flex-1 text-left leading-tight">
                                <span className="truncate text-sm font-semibold">
                                    Okasithuli Trading
                                </span>
                                <span className="truncate text-xs text-muted-foreground">
                                    Professional plan
                                </span>
                            </div>

                            <ChevronsUpDown className="sidebar-switcher-chevron ml-auto size-4 shrink-0 opacity-70" />
                        </button>
                    }
                />

                <DropdownMenuContent
                    className="w-60 bg-popover dark:bg-[#1d1d1d] text-muted-foreground"
                    side="bottom"
                    align="start"
                    sideOffset={8}
                >
                    <DropdownMenuGroup>
                        <DropdownMenuLabel>
                            Field Service Management
                        </DropdownMenuLabel>

                        <DropdownMenuItem className="p-0">
                            <Link href="/Settings" className="flex items-center gap-1 w-full px-1.5 py-1 hover:bg-muted rounded-md">
                                <Settings />
                                Settings
                            </Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem>
                            <Link href="/Settings/Users/Invite" className="flex items-center gap-1 w-full">
                                <Users />
                                Invite and manage members
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>

                    <DropdownMenuSeparator />

                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger className="cursor-pointer flex items-center gap-1">
                            <Replace  />
                            Switch Organisation
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent className="w-60 bg-popover dark:bg-[#1d1d1d] text-muted-foreground">
                                {organizations.map((organization) => (
                                    <DropdownMenuItem
                                        key={organization.id}
                                        className="gap-2"
                                    >
                                        <Avatar className="size-6 rounded-md">
                                            <AvatarFallback className="rounded-md bg-primary text-primary-foreground text-xs font-semibold">
                                                {organization.initials}
                                            </AvatarFallback>
                                        </Avatar>

                                        <div className="grid min-w-0 flex-1">
                                            <span className="truncate text-sm font-medium">
                                                {organization.name}
                                            </span>
                                        </div>

                                        {organization.id === "nexa" && (
                                            <Check className="ml-auto size-4" />
                                        )}
                                    </DropdownMenuItem>
                                ))}

                                <DropdownMenuSeparator />

                                <DropdownMenuItem>
                                    <Link href="/Settings/Users/Invite" className="flex items-center gap-1">
                                        <Plus />
                                        Create or join Organisation
                                    </Link>
                                </DropdownMenuItem>

                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem variant="destructive">
                        <LogOut />
                        Log out
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}