const Saving = () => {
  return (
    <div role="status" className="flex-row align-middle">
      <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
        <div
          className="bg-blue-600 h-2.5 rounded-full"
          style={quarterDoneStyle}
          ></div>
      </div>
      {/* <span >...saving</span> */}
    </div>
  )
}

const quarterDoneStyle = {
  width: 100
}

const savingAnimationStyle = {
  transition: 'width 1 linear',

}

export default Saving
