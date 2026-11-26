import React from "react";

import { AppShell } from "@/components/app-shell";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return <AppShell>{children}</AppShell>
}

export default Layout;