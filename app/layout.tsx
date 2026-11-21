import React from "react";
import {Metadata} from "next";

import "./globals.css";
import {INIT} from "@/utils/Site/Init";
import { fonts } from "@/utils/Site/Fonts";
import SiteMetadata from "@/utils/Site/Metadata";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppearanceProvider } from "@/components/appearance-provider";

export const metadata: Metadata = SiteMetadata;

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
      <html lang="en" suppressHydrationWarning className={`${fonts.inter.variable} ${fonts.geist.variable} ${fonts.roboto.variable} ${fonts.jakarta.variable} ${fonts.manrope.variable}`}>
          <head>
              <script dangerouslySetInnerHTML={{ __html: INIT }} />
          </head>
          <body>
          <AppearanceProvider>
              <TooltipProvider>{children}</TooltipProvider>
          </AppearanceProvider>
          </body>
      </html>
  )
}

export default  RootLayout;