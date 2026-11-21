
import {
    Activity,
    Workflow,
    Building2,
    CreditCard,
    Users,
    Flag,
    Megaphone,
    GitBranch,
    FileText,
    Settings,
    Send,
    UserRoundSearch,
    ClipboardList,
    Truck,
    Landmark,
    HandHelping,
    UsersRound,
    MapPin,
    LayoutDashboard,
    type LucideIcon,
} from "lucide-react";

// ---------------------------------------------
// Navigation types
// ---------------------------------------------

export type UserRole =
    | "SuperAdmin"
    | "Administrator"
    | "Dispatcher"
    | "FieldAgent"
    | "LimitedFieldAgent"
    | "CallCenterAgent"
    | "CustomerPortalUser";

export type NavColor =
    | "violet"
    | "blue"
    | "cyan"
    | "emerald"
    | "amber"
    | "orange"
    | "pink"
    | "indigo"
    | "teal"
    | "slate"
    | "rose";

export interface NavSubItem {
    title: string;
    href: string;
    roles: UserRole[];
}

export interface NavItem {
    title: string;
    href: string;
    icon: LucideIcon;
    color: NavColor;
    roles: UserRole[];
    subs?: NavSubItem[];
}

// ---------------------------------------------
// Main navigation icon mappings
// Only main navigation items have icons.
// ---------------------------------------------

export const mainNavIcons = {
    adminDashboard: Activity,
    workflow: Workflow,
    organisations: Building2,
    subscriptions: CreditCard,
    userManagement: Users,
    features: Flag,
    announcements: Megaphone,
    referenceData: GitBranch,
    forms: FileText,
    settings: Settings,

    formSubmissions: Send,
    customers: UserRoundSearch,
    workOrderManagement: ClipboardList,
    dispatchConsole: Truck,
    billing: Landmark,
    servicesAndParts: HandHelping,
    workforce: UsersRound,
    reports: FileText,
    addresses: MapPin,
} satisfies Record<string, LucideIcon>;

// ---------------------------------------------
// Main navigation color mappings
// Used for active navigation backgrounds,
// borders and indicators, NOT icon colors.
// ---------------------------------------------

export const navColorClasses: Record<NavColor, string> = {
    violet: "violet",
    blue: "blue",
    cyan: "cyan",
    emerald: "emerald",
    amber: "amber",
    orange: "orange",
    pink: "pink",
    indigo: "indigo",
    teal: "teal",
    slate: "slate",
    rose: "rose",
};

// ---------------------------------------------
// Navigation definitions
// ---------------------------------------------

export const nav: NavItem[] = [

    // ===========================================
    // SUPER ADMIN
    // ===========================================

    {
        title: "Admin Dashboard",
        href: "/Admin",
        icon: mainNavIcons.adminDashboard,
        color: "violet",
        roles: ["SuperAdmin"],
        subs: [
            { title: "System Health", href: "/Admin/Health/", roles: ["SuperAdmin"] },
            { title: "Pending Alerts", href: "/Admin/PendingAlerts", roles: ["SuperAdmin"] },
            { title: "View All Alerts", href: "/Admin/ViewAllAlerts", roles: ["SuperAdmin"] },
            { title: "Resend Email", href: "/Admin/ResendEmail", roles: ["SuperAdmin"] },
            { title: "SQL Firewall", href: "/Admin/SQLFirewall", roles: ["SuperAdmin"] },
            { title: "Flush Cache", href: "/Admin/FlushCache", roles: ["SuperAdmin"] },
        ],
    },

    {
        title: "Workflow",
        href: "/Workflow",
        icon: mainNavIcons.workflow,
        color: "indigo",
        roles: ["SuperAdmin"],
        subs: [
            { title: "WorkFlow Stages", href: "/Admin/Workflow/Stages", roles: ["SuperAdmin"] },
            { title: "Workflow Approvers", href: "/Admin/Workflow/Approvers", roles: ["SuperAdmin"] },
        ],
    },

    {
        title: "Organisations",
        href: "/Admin/Organisations",
        icon: mainNavIcons.organisations,
        color: "blue",
        roles: ["SuperAdmin"],
        subs: [
            { title: "All Organisations", href: "/Admin/Organisations", roles: ["SuperAdmin"] },
            { title: "Health Status", href: "/Admin/Organisations/HealthStatus", roles: ["SuperAdmin"] },
        ],
    },

    {
        title: "Subscriptions",
        href: "/Admin/Subscriptions",
        icon: mainNavIcons.subscriptions,
        color: "emerald",
        roles: ["SuperAdmin"],
    },

    {
        title: "User Management",
        href: "/Admin/UserManagement",
        icon: mainNavIcons.userManagement,
        color: "cyan",
        roles: ["SuperAdmin"],
        subs: [
            { title: "Create User", href: "/Admin/Users/Create", roles: ["SuperAdmin"] },
        ],
    },

    {
        title: "Features",
        href: "/FeatureManagement",
        icon: mainNavIcons.features,
        color: "amber",
        roles: ["SuperAdmin"],
        subs: [
            { title: "All Features", href: "/FeatureManagement/AllFeatures", roles: ["SuperAdmin"] },
            { title: "Assign To Organisation", href: "/FeatureManagement/AssignToOrganisation", roles: ["SuperAdmin"] },
            { title: "Assign To Subscription", href: "/FeatureManagement/AssignToSubscription", roles: ["SuperAdmin"] },
        ],
    },

    {
        title: "Announcements",
        href: "#",
        icon: mainNavIcons.announcements,
        color: "orange",
        roles: ["SuperAdmin"],
        subs: [
            { title: "All Announcements", href: "/Admin/Announcements/", roles: ["SuperAdmin"] },
            { title: "Create Announcement", href: "/Admin/Announcements/Create", roles: ["SuperAdmin"] },
            { title: "Announcements Settings", href: "/Admin/Announcements/Settings", roles: ["SuperAdmin"] },
        ],
    },

    {
        title: "Reference Data",
        href: "#",
        icon: mainNavIcons.referenceData,
        color: "teal",
        roles: ["SuperAdmin"],
        subs: [
            { title: "Countries", href: "/Admin/ReferenceData/Countries", roles: ["SuperAdmin"] },
            { title: "Provinces", href: "/Admin/ReferenceData/Provinces", roles: ["SuperAdmin"] },
            { title: "Currencies", href: "/Admin/ReferenceData/Currencies", roles: ["SuperAdmin"] },
            { title: "Languages", href: "/Languages", roles: ["SuperAdmin"] },
            { title: "Timezones", href: "/Admin/ReferenceData/Timezones", roles: ["SuperAdmin"] },
        ],
    },

    {
        title: "Forms",
        href: "/Admin",
        icon: mainNavIcons.forms,
        color: "pink",
        roles: ["SuperAdmin"],
        subs: [
            { title: "Work Order", href: "/Admin/Forms/WorkOrder", roles: ["SuperAdmin"] },
            { title: "Leave Application", href: "/Admin/Forms/LeaveApplication", roles: ["SuperAdmin"] },
            { title: "Asset Application", href: "/Admin/Forms/AssetApplication", roles: ["SuperAdmin"] },
        ],
    },

    {
        title: "Settings",
        href: "#",
        icon: mainNavIcons.settings,
        color: "slate",
        roles: ["SuperAdmin"],
        subs: [
            { title: "Create Settings", href: "/Admin/AppSettings/Create", roles: ["SuperAdmin"] },
            { title: "View Settings", href: "/Admin/AppSettings", roles: ["SuperAdmin"] },
        ],
    },

    // ===========================================
    // SYSTEM OPERATIONS
    // ===========================================

    {
        title: "Form Submissions",
        href: "/Formsubmission",
        icon: mainNavIcons.formSubmissions,
        color: "blue",
        roles: ["Administrator", "Dispatcher", "FieldAgent", "CallCenterAgent", "CustomerPortalUser"],
        subs: [
            {
                title: "Pending",
                href: "/Formsubmission/Pending",
                roles: ["Administrator", "Dispatcher", "FieldAgent", "CallCenterAgent", "CustomerPortalUser"],
            },
            {
                title: "History",
                href: "/Formsubmission/History",
                roles: ["Administrator", "Dispatcher", "FieldAgent", "CallCenterAgent", "CustomerPortalUser"],
            },
        ],
    },

    {
        title: "Customers",
        href: "#",
        icon: mainNavIcons.customers,
        color: "cyan",
        roles: ["Administrator", "Dispatcher", "CallCenterAgent"],
        subs: [
            { title: "Contacts", href: "/Customers/Contacts", roles: ["Administrator", "Dispatcher", "CallCenterAgent"] },
            { title: "Companies", href: "/Customers/Companies", roles: ["Administrator", "Dispatcher", "CallCenterAgent"] },
        ],
    },

    {
        title: "Work Order Management",
        href: "#",
        icon: mainNavIcons.workOrderManagement,
        color: "violet",
        roles: ["Administrator", "Dispatcher", "FieldAgent", "LimitedFieldAgent"],
        subs: [
            { title: "Requests", href: "/WorkOrderManagement/Requests", roles: ["Administrator", "Dispatcher"] },
            { title: "Estimates", href: "/WorkOrderManagement/Estimates", roles: ["Administrator", "Dispatcher"] },
            { title: "Work Orders", href: "/WorkOrderManagement/WorkOrders", roles: ["Administrator", "Dispatcher", "FieldAgent", "LimitedFieldAgent"] },
            { title: "Service Appointments", href: "/WorkOrderManagement/ServiceAppointments", roles: ["Administrator", "Dispatcher", "FieldAgent", "LimitedFieldAgent"] },
            { title: "Service Reports", href: "/WorkOrderManagement/ServiceReports", roles: ["Administrator", "Dispatcher", "FieldAgent", "LimitedFieldAgent"] },
            { title: "Scheduled Maintenance", href: "/WorkOrderManagement/ScheduledMaintenances", roles: ["Administrator", "Dispatcher"] },
        ],
    },

    {
        title: "Dispatch Console",
        href: "/DispatchConsole",
        icon: mainNavIcons.dispatchConsole,
        color: "orange",
        roles: ["Administrator", "Dispatcher"],
        subs: [],
    },

    {
        title: "Billing",
        href: "#",
        icon: mainNavIcons.billing,
        color: "emerald",
        roles: ["Administrator", "Dispatcher"],
        subs: [
            { title: "Invoices", href: "/Billing/Invoices", roles: ["Administrator", "Dispatcher"] },
            { title: "Payments", href: "/Billing/Payments", roles: ["Administrator", "Dispatcher"] },
        ],
    },

    {
        title: "Services & Parts",
        href: "/ServicesAndParts",
        icon: mainNavIcons.servicesAndParts,
        color: "teal",
        roles: ["Administrator", "Dispatcher", "FieldAgent"],
        subs: [],
    },

    {
        title: "Workforce",
        href: "#",
        icon: mainNavIcons.workforce,
        color: "indigo",
        roles: ["Administrator", "Dispatcher", "FieldAgent"],
        subs: [
            { title: "Users", href: "/Workforce/Users", roles: ["Administrator", "Dispatcher"] },
            { title: "Crew", href: "/Workforce/Crew", roles: ["Administrator", "Dispatcher"] },
            { title: "Equipment", href: "/Workforce/Equipment", roles: ["Administrator", "Dispatcher", "FieldAgent"] },
            { title: "Attendance", href: "/Workforce/Attendance", roles: ["Administrator", "Dispatcher", "FieldAgent"] },
            { title: "Time Off", href: "/Workforce/TimeOff", roles: ["Administrator", "Dispatcher", "FieldAgent"] },
            { title: "Trips", href: "/Workforce/Trips", roles: ["Administrator", "Dispatcher", "FieldAgent"] },
        ],
    },

    {
        title: "Reports",
        href: "/Reports",
        icon: mainNavIcons.reports,
        color: "rose",
        roles: ["Administrator", "Dispatcher"],
        subs: [],
    },

    {
        title: "Addresses",
        href: "/Addresses",
        icon: mainNavIcons.addresses,
        color: "slate",
        roles: ["Administrator", "Dispatcher", "CallCenterAgent", "FieldAgent"],
        subs: [
            {
                title: "All Addresses",
                href: "/Addresses",
                roles: ["Administrator", "Dispatcher", "FieldAgent", "CallCenterAgent"],
            },
            {
                title: "Create",
                href: "/Addresses/Create",
                roles: ["Administrator", "Dispatcher", "FieldAgent", "CallCenterAgent"],
            },
        ],
    },

    // ===========================================
    // CLIENT PORTAL
    // ===========================================

    {
        title: "Form Submissions",
        href: "/Formsubmission",
        icon: mainNavIcons.formSubmissions,
        color: "blue",
        roles: ["CustomerPortalUser"],
        subs: [
            {
                title: "Pending",
                href: "/Formsubmission/Pending",
                roles: ["CustomerPortalUser"],
            },
            {
                title: "History",
                href: "/Formsubmission/History",
                roles: ["CustomerPortalUser"],
            },
        ],
    },
];
