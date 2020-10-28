import dayjs from 'dayjs'

export function getPageViewOptions() {
  if (!window) {
    return false
  }

  return {
    url: window.location.href,
    timestamp: dayjs().format('YYYY-MM-DDTHH:MM:ss'),
  }
}
