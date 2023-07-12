import React, { useCallback, useEffect, useRef, useState } from "react"
import ReactCanvasConfetti from "react-canvas-confetti"

function randomInRange(min, max) {
  return Math.random() * (max - min) + min
}

const canvasStyles = {
  position: "fixed",
  pointerEvents: "none",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
}

function getAnimationSettings(originXA, originXB) {
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
  const refAnimationInstance = useRef(null)

  const getInstance = useCallback(instance => {
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
