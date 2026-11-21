import {Geist, Inter, Plus_Jakarta_Sans, Roboto, Manrope} from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const geist = Geist({ subsets: ["latin"], variable: "--font-geist" })
const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--font-roboto" })
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta" })
const manrope = Manrope({subsets: ["latin"], weight: ["300","400", "500", "700"] , variable: "--font-manrope" })
export const fonts = {inter, geist, roboto, jakarta, manrope }