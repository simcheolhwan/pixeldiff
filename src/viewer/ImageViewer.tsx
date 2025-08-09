/**
 * ImageViewer Component
 *
 * Main image comparison component that orchestrates different view modes.
 * Switches between side-by-side, overlay, and swipe comparison modes based on
 * user selection. Manages shared functionality like swipe interactions and
 * provides a unified interface for image comparison.
 */
/**
 * ImageViewer 컴포넌트
 *
 * 다양한 뷰 모드를 조율하는 메인 이미지 비교 컴포넌트입니다.
 * 사용자 선택에 따라 나란히, 오버레이, 스와이프 비교 모드 간을 전환합니다.
 * 스와이프 인터랙션과 같은 공유 기능을 관리하고 이미지 비교를 위한
 * 통합된 인터페이스를 제공합니다.
 */

import { useRef } from "react"
import { useAtomValue } from "jotai"
import { viewModeAtom, overlayOpacityAtom, firstImageAtom, secondImageAtom } from "../store/atoms"
import { useSwipe } from "../hooks/useSwipe"
import SideBySideView from "./SideBySideView"
import OverlayView from "./OverlayView"
import SwipeView from "./SwipeView"

function ImageViewer() {
  const firstImage = useAtomValue(firstImageAtom)
  const secondImage = useAtomValue(secondImageAtom)
  const viewMode = useAtomValue(viewModeAtom)
  const overlayOpacity = useAtomValue(overlayOpacityAtom)

  const containerRef = useRef<HTMLDivElement>(null)

  const { swipePosition, handleMouseDown } = useSwipe(viewMode, containerRef)

  const commonProps = {
    firstImage,
    secondImage,
    containerRef,
  }

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
