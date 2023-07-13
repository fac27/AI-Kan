const Logout = () => {
  return (
    <form action="/auth/signout" method="post" className="fixed top-4 left-4">
      <button
        className="border border-black bg-gray-50 p-1.5 rounded"
        type="submit"
      >
        Sign out
      </button>
    </form>
  )
}

export default Logout
