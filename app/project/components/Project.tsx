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
        <Background color="#ccc" />
        <Panel position="top-left">Sign Out</Panel>
        <Panel position="top-right">Clear Project</Panel>
        <Controls />
      </ReactFlow>
    </div>
  )
}

export default Project
