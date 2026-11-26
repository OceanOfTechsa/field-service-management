import type { LucideIcon } from "lucide-react"

import {
    Activity,
    BarChart3,
    Boxes,
    Building2,
    CalendarCheck,
    CalendarClock,
    CalendarDays,
    CalendarOff,
    ChartNoAxesCombined,
    ClipboardCheck,
    ClipboardList,
    Clock3,
    ContactRound,
    CreditCard,
    FileBarChart,
    FileText,
    HardHat,
    MapPinned,
    Package,
    ReceiptText,
    Route,
    UserRound,
    UsersRound,
    WalletCards,
    Wrench,
    Calculator,
} from "lucide-react"

export type UserRole = string

// --------------------------------------------------
// Navigation types
// --------------------------------------------------

export type NavColor =
    | "cyan"
    | "blue"
    | "violet"
    | "emerald"
    | "amber"
    | "indigo"
    | "slate"
    | "rose"
    | "teal"
    | "orange"
    | "pink"

export type NavSubItem = {
    title: string
    href: string
    icon?: LucideIcon
    roles?: UserRole[]
}

export type NavItem = {
    title: string
    href: string
    icon: LucideIcon
    color: NavColor
    roles?: UserRole[]
    subs?: NavSubItem[]
}

// --------------------------------------------------
// Navigation icons
// --------------------------------------------------

export const mainNavIcons = {
    // Main modules
    customers: UsersRound,
    workOrders: ClipboardList,
    dispatch: MapPinned,
    billing: CreditCard,
    servicesAndParts: Package,
    workforce: UsersRound,
    reports: ChartNoAxesCombined,

    // Customers
    contacts: ContactRound,
    companies: Building2,

    // Work Order Management
    requests: FileText,
    estimates: Calculator,
    workOrdersList: ClipboardCheck,
    serviceAppointments: CalendarClock,
    serviceReports: FileBarChart,
    scheduledAppointments: CalendarDays,

    // Billing
    retainerInvoices: ReceiptText,
    invoices: FileText,
    payments: WalletCards,

    // Services and Parts
    services: Wrench,
    parts: Boxes,

    // Workforce
    users: UserRound,
    crew: UsersRound,
    equipment: HardHat,
    attendance: CalendarCheck,
    timeOff: CalendarOff,
    trips: Route,

    // General / fallback icons
    default: FileText,
    activity: Activity,
    clock: Clock3,
    calendar: CalendarDays,
    chart: BarChart3,
} satisfies Record<string, LucideIcon>

// Generic icon for breadcrumb subitems without their own icon.
export const defaultBreadcrumbIcon = mainNavIcons.default

// --------------------------------------------------
// Navigation colour mappings
// --------------------------------------------------

export const navColorClasses: Record<
    NavColor,
    {
        background: string
        foreground: string
        border: string
        indicator: string
    }
> = {
    cyan: {
        background: "bg-cyan-500/10",
        foreground: "text-cyan-700 dark:text-cyan-300",
        border: "border-cyan-500/20",
        indicator: "bg-cyan-500",
    },

    blue: {
        background: "bg-blue-500/10",
        foreground: "text-blue-700 dark:text-blue-300",
        border: "border-blue-500/20",
        indicator: "bg-blue-500",
    },

    violet: {
        background: "bg-violet-500/10",
        foreground: "text-violet-700 dark:text-violet-300",
        border: "border-violet-500/20",
        indicator: "bg-violet-500",
    },

    emerald: {
        background: "bg-emerald-500/10",
        foreground: "text-emerald-700 dark:text-emerald-300",
        border: "border-emerald-500/20",
        indicator: "bg-emerald-500",
    },

    amber: {
        background: "bg-amber-500/10",
        foreground: "text-amber-700 dark:text-amber-300",
        border: "border-amber-500/20",
        indicator: "bg-amber-500",
    },

    indigo: {
        background: "bg-indigo-500/10",
        foreground: "text-indigo-700 dark:text-indigo-300",
        border: "border-indigo-500/20",
        indicator: "bg-indigo-500",
    },

    slate: {
        background: "bg-slate-500/10",
        foreground: "text-slate-700 dark:text-slate-300",
        border: "border-slate-500/20",
        indicator: "bg-slate-500",
    },

    rose: {
        background: "bg-rose-500/10",
        foreground: "text-rose-700 dark:text-rose-300",
        border: "border-rose-500/20",
        indicator: "bg-rose-500",
    },

    teal: {
        background: "bg-teal-500/10",
        foreground: "text-teal-700 dark:text-teal-300",
        border: "border-teal-500/20",
        indicator: "bg-teal-500",
    },

    orange: {
        background: "bg-orange-500/10",
        foreground: "text-orange-700 dark:text-orange-300",
        border: "border-orange-500/20",
        indicator: "bg-orange-500",
    },

    pink: {
        background: "bg-pink-500/10",
        foreground: "text-pink-700 dark:text-pink-300",
        border: "border-pink-500/20",
        indicator: "bg-pink-500",
    },
}

// --------------------------------------------------
// Navigation configuration
// --------------------------------------------------

export const nav: NavItem[] = [
    // ----------------------------------------------
    // Customers
    // ----------------------------------------------
    {
        title: "Customers",
        href: "#",
        icon: mainNavIcons.customers,
        color: "cyan",
        roles: ["Administrator", "Dispatcher", "CallCenterAgent"],

        subs: [
            {
                title: "Contacts",
                href: "/Customers/Contacts",
                icon: mainNavIcons.contacts,
                roles: ["Administrator", "Dispatcher", "CallCenterAgent"],
            },
            {
                title: "Companies",
                href: "/Customers/Companies",
                icon: mainNavIcons.companies,
                roles: ["Administrator", "Dispatcher", "CallCenterAgent"],
            },
        ],
    },

    // ----------------------------------------------
    // Work Order Management
    // ----------------------------------------------
    {
        title: "Work Order Management",
        href: "#",
        icon: mainNavIcons.workOrders,
        color: "blue",

        subs: [
            {
                title: "Requests",
                href: "/WorkOrderManagement/Requests",
                icon: mainNavIcons.requests,
            },
            {
                title: "Estimates",
                href: "/WorkOrderManagement/Estimates",
                icon: mainNavIcons.estimates,
            },
            {
                title: "Work Orders",
                href: "/WorkOrderManagement/WorkOrders",
                icon: mainNavIcons.workOrdersList,
            },
            {
                title: "Service Appointments",
                href: "/WorkOrderManagement/ServiceAppointments",
                icon: mainNavIcons.serviceAppointments,
            },
            {
                title: "Service Reports",
                href: "/WorkOrderManagement/ServiceReports",
                icon: mainNavIcons.serviceReports,
            },
            {
                title: "Scheduled Appointments",
                href: "/WorkOrderManagement/ScheduledAppointments",
                icon: mainNavIcons.scheduledAppointments,
            },
        ],
    },

    // ----------------------------------------------
    // Dispatch Console
    // ----------------------------------------------
    {
        title: "Dispatch Console",
        href: "/DispatchConsole",
        icon: mainNavIcons.dispatch,
        color: "violet",
    },

    // ----------------------------------------------
    // Billing
    // ----------------------------------------------
    {
        title: "Billing",
        href: "#",
        icon: mainNavIcons.billing,
        color: "emerald",

        subs: [
            {
                title: "Retainer Invoices",
                href: "/Billing/RetainerInvoices",
                icon: mainNavIcons.retainerInvoices,
            },
            {
                title: "Invoices",
                href: "/Billing/Invoices",
                icon: mainNavIcons.invoices,
            },
            {
                title: "Payments",
                href: "/Billing/Payments",
                icon: mainNavIcons.payments,
            },
        ],
    },

    // ----------------------------------------------
    // Services and Parts
    // ----------------------------------------------
    {
        title: "Services and Parts",
        href: "/ServicesAndParts",
        icon: mainNavIcons.servicesAndParts,
        color: "amber",
    },

    // ----------------------------------------------
    // Workforce
    // ----------------------------------------------
    {
        title: "Workforce",
        href: "#",
        icon: mainNavIcons.workforce,
        color: "indigo",

        subs: [
            {
                title: "Users",
                href: "/Workforce/Users",
                icon: mainNavIcons.users,
            },
            {
                title: "Crew",
                href: "/Workforce/Crew",
                icon: mainNavIcons.crew,
            },
            {
                title: "Equipment",
                href: "/Workforce/Equipment",
                icon: mainNavIcons.equipment,
            },
            {
                title: "Attendance",
                href: "/Workforce/Attendance",
                icon: mainNavIcons.attendance,
            },
            {
                title: "Time Off",
                href: "/Workforce/TimeOff",
                icon: mainNavIcons.timeOff,
            },
            {
                title: "Trips",
                href: "/Workforce/Trips",
                icon: mainNavIcons.trips,
            },
        ],
    },

    // ----------------------------------------------
    // Reports
    // ----------------------------------------------
    {
        title: "Reports",
        href: "/Reports",
        icon: mainNavIcons.reports,
        color: "slate",
    },
]

// --------------------------------------------------
// Route resolution
// --------------------------------------------------

export type NavRouteMatch = {
    item: NavItem
    subItem?: NavSubItem
    title: string
    href: string
    icon: LucideIcon
    color: NavColor
    isSubItem: boolean
}

const normalizePath = (path: string) => {
    const normalized = path.split("?")[0].split("#")[0]

    if (normalized === "/") return "/"

    return normalized.replace(/\/+$/, "")
}

const matchesRoute = (pathname: string, href: string) => {
    const path = normalizePath(pathname)
    const route = normalizePath(href)

    return path === route || path.startsWith(`${route}/`)
}

export function resolveNavRoute(
    pathname: string
): NavRouteMatch | undefined {
    const path = normalizePath(pathname)

    const matches: NavRouteMatch[] = []

    for (const item of nav) {
        // Group parents are not pages.
        if (item.subs?.length) {
            for (const subItem of item.subs) {
                if (!matchesRoute(path, subItem.href)) continue

                matches.push({
                    item,
                    subItem,
                    title: subItem.title,
                    href: subItem.href,
                    icon: subItem.icon ?? defaultBreadcrumbIcon,
                    color: item.color,
                    isSubItem: true,
                })
            }

            continue
        }

        // Standalone navigation pages.
        if (item.href !== "#" && matchesRoute(path, item.href)) {
            matches.push({
                item,
                title: item.title,
                href: item.href,
                icon: item.icon,
                color: item.color,
                isSubItem: false,
            })
        }
    }

    // Prefer the most specific route.
    return matches.sort(
        (a, b) => b.href.length - a.href.length
    )[0]
}

// --------------------------------------------------
// Role visibility
// --------------------------------------------------

export function canAccessNavItem(
    roles: string[] | undefined,
    currentRole: string
) {
    return !roles?.length || roles.includes(currentRole)
}