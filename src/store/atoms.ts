import { atom } from "jotai"
import { atomWithStorage } from "jotai/utils"
import type { ImageFile } from "../types"

// App-wide UI theme (connected to CSS variables)
// 앱 전체 UI 테마 (CSS 변수와 연결됨)
export type Theme = "light" | "dark"

// Supported languages
// 지원되는 언어
export type Language = "en" | "ko"

// Image comparison view modes
// - side-by-side: Display two images side by side
// - overlay: Adjustable transparency overlay
// - swipe: Slider to move the boundary line
// 이미지 비교 뷰 모드
// - side-by-side: 두 이미지를 나란히 표시
// - overlay: 조절 가능한 투명도 오버레이
// - swipe: 경계선을 이동시키는 슬라이더
export type ViewMode = "side-by-side" | "overlay" | "swipe"

// App global state management - stored in localStorage
// 앱 전역 상태 관리 - localStorage에 저장됨
export const themeAtom = atomWithStorage<Theme>("theme", "dark")
export const languageAtom = atomWithStorage<Language>("language", "en")
export const viewModeAtom = atomWithStorage<ViewMode>("viewMode", "side-by-side")
export const overlayOpacityAtom = atom<number>(50)

// Image state management
// 이미지 상태 관리
export const firstImageAtom = atom<ImageFile | null>(null)
export const secondImageAtom = atom<ImageFile | null>(null)

// Derived atoms for convenience
// 편의를 위한 파생 atom
export const hasImagesAtom = atom((get) => {
  const first = get(firstImageAtom)
  const second = get(secondImageAtom)
  return !!(first || second)
})

export const bothImagesLoadedAtom = atom((get) => {
  const first = get(firstImageAtom)
  const second = get(secondImageAtom)
  return !!(first && second)
})

// Derived atom for waiting state - true when only first image exists
// 대기 상태 파생 atom - 첫 번째 이미지만 있을 때 true
export const isWaitingForSecondImageAtom = atom((get) => {
  const first = get(firstImageAtom)
  const second = get(secondImageAtom)
  return !!(first && !second)
})
