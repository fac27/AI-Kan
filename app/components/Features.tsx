import "../Styles/Custom.css" // correct import statement

export default function Features() {
  return (
    <div className="flex gap-5 m-10 justify-around text-white w-screen">
      <div className="w-1/6 text-md">
        <p className="text-3xl mb-5">Break It Down:</p>
        <p>
          Enter your software idea, and watch Ai-Kan turn it into a clear task
          list and detailed issues.
        </p>
      </div>
      <div className="w-1/6 text-md">
        <p className="text-3xl mb-5">Personalize:</p>
        <p>Edit tasks and issues to match your unique project.</p>
      </div>
      <div className="w-1/6 text-md">
        <p className="text-3xl mb-5">Progress Tracking:</p>
        <p>
          Track your project progress with ease and celebrate your milestones.
        </p>
      </div>
      <div className="w-1/6 text-md">
        <p className="text-3xl mb-5">Focus On The Fun:</p>
        <p>
          With Ai-Kan taking care of project management, you&#39;re free to do
          what you do best — code and have fun!
        </p>
      </div>
    </div>
  )
}
