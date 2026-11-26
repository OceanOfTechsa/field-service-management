"use client"
import React, { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import {Ban, Check, CircleQuestionMark, Palette, RefreshCcw} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator,
    DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {  HEX, useAppearance } from "@/components/appearance-provider";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"


const PRESETS = [
    ["Green", "#0B9944"], ["Blue", "#2563EB"], ["Violet", "#7C3AED"],
    ["Orange", "#F97316"], ["Rose", "#E11D48"], ["Zinc", "#52525B"],
]
const FONTS = [["inter", "Inter"], ["geist", "Geist"], ["roboto", "Roboto"], ["jakarta", "Plus Jakarta Sans"], ["manrope", "Manrope"]]

// segmented control
function Seg({ label, value, options, onChange }: {label: string; value?: string; options: [string, React.ReactNode][]; onChange: (v: string) => void }) {
    return (
        <div className="space-y-0">
            <div className="text-sm font-medium">{label}</div>
            <div className="grid overflow-hidden rounded-md border shadow-xs" style={{ gridTemplateColumns: `repeat(${options.length}, 1fr)` }}>
                {options.map(([v, l], i) => (
                    <button key={v} type="button" title={typeof l === "string" ? l : v}
                            onClick={() => onChange(v)} aria-pressed={value === v}
                            className={`hover:bg-muted/60 aria-pressed:bg-muted h-8 text-sm transition-colors aria-pressed:font-medium leading-none ${i > 0 ? "border-l" : ""}`}>
                        {l}
                    </button>
                ))}
            </div>
        </div>
    )
}

// select-style row that opens a submenu
function Pick({ label, trigger, children }: { label: string; trigger: React.ReactNode; children: React.ReactNode }) {
    return (
        <div className="space-y-2">
            <div className="text-sm font-medium">{label}</div>
            <DropdownMenuSub>
                <DropdownMenuSubTrigger className="h-9 border">{trigger}</DropdownMenuSubTrigger>
                <DropdownMenuSubContent className="max-h-72 w-56 overflow-y-auto bg-popover dark:bg-[#1d1d1d]">{children}</DropdownMenuSubContent>
            </DropdownMenuSub>
        </div>
    )
}

export function AppearanceMenu() {
    const { a, set, reset, isDirty } = useAppearance()
    const { theme, setTheme } = useTheme()

    const preset = PRESETS.find(([, h]) => h.toLowerCase() === a.primary.toLowerCase())
    const font = FONTS.find(([v]) => v === a.font)?.[1]

    // custom colour draft (saved as soon as it is a valid HEX)
    const [draft, setDraft] = useState(a.primary)
    useEffect(() => setDraft(a.primary), [a.primary])
    const validDraft = HEX.test(draft)

    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger render={<Button variant="outline" size="icon" aria-label="Theme Customiser" />}>
                <Palette className="size-4" />
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" sideOffset={8} className="bg-popover dark:bg-[#1d1d1d] h-[528px] text-popover-foreground ring-foreground/10 data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 relative z-50 flex max-h-[calc(100vh-10rem)] w-72 origin-(--transform-origin) flex-col gap-5 overflow-y-auto rounded-md px-0 py-3 text-sm shadow-md ring-1 outline-hidden duration-100" >
                <div className={'flex flex-col gap-5'}>
                    <div className={'flex flex-col gap-1 px-3'}>
                        <div className={'flex items-center justify-between'}>
                            <h3 className={'text-lg font-medium'}>Theme Customizer</h3>
                            <div className={'flex items-center gap-2'}>
                                <Button variant="ghost" size={'icon'} aria-label="Theme customization help">
                                    <CircleQuestionMark size={'5'}/>
                                </Button>
                                <Button variant="ghost" size={'icon'} ria-label="Reset theme to defaults" onClick={reset} className={'inline-flex relative'}>
                                    <RefreshCcw />
                                    {isDirty && (
                                        <span className={'ring-popover absolute top-1.5  size-1 rounded-full bg-red-500 ring-2 dark:bg-red-400'}></span>
                                    )}
                                </Button>
                            </div>
                        </div>
                        <p className={'text-muted-foreground text-sm'}>Customize your them to your liking</p>
                    </div>

                    <div className={'px-3 flex flex-col gap-3'}>
                        {/* primary colour presets */}
                        <Pick label="Theme Preset" trigger={<span className="flex items-center gap-2">
                            <span className="size-3 rounded-full" style={{background: a.primary}}/>
                            {preset?.[0] ?? "Custom"}
                        </span>}>
                            {PRESETS.map(([name, hex]) => (
                                <DropdownMenuItem key={name} closeOnClick={false} onClick={() => set({primary: hex})}>
                                    <span className="size-3 rounded-full" style={{background: hex}}/>
                                    {name}
                                    {a.primary.toLowerCase() === hex.toLowerCase() && <Check className="ml-auto size-4"/>}
                                </DropdownMenuItem>
                            ))}

                            <DropdownMenuSeparator/>

                            {/* stopPropagation keeps the menu's typeahead from stealing keystrokes */}
                            <div className="flex items-center gap-2 p-2" onKeyDown={e => e.stopPropagation()}>
                                <input type="color" aria-label="Custom colour" value={validDraft ? draft : a.primary}
                                       onChange={e => { setDraft(e.target.value); set({ primary: e.target.value }) }}
                                       className="size-8 shrink-0 cursor-pointer rounded-md border bg-transparent p-0.5"
                                />

                                <Input value={draft} maxLength={7} aria-invalid={!validDraft} aria-label="HEX colour"
                                       onChange={e => {
                                           const v = e.target.value.startsWith("#") ? e.target.value : "#" + e.target.value
                                           setDraft(v)
                                           if (HEX.test(v)) set({ primary: v }) // invalid values are never saved
                                       }}
                                       className="h-8 font-mono uppercase"
                                />
                            </div>
                        </Pick>

                        <Pick label="Font" trigger={font}>
                            {FONTS.map(([v, l]) => (
                                <DropdownMenuItem key={v} closeOnClick={false} onClick={() => set({ font: v })}>
                                    {l}
                                    {a.font === v && <Check className="ml-auto size-4" />}
                                </DropdownMenuItem>
                            ))}
                        </Pick>

                        <Seg label="Color Mode" value={theme} onChange={setTheme} options={[["light", "Light"], ["dark", "Dark"], ["system", "System"]]} />

                        <Seg
                            label="Radius"
                            value={a.radius}
                            onChange={v => set({ radius: v })}
                            options={[
                                ["none", (
                                    <Tooltip>
                                        <TooltipTrigger>
                                        <span className="flex items-center justify-center">
                                            <Ban className="size-4" />
                                        </span>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>0rem</p>
                                        </TooltipContent>
                                    </Tooltip>
                                )],
                                ["sm", (
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <span>SM</span>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>0.45rem</p>
                                        </TooltipContent>
                                    </Tooltip>
                                )],
                                ["md", (
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <span>MD</span>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>0.625rem</p>
                                        </TooltipContent>
                                    </Tooltip>
                                )],
                                ["lg", (
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <span>LG</span>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>0.875rem</p>
                                        </TooltipContent>
                                    </Tooltip>
                                )]
                            ]}
                        />

                        <Seg label="Content Layout" value={a.contentLayout} onChange={v => set({ contentLayout: v })}  options={[["contained", "Contained"], ["full", "Full"]]} />

                        <Seg label="Content Width" value={a.contentWidth} onChange={v => set({ contentWidth: v })} options={[["1280px", "1280"], ["1440px", "1440"], ["full", "Full"]]} />

                        <Seg label="Density" value={a.density} onChange={v => set({ density: v })} options={[["compact", "Compact"], ["default", "Default"], ["comfortable", "Comfy"]]} />

                        <Seg label="Application Layout" value={a.layout} onChange={v => set({ layout: v })} options={[["normal", "Normal"], ["island", "Island"]]} />

                        <Seg label="Sidebar Variant" value={a.sidebarVariant} onChange={v => set({ sidebarVariant: v })} options={[["flush", "Flush"], ["inset", "Inset"], ["floating", "Floating"]]} />

                        <Seg label="Sidebar Mode" value={a.sidebarMode} onChange={v => set({ sidebarMode: v })} options={[["expanded", "Expanded"], ["icon", "Icon"], ["hidden", "Hidden"]]} />

                        <Seg label="Sidebar Collapsible" value={a.collapsible} onChange={v => set({ collapsible: v })}  options={[["offcanvas", "Offcanvas"], ["icon", "Icon"], ["none", "None"]]} />
                    </div>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}