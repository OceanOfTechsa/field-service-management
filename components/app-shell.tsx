"use client"
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {ChevronDown, PanelLeft, Search} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppearance } from "@/components/appearance-provider";
import { AppearanceMenu } from "@/components/appearance-menu";
import { ModeToggle } from "@/components/ModeToggle";
import { nav, navColorClasses, type NavColor, type UserRole } from "@/lib/navigation";
import {SidebarUserMenu} from "@/components/SidebarUserMenu";
import {SidebarOrganizationMenu} from "@/components/SidebarOrganizationMenu";
import {Breadcrumbs} from "@/components/breadcrumb/breadcrumb";

// TODO: replace with the signed-in user's role. Try "SuperAdmin" to see the admin menu.
const role: UserRole = "Administrator"

function NavList({ drawer = false }: { drawer?: boolean }) {
    const pathname = usePathname()
    const { a, set } = useAppearance()
    const [open, setOpen] = useState<string | null>(null)

    // only what this role may see
    const items = nav
        .filter(i => !i.roles?.length || i.roles.includes(role))
        .map(i => ({
            ...i,
            subs: (i.subs ?? []).filter(
                s => !s.roles?.length || s.roles.includes(role)
            ),
        }))
        .filter(i => !i.href || i.href !== "#" || i.subs.length > 0)

    const match = (href: string) => {
        if (href === "#") return false
        const base = href.replace(/\/$/, "")
        return pathname === base || pathname.startsWith(base + "/")
    }
    // longest match wins, so "/Addresses" is not active on "/Addresses/Create"
    const bestSub = (subs: { href: string }[]) =>
        subs.filter(s => match(s.href)).sort((x, y) => y.href.length - x.href.length)[0]

    // a parent with sub-links is active only through its subs (several parents share "/Admin" or "#")
    const isActive = (i: (typeof items)[number]) => (i.subs.length ? !!bestSub(i.subs) : match(i.href))

    // open the group that owns the current page
    const activeTitle = items.find(i => i.subs.length && bestSub(i.subs))?.title ?? null
    useEffect(() => setOpen(activeTitle), [activeTitle])

    const iconOnly = !drawer && a.sidebarMode === "icon"
    const link = (active: boolean, color: NavColor) => {
        const styles = navColorClasses[color]

        return `
        ${drawer
            ? "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-sidebar-accent"
            : "sidebar-link"
        }
        border
        ${
            active
                ? `${styles.background} ${styles.border} ${styles.foreground}`
                : "border-transparent"
        }
    `
    }

    return (
        <>
            {items.map((item, idx) => {
                const Icon = item.icon
                const active = isActive(item)
                const isOpen = open === item.title
                const label = (
                    <>
                        <Icon
                            className={`size-3 ${navColorClasses[item.color].foreground}`}
                        />
                        <span className={drawer ? "" : "sidebar-label"}>{item.title}</span>
                    </>
                )

                if (!item.subs.length) {
                    return (
                        <Link key={`${item.title}-${idx}`} href={item.href} title={item.title} className={link(active, item.color)}>
                            {label}
                        </Link>
                    )
                }

                return (
                    <div key={`${item.title}-${idx}`} className="flex flex-col gap-0.5">
                        <button
                            type="button"
                            title={item.title}
                            aria-expanded={isOpen}
                            className={`${link(active, item.color)} sidebar-parent-link w-full text-left`}
                            onClick={() => {
                                if (iconOnly) {
                                    set({ sidebarMode: "expanded" })
                                }

                                setOpen(isOpen && !iconOnly ? null : item.title)
                            }}
                        >
                            {label}
                            <span className={`${drawer ? "" : "sidebar-label"} sidebar-parent-chevron ml-auto flex`}>
                              <ChevronDown className={`size-3.5 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                            </span>
                        </button>

                        <div className="sidebar-submenu" data-open={isOpen} inert={!isOpen}>
                            <div>
                                <div className="border-sidebar-border ml-[19px] flex flex-col gap-0.5 border-l py-1 pl-3">
                                    {item.subs.map(s => (
                                        <Link key={s.href + s.title} href={s.href}
                                              className={`flex min-h-8 items-center rounded-md px-2.5 text-[13px] transition-colors ${
                                                  bestSub(item.subs)?.href === s.href
                                                      ? "bg-sidebar-accent text-foreground font-medium"
                                                      : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground"
                                              }`}>
                                            {s.title}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </>
    )
}

export function AppShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const { a, set } = useAppearance()
    const [drawer, setDrawer] = useState(false)

    useEffect(() => setDrawer(false), [pathname])

    // mobile: open the drawer. desktop: expanded <-> icon (or hidden), per the collapsible setting
    const toggle = () => {
        if (window.matchMedia("(max-width: 1279px)").matches) return setDrawer(o => !o)
        if (a.collapsible === "none") return
        const collapsed = a.collapsible === "offcanvas" ? "hidden" : "icon"
        set({ sidebarMode: a.sidebarMode === "expanded" ? collapsed : "expanded" })
    }

    return (
        <>
            <div className="app-shell">
                <aside className="app-sidebar">
                    <div className="sidebar-brand">
                        <SidebarOrganizationMenu />
                    </div>

                    <nav className="sidebar-navigation">
                        <NavList />
                    </nav>

                    <div className="sidebar-bottom">
                        <div data-slot="card" data-size="sm" className="mb-2 group/card flex flex-col gap-(--card-spacing) rounded-xl bg-card py-(--card-spacing) text-sm text-card-foreground ring-1 ring-foreground/10 [--card-spacing:--spacing(4)] has-data-[slot=card-footer]:pb-0 has-[&gt;img:first-child]:pt-0 data-[size=sm]:[--card-spacing:--spacing(3)] data-[size=sm]:has-data-[slot=card-footer]:pb-0 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl overflow-hidden shadow-none group-data-[collapsible=icon]:hidden">
                            <div data-slot="card-header" className="group/card-header @container/card-header grid auto-rows-min items-start gap-1 rounded-t-xl has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-(--card-spacing) min-w-0 px-4">
                                <div data-slot="card-title" className="font-heading font-medium group-data-[size=sm]/card:text-sm truncate text-sm">Have
                                    something in mind?
                                </div>
                                <div data-slot="card-description" className="text-sm text-muted-foreground line-clamp-3">
                                    Suggest a feature or discuss custom work with me on
                                    &nbsp;
                                    <Link target="_blank" rel="noreferrer" aria-label="Reach out on X" className="text-foreground inline-flex items-center"
                                      href="https://x.com/arhamkhnz"
                                    >
                                        <svg viewBox="0 0 24 24" aria-label="X" aria-hidden="true" focusable="false" className="fill-foreground size-3"><title>X</title>
                                            <path d="M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z"></path>
                                        </svg>
                                    </Link>
                                    &nbsp;or by <Link target="_blank" rel="noreferrer"  className="text-foreground hover:underline" href="https://github.com/arhamkhnz#want-to-connect">email</Link>.
                                </div>
                            </div>
                        </div>
                        <SidebarUserMenu/>
                    </div>
                </aside>

                <div className="app-main">
                    <header className="app-topbar">
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon-xs" onClick={toggle} aria-label="Toggle sidebar"
                                    className={a.collapsible === "none" ? "md:hidden" : ""}>
                                <PanelLeft className="size-5"/>
                            </Button>
                            <div data-orientation="vertical" role="separator" aria-orientation="vertical"
                                 data-slot="separator"
                                 className="bg-border shrink-0 data-horizontal:h-px data-horizontal:w-full data-vertical:w-px mr-1 h-5! data-vertical:self-center"></div>
                            <Breadcrumbs currentRole="Administrator"/>

                            {/*<div className="flex min-w-0 items-center gap-2">*/}
                            {/*    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"*/}
                            {/*         fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"*/}
                            {/*         stroke-linejoin="round"*/}
                            {/*         className="lucide lucide-chart-line size-4 shrink-0 text-indigo-600 dark:text-indigo-400"*/}
                            {/*         aria-hidden="true">*/}
                            {/*        <path d="M3 3v16a2 2 0 0 0 2 2h16" className=""></path>*/}
                            {/*        <path d="m19 9-5 5-4-4-3 3"></path>*/}
                            {/*    </svg>*/}
                            {/*    <span className="text-sm font-medium truncate capitalize">{pathname.split("/")[1]}</span>*/}
                            {/*</div>*/}
                        </div>
                        <div className="flex items-center gap-2 divide-x">
                            <Button
                                type="button"
                                variant="ghost"
                                className="h-8 gap-1.5 px-2.5 font-normal max-md:size-8 hover:border"
                            >
                                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                                    <Search className="size-4" />
                                    <span className="max-md:hidden">
                                        Type to search...
                                    </span>
                                </div>
                            </Button>
                            <div className={"flex items-center gap-2"}>
                                <AppearanceMenu />
                                <ModeToggle />
                            </div>
                        </div>
                    </header>

                    <main className="app-content">
                        <div className="app-content-inner">{children}</div>
                    </main>
                </div>
            </div>

            {/* mobile drawer */}
            <div onClick={() => setDrawer(false)} className={`fixed inset-0 z-40 bg-black/50 transition-opacity md:hidden ${drawer ? "opacity-100" : "pointer-events-none opacity-0"}`} />
            <aside className={`bg-sidebar/80 text-sidebar-foreground fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r backdrop-blur-md transition-transform duration-300 md:hidden ${drawer ? "translate-x-0" : "invisible -translate-x-full"}`}>
                <div className="flex h-[60px] items-center gap-2 px-2">
                    <SidebarOrganizationMenu />
                </div>
                <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-2">
                    <NavList drawer />
                </nav>

                <div className="flex h-[60px] items-center gap-2 px-2">
                    <SidebarUserMenu />
                </div>
            </aside>
        </>
    )
}