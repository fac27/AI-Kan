"use client"
import exampleData from "../../data/exampleData"
import Title from "./Title"
import Task from "./Task"
import Issue from "./Issue"
import Logout from "./Logout"
import { useReducer, useRef, useEffect, useState } from "react"
import { useGlobalContext } from "../Context/store"
import Xarrow, { Xwrapper } from "react-xarrows"
import { card } from "../Styles/TailwindClasses"
import { useProject } from "../Context/store"
import { card, issue } from "../Styles/TailwindClasses"

export default function Project() {
  const [width, setWidth] = useState<number | null>(null) //Will remove useState soon!

  useEffect(() => {
    if (targetRef.current) {
      const { width } = targetRef.current.getBoundingClientRect()
      setWidth(width)
    }
  }, [])

  return (
    <Xwrapper>
      <Title id={"ProjTitle"} />
      {project.map(project => (
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
                  ? `${card} ${issue}`
                  : `${card} ${issue} invisible`
                return (
                  <div
                    style={{ width: `${width}px` }}
                    key={task.id}
                    className={`${card} ${issue} ${conditionalVisibility} `}
                    id={`Issues${index}`}
                  >
                    {task.issues.map(issue => (
                      <Issue
                        key={issue.id}
                        title={issue.title}
                        description={issue.description}
                        done={issue.done}
                      />
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
