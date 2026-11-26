
import React from "react";
import { Globe, AtSign } from "lucide-react";
import Link from "next/link";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="flex min-h-screen h-full items-start justify-center gap-3 p-1">
            <div className="flex h-full w-full flex-col items-center justify-between p-4">
                <div className="flex w-full items-center justify-end gap-1 text-sm">
                    <div className="text-muted-foreground">
                        Already have an account?
                    </div>
                    <Link
                        href="/auth/login"
                        className="font-semibold text-black dark:text-white"
                    >
                        Login
                    </Link>
                </div>

                {children}

                <div className="flex w-full items-center justify-between">
                    <h3 className="flex items-center gap-1 text-sm">
                        <AtSign className="size-4" />
                        2026, Field Service Management
                    </h3>

                    <div className="flex items-center gap-1">
                        <Globe className="size-4 text-muted-foreground" />
                        <span className="text-sm">ENG</span>
                    </div>
                </div>
            </div>

            <div className="m-5 hidden h-full w-full rounded-md border border-border bg-black dark:bg-white sm:flex">
                <div className="flex h-full w-full flex-col items-center justify-between p-20">
                    <div className="flex h-full w-full flex-col gap-1">
                        Logo

                        <span className="text-2xl font-bold">
                            Field Service Management
                        </span>

                        <span className="text-sm">
                            Design. Build. Launch. Repeat.
                        </span>
                    </div>

                    <div className="flex w-full items-center justify-between gap-3">
                        <div className="flex h-full w-full flex-col space-y-2">
                            <span className="text-sm font-semibold">
                                Ready to launch?
                            </span>
                            <span className="text-sm text-muted-foreground">
                                Clone the repo, install dependencies, and your dashboard is live in minutes.
                            </span>
                        </div>

                        <div className="flex flex-col space-y-2">
                            <span className="text-sm font-semibold">
                                Need help?
                            </span>
                            <span className="text-sm text-muted-foreground">
                                Check out the docs or open an issue on GitHub, community support is just a click away.
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default AuthLayout;
