import Project from "./components/Project"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function AuthProject() {
  const supabase = createRouteHandlerClient({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const data = await supabase.auth.getUser()
  const userId = data.data?.user?.id

  if (!session) return redirect("/")

  return <Project userId={userId} />
}
