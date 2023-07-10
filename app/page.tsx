import React from "react"
import AuthForm from "./auth-form"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

const Home: React.FC = async () => {
  const supabase = createRouteHandlerClient({ cookies })
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) return <AuthForm />
    return redirect("/project") 
}

export default Home
