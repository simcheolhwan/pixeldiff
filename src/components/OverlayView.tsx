import type { RefObject } from "react"
import type { Issue } from "../schemas/diffs.schema"
import ImageWithFallback from "./ImageWithFallback"
import ImageWrapper, { ImageLabel, ImageContainer } from "./ImageWrapper"
import IssueHighlight from "./IssueHighlight"
import styles from "./OverlayView.module.css"

interface OverlayViewProps {
  figmaImage: string
  appImage: string
  imageWidth: number
  overlayOpacity: number
  containerRef: RefObject<HTMLDivElement | null>
  selectedIssue: Issue | null
}

function OverlayView({
  figmaImage,
  appImage,
  imageWidth,
  overlayOpacity,
  containerRef,
  selectedIssue,
}: OverlayViewProps) {
  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.overlay}>
        <ImageWrapper>
          <ImageLabel>Figma / App</ImageLabel>
          <ImageContainer width={imageWidth}>
            <ImageWithFallback src={figmaImage} />
            <ImageWithFallback
              src={appImage}
              className={styles.overlayImage}
              style={{
                opacity: overlayOpacity / 100,
              }}
            />
            <IssueHighlight issue={selectedIssue} />
          </ImageContainer>
        </ImageWrapper>
      </div>
    </div>
  )
}

export default OverlayView
