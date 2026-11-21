import {JSX} from "react";
import {Metadata} from "next";

import DashBoard from "@/components/ClientViews/DashboardView";

export const metadata: Metadata = {
    title: "Dashboard",
};

const HomePage = (): JSX.Element => <DashBoard />
export default HomePage;
