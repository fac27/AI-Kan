import { useCallback, useEffect, useRef } from "react"
import confetti from "canvas-confetti"
import ReactCanvasConfetti from "react-canvas-confetti"

interface ConfettiInstance {
  (options: confetti.Options): void
}

const Confetti = () => {
  const refAnimationInstance = useRef<ConfettiInstance | null>(null)

  const getInstance = useCallback((instance: confetti.CreateTypes) => {
    refAnimationInstance.current = instance
  }, [])

  const makeShot = useCallback(
    (particleRatio: number, opts: confetti.Options) => {
      refAnimationInstance.current &&
        refAnimationInstance.current({
          ...opts,
          origin: { y: 0.7 },
          particleCount: Math.floor(50 * particleRatio),
        })
    },
    []
  )

  const fire = useCallback(() => {
    makeShot(0.25, {
      spread: 26,
      startVelocity: 55,
    })

    makeShot(0.2, {
      spread: 60,
    })

    makeShot(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    })

    makeShot(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    })

    makeShot(0.1, {
      spread: 120,
      startVelocity: 45,
    })
  }, [makeShot])

  useEffect(() => fire(), [fire])

  return (
    <ReactCanvasConfetti
      refConfetti={getInstance}
      style={{
        position: "fixed",
        pointerEvents: "none",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
      }}
    />
  )
}


export default Confetti
