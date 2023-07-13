import Image from "next/image"
import LOGO from "../../public/LOGO.png"

const Heading = () => {
  return (
    <div className="text-center">
      <h1 className="text-5xl mb-5">Ai-Kan</h1>
      <h2 className="text-2xl">
        Turning your genius software ideas into manageable tasks and actionable
        issues.
      </h2>
      <Image src={LOGO} alt="Ai-Kan" className="w-1/2" />
    </div>
  )
}

export default Heading
