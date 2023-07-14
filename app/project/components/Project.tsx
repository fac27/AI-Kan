"use client"
import ReactFlow, { Background, Controls } from "reactflow"

function Project() {
  return (
    <div style={{ height: "100%" }}>
      <ReactFlow>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  )
}

export default Project
