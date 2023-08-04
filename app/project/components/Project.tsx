"use client"
import ReactFlow, {
  Background,
  Controls,
  Panel,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  useEdgesState,
  useNodesState,
} from "reactflow"
import { useCallback, useMemo, useState } from "react"
import "reactflow/dist/style.css"

import TitleNode from "./TitleNode"

const initialNodes = [
  {
    id: "node-1",
    type: "titleNode",
    position: { x: 0, y: 0 },
    data: { value: 123 },
  },
]

const initialEdges = []

const nodeTypes = { titleNode: TitleNode }

function Project() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  const [stream, setStream] = useState("")

  const onConnect = useCallback(
    connection => setEdges(eds => addEdge(connection, eds)),
    [setEdges]
  )

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background color="#18c" gap={50} variant="cross" />
        <Panel position="top-left">
          <button>Sign Out</button>
        </Panel>
        <Panel position="top-right">
          <button>Clear Project</button>
        </Panel>
        {stream && <Panel position="bottom-center">{stream}</Panel>}
        <Controls />
      </ReactFlow>
    </div>
  )
}

export default Project
