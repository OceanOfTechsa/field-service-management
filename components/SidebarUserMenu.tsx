"use client"

import {
    ChevronsUpDown,
    LogOut,
    Settings, Sparkles,
    UserRound, UserRoundGroup,
} from "lucide-react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

export function SidebarUserMenu() {
    return (
        <div className="sidebar-switcher flex flex-col gap-2">
            <DropdownMenu>
                <DropdownMenuTrigger
                    render={
                        <button
                            type="button"
                            className="sidebar-switcher-trigger flex h-12 w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 focus-visible:ring-sidebar-ring data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <Avatar className="sidebar-switcher-avatar size-8 shrink-0">
                                <AvatarImage
                                    src="/images/avatars/avatar-1.webp"
                                    alt="Alex Morgan"
                                />
                                <AvatarFallback>AM</AvatarFallback>
                            </Avatar>

                            <div className="sidebar-switcher-details grid min-w-0 flex-1 text-left leading-tight">
                        <span className="truncate text-sm font-medium">
                            Alex Morgan
                        </span>
                                <span className="truncate text-xs text-muted-foreground">
                            Admin
                        </span>
                            </div>

                            <ChevronsUpDown className="sidebar-switcher-chevron ml-auto size-4 shrink-0 text-muted-foreground opacity-70" />
                        </button>
                    }>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                    className="w-56 text-muted-foreground"
                    side="top"
                    align="end"
                    sideOffset={8}
                >
                    <DropdownMenuGroup>
                        <DropdownMenuLabel className="font-normal">
                            <div className="flex items-center gap-2">
                                <Avatar className="size-8">
                                    <AvatarImage
                                        src="/images/avatars/avatar-1.webp"
                                        alt="Alex Morgan"
                                    />
                                    <AvatarFallback>AM</AvatarFallback>
                                </Avatar>

                                <div className="grid min-w-0">
                                    <span className="truncate text-sm font-medium">
                                        Alex Morgan
                                    </span>
                                    <span className="truncate text-xs text-muted-foreground">
                                        Admin
                                    </span>
                                </div>
                            </div>
                        </DropdownMenuLabel>

                        <DropdownMenuSeparator />

                        <DropdownMenuItem>
                            <Sparkles />
                            Upgrade to Pro
                        </DropdownMenuItem>

                        <DropdownMenuSeparator />

                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <UserRound />
                                Profile
                            </DropdownMenuItem>

                            <DropdownMenuItem>
                                <Settings />
                                Account Settings
                            </DropdownMenuItem>

                            <DropdownMenuItem>
                                <UserRoundGroup />
                                Organisation Management
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuGroup>

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