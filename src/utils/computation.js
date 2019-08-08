function computation(fn, name) {
  /* eslint no-console: 0 */
  console.time(name)
  for (let i = 0; i < 1000; i += 1) {
    fn()
  }
  /* eslint no-console: 0 */
  console.timeEnd(name)
}

export default computation
