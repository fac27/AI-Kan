import React, { useCallback, useEffect, useRef } from "react"
import ReactCanvasConfetti from "react-canvas-confetti"
import * as confetti from "canvas-confetti"

interface ConfettiInstance {
  (options: confetti.Options): void
}

function randomInRange(min: number, max: number) {
  return Math.random() * (max - min) + min
}

const canvasStyles: React.CSSProperties = {
  position: "fixed",
  pointerEvents: "none",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
}

function getAnimationSettings(originXA: number, originXB: number) {
  return {
    startVelocity: 30,
    spread: 360,
    ticks: 60,
    zIndex: 0,
    particleCount: 150,
    origin: {
      x: randomInRange(originXA, originXB),
      y: Math.random() - 0.2,
    },
  }
}

export default function Fireworks() {
  const refAnimationInstance = useRef<ConfettiInstance | null>(null)

  const getInstance = useCallback((instance: ConfettiInstance | null) => {
    refAnimationInstance.current = instance
  }, [])

  const nextTickAnimation = useCallback(() => {
    if (refAnimationInstance.current) {
      refAnimationInstance.current(getAnimationSettings(0.1, 0.3))
      refAnimationInstance.current(getAnimationSettings(0.7, 0.9))
    }
  }, [])

  useEffect(() => {
    const intervalId = setInterval(nextTickAnimation, 400)
    const timeoutId = setTimeout(() => clearInterval(intervalId), 5000)

    // return a cleanup function to stop the interval and timeout when the component is unmounted
    return () => {
      clearInterval(intervalId)
      clearTimeout(timeoutId)
    }
  }, [nextTickAnimation])

  return <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />
}
