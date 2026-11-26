import type { LucideIcon } from "lucide-react"

import {
    Settings,
    Users,
    UserPlus,
    Building2,
    FilePlus2,
    List,
} from "lucide-react"

export type BreadcrumbMenuItem =
    | {
    type: "link"
    title: string
    href: string
    icon?: LucideIcon
    description?: string
    roles?: string[]
}
    | {
    type: "action"
    title: string
    onSelect: () => void
    icon?: LucideIcon
    description?: string
    roles?: string[]
}
    | {
    type: "separator"
}

export type BreadcrumbMenuConfig = Record<
    string,
    BreadcrumbMenuItem[]
>

/**
 * Keys should be the configured navigation hrefs.
 *
 * This allows menus to be attached to any breadcrumb,
 * including subitems and standalone navigation pages.
 */
export const breadcrumbMenus: BreadcrumbMenuConfig = {
    "/Customers/Contacts": [
        {
            type: "link",
            title: "All Contacts",
            href: "/Customers/Contacts",
            icon: List,
        },
        {
            type: "separator",
        },
        {
            type: "link",
            title: "Add Contact",
            href: "/Customers/Contacts/Create",
            icon: UserPlus,
            description: "Create a new customer contact",
        },
    ],

    "/Customers/Companies": [
        {
            type: "link",
            title: "All Companies",
            href: "/Customers/Companies",
            icon: List,
        },
        {
            type: "separator",
        },
        {
            type: "link",
            title: "Add Company",
            href: "/Customers/Companies/Create",
            icon: Building2,
        },
    ],

    // Example of a menu for a standalone page:
    "/Settings": [
        {
            type: "link",
            title: "Application Settings",
            href: "/Settings",
            icon: Settings,
        },
        {
            type: "separator",
        },
        {
            type: "action",
            title: "Refresh Settings",
            icon: FilePlus2,
            onSelect: () => {
                console.log("Refresh settings")
            },
        },
    ],
}