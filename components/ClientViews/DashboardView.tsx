'use client'

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FormatDate, GetGreeting, isLate } from "@/lib/DateHelper";
import {CalendarCog, CircleCheckBig, Clock, Hourglass, Info, RefreshCcw} from "lucide-react";
import {Button} from "@/components/ui/button";

const items = [
    { label: "Overview", value: "overview" },
    { label: "Service Appointments", value: "service_appointments" },
    { label: "Requests Management", value: "requests_management" },
    { label: "Technician View", value: "technician_view" },
]
const user= {
    name : "Unathi Zulu",
    role: "Administrator",
}

const CurrentDate: string = FormatDate(new Date());
const Greeting: string = !isLate() ? `${GetGreeting()}! ${user.name}` : `${GetGreeting()}, ${user.name}?`;

const DashBoard = () => {
    return (
        <section id="home-page-hero" className="w-full space-y-4">
            <div className="flex justify-between items-canter w-full">
                <div className="flex flex-col gap-1 w-full">
                    <span className="text-sm text-muted-foreground">{CurrentDate}</span>
                    <h1 className="text-2xl font-bold">{Greeting}</h1>
                </div>
                <div >
                    <Select items={items}>
                        <SelectTrigger className="h-8 px-3 rounded-md">
                            <SelectValue placeholder={items[0].label} />
                        </SelectTrigger>
                        <SelectContent className="w-full p-2 mt-10 rounded-md">
                            <SelectGroup>
                                {items.map((item) => (
                                    <SelectItem key={item.value} value={item.value}>
                                        {item.label}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="rounded-full mb-6 p-2 bg-muted gap-2 divide-x flex items-center justify-start px-4 w-fit">
                <div className="flex justify-center items-center gap-1 px-2">
                    <div className="flex items-center gap-1 font-bold text-sm">
                        <Clock className="size-3" />
                        12Hrs
                    </div>
                    <div className="text-muted-foreground text-xs">
                        Time Saved
                    </div>
                </div>

                <div className="flex justify-center items-center gap-1 px-2">
                    <div className="flex items-center gap-1 font-bold text-sm">
                        <CircleCheckBig  className="size-3" />
                        24
                    </div>
                    <div className="text-muted-foreground text-xs">
                        Assignments Complete
                    </div>
                </div>

                <div className="flex justify-center items-center gap-1">
                    <div className="flex items-center gap-1 font-bold text-sm">
                        <Hourglass   className="size-3" />
                        7
                    </div>
                    <div className="text-muted-foreground text-xs">
                        Assignments In-progress
                    </div>

                </div>
            </div>

            <div className="relative flex h-px flex-1 overflow-hidden bg-linear-to-r from-transparent via-primary/20 to-transparent"/>

            <div className="flex items-center gap-2 mt-6 w-full">
                {/*{[1,2,3,4].map((item) => (*/}
                {/*    <div className="transition-all duration-500 ease-in-out rounded-md bg-card flex flex-col border group relative overflow-hidden w-full">*/}
                {/*        <div className="gap-2">*/}
                {/*            <div className="flex items-center justify-between p-2 gap-3">*/}
                {/*                <p className="w-60 truncate">*/}
                {/*                    Upcoming Service Appointments*/}
                {/*                </p>*/}
                {/*                <div className="flex items-center">*/}
                {/*                    <Button variant="ghost" size="icon">*/}
                {/*                        <Info className="size-4"/>*/}
                {/*                    </Button>*/}
                {/*                    <Button variant="ghost" size="icon">*/}
                {/*                        <RefreshCcw  className="size-4" />*/}
                {/*                    </Button>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*            <div className="h-16 px-2 my-4 flex items-center">*/}
                {/*                <h2 className="text-4xl font-bold">0</h2>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*        <div className="bg-muted border-t p-2 flex items-center justify-between mt-5 text-muted-foreground">*/}
                {/*            <span className="">last 6 months</span>*/}
                {/*            <div className="rounded-full border-3 border-background p-6 absolute bottom-2 -right-5 text-muted-foreground bg-muted">*/}
                {/*                <CalendarCog className="size-6" />*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*))}*/}

            </div>
        </section>
    )
}
export default DashBoard;
