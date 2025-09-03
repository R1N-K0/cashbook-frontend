const utsToJst = (date: Date) => {
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
}

export default utsToJst
