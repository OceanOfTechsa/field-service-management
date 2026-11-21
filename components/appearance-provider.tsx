"use client"
import React, { createContext, useContext, useEffect, useState } from "react"
import { ThemeProvider, useTheme } from "next-themes"

export const DEFAULTS = {
    primary: "#0B9944",
    layout: "normal",
    sidebarVariant: "inset",
    sidebarMode: "expanded",
    collapsible: "icon",
    contentLayout: "full",
    contentWidth: "full",
    font: "manrope",
    radius: "md",
    density: "default",
}
export type Appearance = typeof DEFAULTS

// allowed values: anything else in storage is ignored
const OPTIONS: Record<string, string[]> = {
    layout: ["normal", "island"],
    sidebarVariant: ["flush", "inset", "floating"],
    sidebarMode: ["expanded", "icon", "hidden"],
    collapsible: ["offcanvas", "icon", "none"],
    contentLayout: ["full", "contained"],
    contentWidth: ["1280px", "1440px", "1600px", "full"],
    font: ["inter", "geist", "roboto", "jakarta", "manrope"],
    radius: ["none", "sm", "md", "lg"],
    density: ["compact", "default", "comfortable"],
}

export const HEX = /^#[0-9a-f]{6}$/i
export const fg = (hex: string) => {
    const [r, g, b] = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16))
    return (r * 299 + g * 587 + b * 114) / 1000 > 150 ? "#000000" : "#ffffff"
}

type Ctx = { a: Appearance; set: (p: Partial<Appearance>) => void; reset: () => void; isDirty: boolean }
const AppearanceCtx = createContext<Ctx | null>(null)
export const useAppearance = () => useContext(AppearanceCtx)!

function Inner({ children }: { children: React.ReactNode }) {
    const { theme, setTheme } = useTheme()
    const [a, setA] = useState<Appearance>(DEFAULTS)
    const [ready, setReady] = useState(false)

    const isDirty =
        ready &&
        ((Object.keys(DEFAULTS) as (keyof Appearance)[]).some(k =>
            k === "primary" ? a.primary.toLowerCase() !== DEFAULTS.primary.toLowerCase() : a[k] !== DEFAULTS[k]
        ) || (theme !== undefined && theme !== "system"))

    // load + validate
    useEffect(() => {
        try {
            const s = JSON.parse(localStorage.getItem("appearance") ?? "{}")
            const next: Appearance = { ...DEFAULTS }
            for (const k in OPTIONS) if (OPTIONS[k].includes(s[k])) (next as any)[k] = s[k]
            if (typeof s.primary === "string" && HEX.test(s.primary)) next.primary = s.primary
            setA(next)
        } catch {}
        setReady(true)
    }, [])

    // apply + save
    useEffect(() => {
        if (!ready) return
        const el = document.documentElement
        el.dataset.layout = a.layout
        el.dataset.sidebarVariant = a.sidebarVariant
        el.dataset.sidebarMode = a.sidebarMode
        el.dataset.contentLayout = a.contentLayout
        el.dataset.font = a.font
        el.dataset.radius = a.radius
        el.dataset.density = a.density
        el.style.setProperty("--content-max-width", a.contentWidth === "full" ? "100%" : a.contentWidth)
        el.style.setProperty("--brand", a.primary)
        el.style.setProperty("--primary-foreground", fg(a.primary))
        localStorage.setItem("appearance", JSON.stringify(a))
    }, [a, ready])

    const set = (p: Partial<Appearance>) =>
        setA(prev => {
            const next = { ...prev, ...p }
            return HEX.test(next.primary) ? next : prev // invalid HEX is never saved
        })

    const reset = () => { setA(DEFAULTS); setTheme("system") }

    return <AppearanceCtx.Provider value={{ a, set, reset, isDirty }}>{children}</AppearanceCtx.Provider>
}

export function AppearanceProvider({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Inner>{children}</Inner>
        </ThemeProvider>
    )
}