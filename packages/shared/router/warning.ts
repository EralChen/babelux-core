export function warn(msg: string, ..._args: any[]): void
export function warn (msg: string): void {
  // avoid using ...args as it breaks in older Edge builds
  // eslint-disable-next-line prefer-rest-params
  const args = Array.from(arguments).slice(1)
  // eslint-disable-next-line prefer-spread, no-console
  console.warn.apply(
    console,
    ['[Vue Router warn]: ' + msg].concat(args) as [string, ...any[]],
  )
}
