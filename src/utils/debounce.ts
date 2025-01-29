export function debounce<Args extends unknown[]>(
  func: (...args: Args) => void,
  delay: number,
): (...args: Args) => void {
  let timeout: number

  return (...args: Args) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), delay)
  }
}
