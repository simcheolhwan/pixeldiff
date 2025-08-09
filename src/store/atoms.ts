import { atom } from "jotai"

// 앱 전체 UI 테마 (CSS 변수로 연결됨)
export type Theme = "light" | "dark"

// 지원 언어
export type Language = "en" | "ko"

// 이미지 비교 뷰 모드
// - side-by-side: 두 이미지를 나란히 표시
// - overlay: 투명도 조절 가능한 오버레이
// - swipe: 슬라이더로 경계선 이동
export type ViewMode = "side-by-side" | "overlay" | "swipe"

// 앱 전역 상태 관리
export const themeAtom = atom<Theme>("dark")
export const languageAtom = atom<Language>("ko")
export const viewModeAtom = atom<ViewMode>("side-by-side")
export const overlayOpacityAtom = atom<number>(50) // Overlay 모드에서 사용 (0-100)
export const selectedIssueIndexAtom = atom<number | null>(null) // 선택된 이슈 인덱스
