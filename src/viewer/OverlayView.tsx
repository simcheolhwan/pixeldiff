/**
 * OverlayView Component
 *
 * Displays two images overlayed on top of each other with adjustable transparency.
 * The first image serves as the base layer, and the second image is overlayed
 * on top with configurable opacity. This comparison mode is useful for detecting
 * subtle differences between similar images.
 */
/**
 * OverlayView 컴포넌트
 *
 * 두 이미지를 투명도 조절이 가능한 오버레이 형태로 표시합니다.
 * 첫 번째 이미지가 기본 레이어 역할을 하고, 두 번째 이미지가 설정 가능한
 * 투명도로 위에 오버레이됩니다. 이 비교 모드는 유사한 이미지 간의
 * 미묘한 차이를 감지하는데 유용합니다.
 */

import type { RefObject } from "react"
import type { ImageFile } from "../types"
import ImageWithFallback from "./ImageWithFallback"
import ImageWrapper, { ImageContainer } from "./ImageWrapper"
import styles from "./OverlayView.module.css"

interface OverlayViewProps {
  firstImage: ImageFile | null
  secondImage: ImageFile | null
  overlayOpacity: number
  containerRef: RefObject<HTMLDivElement | null>
}

function OverlayView({ firstImage, secondImage, overlayOpacity, containerRef }: OverlayViewProps) {
  if (!firstImage && !secondImage) {
    return (
      <div className={styles.container} ref={containerRef}>
        <div className={styles.placeholder}>No images loaded</div>
      </div>
    )
  }

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.overlay}>
        <ImageWrapper>
          <ImageContainer className={styles.overlayContainer}>
            <div className={styles.imageStack}>
              {firstImage && <ImageWithFallback src={firstImage.preview} />}
              {secondImage && (
                <ImageWithFallback
                  src={secondImage.preview}
                  className={styles.overlayImage}
                  style={{
                    opacity: overlayOpacity / 100,
                  }}
                />
              )}
            </div>
            <div className={styles.fileNames}>
              {firstImage && <span>{firstImage.name}</span>}
              {firstImage && secondImage && <span> / </span>}
              {secondImage && <span>{secondImage.name}</span>}
            </div>
          </ImageContainer>
        </ImageWrapper>
      </div>
    </div>
  )
}

export default OverlayView
