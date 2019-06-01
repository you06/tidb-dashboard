export const formatDatetime = date => {
  const t = new Date(date)
  const year = t.getFullYear()
  const m = t.getMonth() + 1
  const month = m ? '0' + m : m
  const day = t.getDate() < 10 ? '0' + t.getDate() : t.getDate()
  const hour = t.getHours()
  const minute = t.getMinutes() < 10 ? '0' + t.getMinutes() : t.getMinutes()
  const second = t.getSeconds()
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`
}

export const formatTime = date => {
  const t = new Date(date)
  const hour = t.getHours()
  const minute = t.getMinutes() < 10 ? '0' + t.getMinutes() : t.getMinutes()
  return `${hour}:${minute}`
}
