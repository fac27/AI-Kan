"use client"
import { Auth } from "@supabase/auth-ui-react"
import { ThemeSupa } from "@supabase/auth-ui-shared"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Database } from "../Types/database.types"

const AuthForm = () => {
  const supabase = createClientComponentClient<Database>()

  return (
    <Auth
      supabaseClient={supabase}
      view="magic_link"
      appearance={{
        theme: ThemeSupa,
        extend: true,
        // Your custom classes
        style: {
          label: {
            color: "black",
          },
          container: {
            width: "30vw",
            height: "25vh",
            background: "#fff7ed",
            padding: "30px",
            borderRadius: "10px",
            border: "1px solid rgba(0,0,0,0.18)",
          },
          button: {
            background: "#f9fafb",
            color: "black",
            border: "outset 1px black",
          },
          input: { background: "white", color: "black" },
        },
      }}
      theme="dark"
      showLinks={false}
      providers={[]}
      redirectTo="http://localhost:3000/auth/callback"
    />
  )
}

export default AuthForm
