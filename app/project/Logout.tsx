const Logout = () => {
  return (
    <form action="/auth/signout" method="post">
      <button className="button block" type="submit">
        Sign out
      </button>
    </form>
  )
}

export default Logout
