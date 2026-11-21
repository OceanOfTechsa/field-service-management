"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

const ModeToggle =() => {
    const { resolvedTheme, setTheme } = useTheme()

    return (
        <Button
            variant="outline"
            size="icon"
            className="relative"
            aria-label="Toggle theme"
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
        >
            {/* sun shows in light, moon shows in dark (pure CSS, so no hydration mismatch) */}
            <Sun className="size-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
            <Moon className="absolute size-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
        </Button>
    )
}

export { ModeToggle };