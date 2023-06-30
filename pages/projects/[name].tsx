import { GetStaticPaths, GetStaticProps } from "next"

import exampleData from "../../data/exampleData"
import Grandparent from "../../components/Grandparent"

type Params = {
  name: string
}

export const getStaticPaths: GetStaticPaths<Params> = () => {
  const paths = exampleData.map(project => ({
    params: {
      name: project.name.toLowerCase().replace(/\s/g, "-"),
    },
  }))

  return {
    paths,
    fallback: false,
  }
}

type Props = {
  tasks: Task[]
}

type Task = {
  id: number
  title: string
  description: string
  timeEstimate: string
  issues: Issue[]
  done: boolean
}

type Issue = {
  id: number
  taskId: number
  description: string
  timeEstimate: string
  done: boolean
}

export const getStaticProps: GetStaticProps<Props, Params> = ({ params }) => {
  const tasks = exampleData[0].tasks
  return {
    props: {
      tasks,
    },
  }
}

export default function Project({ props }) {
  return <Grandparent />
}
