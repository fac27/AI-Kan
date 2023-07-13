import "../app/Styles/globals.css"
import { ProjectProvider } from "./Context/store"

export const metadata = {
  title: "Ai-Kan",
  description: "A smart project board",
}

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <ProjectProvider>
        <body className="h-screen w-screen">
          <main className="flex flex-col items-center justify-center gap-4">
            {children}
          </main>
        </body>
      </ProjectProvider>
    </html>
  )
}

export default RootLayout
