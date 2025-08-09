import { useRef } from "react"
import { useAtomValue } from "jotai"
import { viewModeAtom, overlayOpacityAtom, selectedIssueIndexAtom } from "../store/atoms"
import { useSwipe } from "../hooks/useSwipe"
import SideBySideView from "./SideBySideView"
import OverlayView from "./OverlayView"
import SwipeView from "./SwipeView"
import type { Issue } from "../schemas/diffs.schema"
import styles from "./ImageViewer.module.css"

interface ImageViewerProps {
  /** Figma 디자인 이미지 경로 */
  figmaImage: string
  /** 실제 앱 스크린샷 경로 */
  appImage: string
  /** 이슈 목록 (선택된 이슈는 하이라이트 표시) */
  issues?: Issue[]
  /** 이미지 기본 너비 (픽셀) */
  imageWidth: number
}

/**
 * 이미지 비교 뷰어 메인 컴포넌트
 *
 * 세 가지 비교 모드를 지원하는 이미지 뷰어입니다:
 * - Side-by-side: 두 이미지를 나란히 표시
 * - Overlay: 투명도 조절로 겹쳐서 비교
 * - Swipe: 드래그 가능한 경계선으로 비교
 *
 * @component
 */
function ImageViewer({ figmaImage, appImage, issues = [], imageWidth }: ImageViewerProps) {
  // TODO: ImageViewer가 너무 많은 책임을 가짐
  // - 뷰 모드별 로직을 Strategy Pattern으로 분리 고려
  // - Factory Pattern으로 컴포넌트 선택 로직 개선
  
  const viewMode = useAtomValue(viewModeAtom)
  const overlayOpacity = useAtomValue(overlayOpacityAtom)
  const selectedIssueIndex = useAtomValue(selectedIssueIndexAtom)

  const containerRef = useRef<HTMLDivElement>(null)

  // Swipe 모드 관련 로직
  const { swipePosition, handleMouseDown } = useSwipe(viewMode, containerRef)

  // TODO: 배열 경계 검사 추가 필요
  // selectedIssueIndex >= 0 && selectedIssueIndex < issues.length 체크
  const commonProps = {
    figmaImage,
    appImage,
    imageWidth,
    containerRef,
    selectedIssue: selectedIssueIndex !== null ? issues[selectedIssueIndex] : null,
  }

  // TODO: useMemo로 commonProps 메모이제이션 고려 (성능 최적화)
  
  // 뷰 모드에 따른 렌더링 분기
  switch (viewMode) {
    case "side-by-side":
      return <SideBySideView {...commonProps} />

    case "overlay":
      return <OverlayView {...commonProps} overlayOpacity={overlayOpacity} />

    case "swipe":
      return (
        <SwipeView {...commonProps} swipePosition={swipePosition} onMouseDown={handleMouseDown} />
      )

    default:
      return <SideBySideView {...commonProps} />
  }
}

export default ImageViewer
