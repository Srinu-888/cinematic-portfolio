import { createContext, useContext } from 'react'

export interface ScrollApi {
  scrollTo: (target: string | number | HTMLElement) => void
  stop: () => void
  start: () => void
}

/** Fallback used when Lenis is off (reduced motion) or before it mounts: native scrolling. */
export const nativeScroll: ScrollApi = {
  scrollTo: (t) => {
    if (typeof t === 'number') window.scrollTo({ top: t })
    else if (typeof t === 'string') document.querySelector(t)?.scrollIntoView()
    else t.scrollIntoView()
  },
  stop: () => {},
  start: () => {},
}

export const ScrollContext = createContext<ScrollApi>(nativeScroll)
export const useScroller = () => useContext(ScrollContext)
