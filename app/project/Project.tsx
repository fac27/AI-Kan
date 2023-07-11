"use client"
import Title from "./Title"
import Task from "./Task"
import Issue from "./Issue"
import Logout from "./Logout"
import { useEffect, useState, useRef } from "react"
import Xarrow, { Xwrapper } from "react-xarrows"
import { card, issuestyle } from "../Styles/TailwindClasses"
import { useProject, useProjectDispatch } from "../Context/store"
import { Project } from "../types/types"
import { supabase } from "../auth/client"

export default function Project({ userId }) {
  const targetRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState<number | null>(null)
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [newProject, setNewProject] = useState<boolean | null>(null)

  const dispatch = useProjectDispatch()
  const project = useProject()

  const fetchData = async () => {
    const { data } =
      userId &&
      (await supabase
        .from("projects")
        .select("project_object")
        .eq("user_id", userId))

    if (data && data.length > 0) {
      const savedProject = data[0].project_object
      dispatch && dispatch({ type: "NEW_PROJECT", payload: savedProject })
      setNewProject(false)
    }else{
      setNewProject(true)
    }
  }

  const insertNewProject = async () => {
    await supabase
    .from("projects")
    .insert({ user_id: userId, project_object: project })
    setNewProject(false)
    console.log("ADDED")
  }
  
  if (userId && project?.name === "") fetchData()
  if(userId && newProject) insertNewProject()
  
  useEffect(() => {
    if (targetRef.current) {
      const { width } = targetRef.current.getBoundingClientRect()
      setWidth(width)
    }
  }, [project])

  async function autoSave() {
    if (project?.name !== "") {
      try {
        await supabase
          .from("projects")
          .update({ user_id: userId, project_object: project })
          .eq("user_id", userId)
        setIsEditing(false)
        console.log("SAVED")
      } catch (error) {
        console.log(error) // HANDLE THIS MORE GRACEFULLY
      }
    }
  }

  useEffect(() => {
    if (isEditing) {
      // animation !!!?!
    }
    setIsEditing(true)
    const saveTimeout = () => setTimeout(autoSave, 60 * 60)
    saveTimeout()
    return () => clearTimeout(saveTimeout())
  }, [project])

  return (
    <Xwrapper key={project?.xarrowChangeCounter}>
      <Title id={"ProjTitle"} />

      <div key={project?.id}>
        <div className="m-4 mt-10 flex space-x-4 w-500 justify-center">
          {project?.tasks.map((task, index) => (
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
            {project?.tasks.map((task, index) => {
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

      {width &&
        project?.tasks.map((task, index) => (
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
      <Logout />
    </Xwrapper>
  )
}
