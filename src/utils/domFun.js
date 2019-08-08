/**
 * @flow
 */

export function addEvent(el: Object, event: string, handler: Function, useCapTure: boolean = false): void {
  if (!el) { return }
  if (el.attachEvent) {
    el.attachEvent(`on${event}`, handler)
  } else if (el.addEventListener) {
    el.addEventListener(event, handler, useCapTure)
  } else if (el[`on${event}`]) {
    el[`on${event}`] = handler
    // $FlowIgnore: Doesn't think elements are indexable
  }
}

export function removeEvent(el: Object, event: string, handler: Function, useCapTure: boolean = false): void {
  if (!el) { return }
  if (el.detachEvent) {
    el.detachEvent(`on${event}`, handler)
  } else if (el.removeEventListener) {
    el.removeEventListener(event, handler, useCapTure)
  } else if (el[`on${event}`]) {
    el[`on${event}`] = null
  }
}
