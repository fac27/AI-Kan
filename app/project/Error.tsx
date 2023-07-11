interface Props {
  error: string
}

const Error: React.FC<Props> = ({ error }) => {
  return (
    <div
      role="alert"
      className="border border-orange-150 rounded-b bg-orange-100 px-5 py-5 text-orange-700 fixed"
    >
      {error.split("\n").map((line, index) => (
        <p key={index}>{line}</p>
      ))}
    </div>
  )
}

export default Error
