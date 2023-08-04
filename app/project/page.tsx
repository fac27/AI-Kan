//import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
//import { cookies } from "next/headers"
//import { redirect } from "next/navigation"
import Project from "./components/Project"

const AuthProject = async () => {
  /* const supabase = createRouteHandlerClient({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const data = await supabase.auth.getUser()
  const userId = data.data?.user?.id

  if (!session) return redirect("/") */

  return <Project />
}

export default AuthProject
