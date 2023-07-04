import "./globals.css"
import { GlobalContextProvider } from "./Context/store"

export const metadata = {
  title: "User Management",
  description: "Generated by create next app",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <GlobalContextProvider>
        <body>
          <main className="flex flex-col items-center justify-center gap-4">
            {children}
          </main>
        </body>
      </GlobalContextProvider>
    </html>
  )
}
