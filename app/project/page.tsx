import Project from "./Project"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function AuthProject() {
  const supabase = createRouteHandlerClient({ cookies })

  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (session) {
    return <Project />
  } else {
    return (
      redirect('/')
    )
  }
}

export default AuthProject
