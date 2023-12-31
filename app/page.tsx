import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

import CallToAction from "./components/CallToAction"
import Image from "next/image"
import LOGO from "../public/LOGO.png"
import Features from "./components/Features"
import React from "react"
import AuthForm from "./components/AuthForm"

const Home: React.FC = async () => {
  const supabase = createRouteHandlerClient({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session)
    return (
      <div className="flex flex-col h-screen w-screen items-center justify-around">
        <div className="flex flex-col h-screen w-screen items-center justify-center">
          <Image src={LOGO} alt="Ai-Kan" className="mt-20 w-1/6 rounded-lg" />
          <CallToAction />
        </div>
        <AuthForm />
        <div className="mt-10 bg-gray-800">
          <Features />
        </div>
      </div>
    )

  return redirect("/project")
}

export default Home
