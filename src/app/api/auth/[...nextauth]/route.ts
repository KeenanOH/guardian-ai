import NextAuth from "next-auth"

import { nextAuthOptions } from "@/utils/nextAuth"

const handler = NextAuth(nextAuthOptions)
export { handler as GET, handler as POST }
