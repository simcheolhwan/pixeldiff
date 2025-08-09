/**
 * SwipeView Component
 *
 * Provides an interactive swipe-based comparison between two images.
 * Features a draggable handle that allows users to reveal different portions
 * of each image by sliding the divider line first or second. This comparison
 * mode is ideal for before/after comparisons and detecting changes along
 * specific boundaries or regions.
 */
/**
 * SwipeView 컴포넌트
 *
 * 두 이미지 간의 인터랙티브한 스와이프 기반 비교를 제공합니다.
 * 드래그 가능한 핸들을 통해 사용자가 분할선을 좌우로 슬라이드하여
 * 각 이미지의 다른 부분을 드러낼 수 있습니다. 이 비교 모드는
 * 전후 비교와 특정 경계나 영역에서의 변화 감지에 이상적입니다.
 */

import type { RefObject } from "react"
import type { ImageFile } from "../types"
import ImageWithFallback from "./ImageWithFallback"
import ImageWrapper, { ImageContainer } from "./ImageWrapper"
import SwipeHandleIcon from "../assets/icons/swipe-handle.svg?react"
import styles from "./SwipeView.module.css"

interface SwipeViewProps {
  firstImage: ImageFile | null
  secondImage: ImageFile | null
  swipePosition: number
  containerRef: RefObject<HTMLDivElement | null>
  onMouseDown: () => void
}

function SwipeView({
  firstImage,
  secondImage,
  swipePosition,
  containerRef,
  onMouseDown,
}: SwipeViewProps) {
  if (!firstImage || !secondImage) {
    return (
      <div className={styles.container}>
        <div className={styles.placeholder}>Please load both images to use swipe mode</div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.swipe}>
        <ImageWrapper>
          <ImageContainer>
            <div ref={containerRef} style={{ position: "relative", width: "100%", height: "100%" }}>
              <ImageWithFallback src={firstImage.preview} />
              <div
                className={styles.swipeOverlay}
                style={{
                  clipPath: `inset(0 ${100 - swipePosition}% 0 0)`,
                }}
              >
                <ImageWithFallback src={secondImage.preview} />
              </div>
              <div
                className={styles.swipeHandle}
                style={{ left: `${swipePosition}%` }}
                onMouseDown={onMouseDown}
              >
                <div className={styles.swipeHandleLine} />
                <div className={styles.swipeHandleThumb}>
                  <SwipeHandleIcon />
                </div>
              </div>
            </div>
            <div className={styles.fileNames}>
              <span className={styles.firstFileName}>{firstImage.name}</span>
              <span className={styles.separator}>|</span>
              <span className={styles.secondFileName}>{secondImage.name}</span>
            </div>
          </ImageContainer>
        </ImageWrapper>
      </div>
    </div>
  )
}

export default SwipeView
