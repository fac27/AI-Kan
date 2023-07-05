"use client"
import exampleData from "../../data/exampleData"
import Title from "./Title"
import Task from "./Task"
import Issue from "./Issue"
import Logout from "./Logout"
import Xarrow, { Xwrapper } from "react-xarrows"
import { card } from "../Styles/TailwindClasses"
import { useProject } from "../Context/store"

export default function Project() {
  const project = useProject()
  return (
    <Xwrapper>
      <Title id={"ProjTitle"} />
      {project.map(project => (
        <div key={project.id}>
          <div className="m-4 mt-10 flex space-x-4 w-500">
            {project.tasks.map((task, index) => (
              <Task key={task.id} task={task} id={`Task${index}`} />
            ))}
          </div>
          <div className="m-4 mt-10 flex space-x-4">
            {project.tasks.map((task, index) => (
              <div key={task.id} className={card} id={`Issues${index}`}>
                {task.issues.map(issue => (
                  <Issue
                    key={issue.id}
                    title={issue.title}
                    description={issue.description}
                    done={issue.done}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
      {exampleData[0].tasks.map((_, index) => (
        <>
          <Xarrow
            start={"ProjTitle"}
            end={`Task${index}`}
            startAnchor={"bottom"}
            endAnchor={"top"}
          />
          <Xarrow
            key={index}
            start={`Task${index}`}
            end={`Issues${index}`}
            startAnchor={"bottom"}
            endAnchor={"top"}
          />
        </>
      ))}
      <Logout />
    </Xwrapper>
  )
}
