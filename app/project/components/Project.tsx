"use client"
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  Panel,
  addEdge,
  useEdgesState,
  useNodesState,
} from "reactflow"
import { useCallback } from "react"
import "reactflow/dist/style.css"

import TitleNode from "./TitleNode"
import { useStreamContext } from "../../Context/store"

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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  const onConnect = useCallback(
    connection => setEdges(eds => addEdge(connection, eds)),
    [setEdges]
  )

  const streamContext = useStreamContext()
  const stream = streamContext?.stream

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
        <Background
          color="#18c"
          gap={75}
          size={3}
          variant={BackgroundVariant.Dots}
        />
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
