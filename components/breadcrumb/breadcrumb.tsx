"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import {
    ChevronDown,
    ChevronRight,
    FileText,
} from "lucide-react"

import type { LucideIcon } from "lucide-react"

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
    nav,
    navColorClasses,
    type NavColor,
} from "@/lib/navigation"

import {
    breadcrumbMenus,
    type BreadcrumbMenuItem,
} from "./breadcrumb-config"

// --------------------------------------------------
// Types
// --------------------------------------------------

type BreadcrumbsProps = {
    currentLabel?: string
    currentRole?: string
    className?: string
}

type ResolvedRoute = {
    title: string
    href: string
    icon: LucideIcon
    color: NavColor
}

// --------------------------------------------------
// Helpers
// --------------------------------------------------

const normalizePath = (path: string) => {
    const cleanPath = path.split("?")[0].split("#")[0]

    if (cleanPath === "/") return "/"

    return cleanPath.replace(/\/+$/, "")
}

const matchesRoute = (pathname: string, href: string) => {
    const path = normalizePath(pathname)
    const route = normalizePath(href)

    return path === route || path.startsWith(`${route}/`)
}

const canAccess = (
    roles: string[] | undefined,
    currentRole?: string,
) => {
    return !roles?.length || !currentRole || roles.includes(currentRole)
}

const resolveRoute = (
    pathname: string,
    currentRole?: string,
): ResolvedRoute | undefined => {
    const matches: ResolvedRoute[] = []

    for (const item of nav) {
        if (!canAccess(item.roles, currentRole)) continue

        // Grouped navigation: resolve the matching subitem.
        if (item.subs?.length) {
            for (const sub of item.subs) {
                if (!canAccess(sub.roles, currentRole)) continue
                if (!matchesRoute(pathname, sub.href)) continue

                matches.push({
                    title: sub.title,
                    href: sub.href,
                    icon: sub.icon ?? FileText,
                    color: item.color,
                })
            }

            continue
        }

        // Standalone navigation page.
        if (
            item.href !== "#" &&
            matchesRoute(pathname, item.href)
        ) {
            matches.push({
                title: item.title,
                href: item.href,
                icon: item.icon,
                color: item.color,
            })
        }
    }

    return matches.sort(
        (a, b) => b.href.length - a.href.length,
    )[0]
}

// --------------------------------------------------
// Dropdown
// --------------------------------------------------

function BreadcrumbDropdown({
                                items,
                                currentRole,
                            }: {
    items: BreadcrumbMenuItem[]
    currentRole?: string
}) {
    const visibleItems = items.filter(item => {
        if (item.type === "separator") return true
        return canAccess(item.roles, currentRole)
    })

    if (!visibleItems.some(item => item.type !== "separator")) {
        return null
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <button
                    type="button"
                    aria-label="Open breadcrumb menu"
                    className="ml-1 inline-flex size-6 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                    <ChevronDown className="size-3.5" />
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="start" className="w-56">
                {visibleItems.map((item, index) => {
                    if (item.type === "separator") {
                        return (
                            <DropdownMenuSeparator key={`separator-${index}`} />
                        )
                    }

                    const Icon = item.icon

                    if (item.type === "link") {
                        return (
                            <DropdownMenuItem key={item.href}>
                                <Link href={item.href}>
                                    {Icon && <Icon className="mr-2 size-4" />}

                                    <span className="flex flex-col">
                                        <span>{item.title}</span>
                                        {item.description && (
                                            <span className="text-xs text-muted-foreground">
                                                {item.description}
                                            </span>
                                        )}
                                    </span>
                                </Link>
                            </DropdownMenuItem>
                        )
                    }

                    return (
                        <DropdownMenuItem
                            key={`action-${item.title}-${index}`}
                            onSelect={item.onSelect}
                        >
                            {Icon && <Icon className="mr-2 size-4" />}
                            {item.title}
                        </DropdownMenuItem>
                    )
                })}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

// --------------------------------------------------
// Main Breadcrumb
// --------------------------------------------------

export function Breadcrumbs({
                                currentLabel,
                                currentRole,
                                className,
                            }: BreadcrumbsProps) {
    const pathname = usePathname()

    const route = resolveRoute(pathname, currentRole)

    if (!route) return null

    const Icon = route.icon
    const colors = navColorClasses[route.color]

    const normalizedPath = normalizePath(pathname)
    const normalizedBase = normalizePath(route.href)

    // A route suffix means this is a detail or nested page.
    const isDetailPage = normalizedPath !== normalizedBase

    const menuItems = breadcrumbMenus[route.href]

    return (
        <Breadcrumb className={className}>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbPage
                        className={`inline-flex items-center gap-2 ${colors.foreground}`}
                    >
                        <Icon className="size-4 shrink-0" />
                        <span className="text-sm font-medium truncate capitalize">{route.title}</span>
                    </BreadcrumbPage>

                    {menuItems && (
                        <BreadcrumbDropdown
                            items={menuItems}
                            currentRole={currentRole}
                        />
                    )}
                </BreadcrumbItem>

                {isDetailPage && (
                    <>
                        <BreadcrumbSeparator>
                            <ChevronRight className="size-3.5" />
                        </BreadcrumbSeparator>

                        <BreadcrumbItem>
                            <BreadcrumbPage>
                                {currentLabel || "Details"}
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                    </>
                )}
            </BreadcrumbList>
        </Breadcrumb>
    )
}