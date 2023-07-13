"use client"
import { useEffect, useState, useRef } from "react"
import Xarrow, { Xwrapper } from "react-xarrows"

import Title from "./Title"
import Task from "./Task"
import IssueType from "./Issue"
import Logout from "./Logout"
import Saving from "./Saving"
import Fireworks from "./Fireworks"
import { useProject, useProjectDispatch } from "../../Context/store"
import { supabase } from "../../auth/client"
import { card, issuestyle } from "../../Styles/TailwindClasses"

function Project({ userId }) {
  const targetRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isSaving, setIsSaving] = useState<boolean>(false)
  const [isCleared, setIsCleared] = useState<boolean>(true)

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
    }
  }

  if (userId && project?.name === "") {
    fetchData()
  }

  useEffect(() => {
    if (targetRef.current) {
      const { width } = targetRef.current.getBoundingClientRect()
      setWidth(width)
    }
  }, [project])

  useEffect(() => {
    setIsSaving(true)
    const autoSave = () =>
      setTimeout(async () => {
        if (project?.name !== "") {
          const timeStamp = new Date()
          await supabase
            .from("projects")
            .upsert(
              { user_id: userId, project_object: project, created_at: timeStamp },
              { onConflict: "user_id" }
            )
        }
        setIsSaving(false)
      }, 60 * 60)

    autoSave()

    return () => clearTimeout(autoSave())
  }, [project, userId])
  const isProjComplete = () => {
    if (!project || !project.tasks || project.tasks.length === 0) {
      return false
    }
    return project.tasks.every(task => task.done)
  }

  function handleClearProject() {
    if (!isLoading) {
      if (dispatch) {
        dispatch({
          type: "CLEAR_PROJECT",
          payload: project,
        })
      }
      setIsCleared(true)
    }
  }

  return (
    <Xwrapper key={project?.xarrowChangeCounter}>
      <button
        type="button"
        className="border border-black bg-gray-50 p-1.5 rounded ml-5 fixed top-4 right-4"
        onClick={handleClearProject}
      >
        Clear Project
      </button>
      {isProjComplete() && <Fireworks />}
      {isSaving && <Saving />}
      <Title
        id={"ProjTitle"}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        isCleared={isCleared}
        setIsCleared={setIsCleared}
      />
      <div key={project?.id}>
        <div className="m-4 mt-10 flex space-x-4 w-500 justify-center">
          {!isLoading &&
            project?.tasks.map((task, index) => (
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
            {!isLoading &&
              project?.tasks.map((task, index) => {
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
                      <IssueType key={issue.id} issue={issue} />
                    ))}
                  </div>
                )
              })}
          </div>
        )}
      </div>

      {width &&
        !isLoading &&
        project?.tasks.map((task, index) => (
          <>
            <Xarrow
              key={index + "TaskArrow"}
              start={"ProjTitle"}
              end={`Task${index}`}
              startAnchor={"bottom"}
              endAnchor={"top"}
              color={"gray"}
              strokeWidth={2.5}
              animateDrawing={1.2}
            />
            {task.issues.length > 0 && (
              <Xarrow
                key={index + "IssueArrow"}
                start={`Task${index}`}
                end={`Issues${index}`}
                startAnchor={"bottom"}
                endAnchor={"top"}
                color={"gray"}
                strokeWidth={2.5}
                animateDrawing={1.2}
              />
            )}
          </>
        ))}
      <Logout />
    </Xwrapper>
  )
}

export default Project
