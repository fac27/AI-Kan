import Project from "./Project";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

export async function AuthProject () {
  const supabase = createRouteHandlerClient({ cookies })

  // Check if we have a session
    const {
      data: { session },
    } = await supabase.auth.getSession()
  
    if (session) {
      return (
      <Project/>
      )
    }

    else {
      return (
        <h1>You are not logged in</h1>
        // add a button that redirects to login
      )
    }
}

export default AuthProject