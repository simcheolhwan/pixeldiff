import type { RefObject } from "react"
import type { Issue } from "../schemas/diffs.schema"
import ImageWithFallback from "./ImageWithFallback"
import ImageWrapper, { ImageLabel, ImageContainer } from "./ImageWrapper"
import IssueHighlight from "./IssueHighlight"
import SwipeHandleIcon from "../assets/icons/swipe-handle.svg?react"
import styles from "./SwipeView.module.css"

interface SwipeViewProps {
  figmaImage: string
  appImage: string
  imageWidth: number
  swipePosition: number
  containerRef: RefObject<HTMLDivElement | null>
  selectedIssue: Issue | null
  onMouseDown: () => void
}

function SwipeView({
  figmaImage,
  appImage,
  imageWidth,
  swipePosition,
  containerRef,
  selectedIssue,
  onMouseDown,
}: SwipeViewProps) {
  return (
    <div className={styles.container}>
      <div className={styles.swipe}>
        <ImageWrapper>
          <ImageLabel>Figma | App</ImageLabel>
          <ImageContainer width={imageWidth}>
            <div ref={containerRef} style={{ position: "relative", width: "100%", height: "100%" }}>
              <ImageWithFallback src={figmaImage} />
              <div
                className={styles.swipeOverlay}
                style={{
                  clipPath: `inset(0 ${100 - swipePosition}% 0 0)`,
                }}
              >
                <ImageWithFallback src={appImage} />
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
              <IssueHighlight issue={selectedIssue} />
            </div>
          </ImageContainer>
        </ImageWrapper>
      </div>
    </div>
  )
}

export default SwipeView
