/**
 * SideBySideView Component
 *
 * Displays two images side by side for direct comparison.
 * Automatically adjusts layout orientation (horizontal/vertical) based on
 * image dimensions and aspect ratios. This is the default comparison mode
 * providing clear visual separation between the two images.
 */
/**
 * SideBySideView 컴포넌트
 *
 * 직접 비교를 위해 두 이미지를 나란히 표시합니다.
 * 이미지 크기와 종횡비에 따라 레이아웃 방향(수평/수직)을 자동으로 조정합니다.
 * 두 이미지 간의 명확한 시각적 분리를 제공하는 기본 비교 모드입니다.
 */

import type { RefObject } from "react"
import clsx from "clsx"
import type { ImageFile } from "../types"
import { useBothImagesLandscape } from "../hooks/useImageDimensions"
import ImageWithFallback from "./ImageWithFallback"
import ImageWrapper, { ImageContainer } from "./ImageWrapper"
import styles from "./SideBySideView.module.css"

interface SideBySideViewProps {
  firstImage: ImageFile | null
  secondImage: ImageFile | null
  containerRef: RefObject<HTMLDivElement | null>
}

function SideBySideView({ firstImage, secondImage, containerRef }: SideBySideViewProps) {
  const isVerticalLayout = useBothImagesLandscape(firstImage, secondImage)

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={clsx(styles.sideBySide, isVerticalLayout && styles.vertical)}>
        <ImageWrapper>
          <ImageContainer>
            {firstImage ? (
              <>
                <ImageWithFallback src={firstImage.preview} />
                <div className={styles.fileName}>{firstImage.name}</div>
              </>
            ) : (
              <div className={styles.placeholder}>No image loaded</div>
            )}
          </ImageContainer>
        </ImageWrapper>
        <ImageWrapper>
          <ImageContainer>
            {secondImage ? (
              <>
                <ImageWithFallback src={secondImage.preview} />
                <div className={styles.fileName}>{secondImage.name}</div>
              </>
            ) : (
              <div className={styles.placeholder}>No image loaded</div>
            )}
          </ImageContainer>
        </ImageWrapper>
      </div>
    </div>
  )
}

export default SideBySideView
