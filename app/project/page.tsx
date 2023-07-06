"use client"
import exampleData from "../../data/exampleData"
import Title from "./Title"
import Task from "./Task"
import Issue from "./Issue"
import Logout from "./Logout"
import { useEffect, useState, useRef } from "react"
import Xarrow, { Xwrapper } from "react-xarrows"
import { card, issuestyle } from "../Styles/TailwindClasses"
import { useProject } from "../Context/store"

export default function Project() {
  const targetRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState<number | null>(null)

  const project = useProject()

  useEffect(() => {
    if (targetRef.current) {
      const { width } = targetRef.current.getBoundingClientRect()
      setWidth(width)
    }
  }, [])

  return (
    <Xwrapper>
      <Title id={"ProjTitle"} />
      {project?.map(project => (
        <div key={project.id}>
          <div className="m-4 mt-10 flex space-x-4 w-500 justify-center">
            {project.tasks.map((task, index) => (
              <Task
                key={task.id}
                task={task}
                id={`Task${index}`}
                targetRef={targetRef}
              />
            ))}
          </div>
          {width && (
            <div className="m-4 mt-10 flex space-x-4 w-500 justify-center">
              {project.tasks.map((task, index) => {
                const hasIssues = task.issues.length > 0
                const conditionalVisibility = hasIssues
                  ? `${card} ${issuestyle}`
                  : `${card} ${issuestyle} invisible`
                return (
                  <div
                    style={{ width: `${width}px` }}
                    key={task.id}
                    className={`${conditionalVisibility} px-2.5 py-2.5 bg-pink-100`}
                    id={`Issues${index}`}
                  >
                    {task.issues.map(issue => (
                      <Issue key={issue.id} issue={issue} />
                    ))}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      ))}
      {width &&
        exampleData[0].tasks.map((task, index) => (
          <>
            <Xarrow
              start={"ProjTitle"}
              end={`Task${index}`}
              startAnchor={"bottom"}
              endAnchor={"top"}
              color={"black"}
              strokeWidth={1}
            />
            {task.issues.length > 0 && (
              <Xarrow
                key={index}
                start={`Task${index}`}
                end={`Issues${index}`}
                startAnchor={"bottom"}
                endAnchor={"top"}
                color={"black"}
                strokeWidth={1}
              />
            )}
          </>
        ))}
      {width && <Logout />}
    </Xwrapper>
  )
}
