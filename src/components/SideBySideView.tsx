import type { RefObject } from "react"
import type { Issue } from "../schemas/diffs.schema"
import ImageWithFallback from "./ImageWithFallback"
import ImageWrapper, { ImageLabel, ImageContainer } from "./ImageWrapper"
import IssueHighlight from "./IssueHighlight"
import styles from "./SideBySideView.module.css"

interface SideBySideViewProps {
  figmaImage: string
  appImage: string
  imageWidth: number
  containerRef: RefObject<HTMLDivElement | null>
  selectedIssue: Issue | null
}

function SideBySideView({
  figmaImage,
  appImage,
  imageWidth,
  containerRef,
  selectedIssue,
}: SideBySideViewProps) {
  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.sideBySide}>
        <ImageWrapper>
          <ImageLabel>Figma</ImageLabel>
          <ImageContainer width={imageWidth}>
            <ImageWithFallback src={figmaImage} />
            <IssueHighlight issue={selectedIssue} />
          </ImageContainer>
        </ImageWrapper>
        <ImageWrapper>
          <ImageLabel>App</ImageLabel>
          <ImageContainer width={imageWidth}>
            <ImageWithFallback src={appImage} />
            <IssueHighlight issue={selectedIssue} />
          </ImageContainer>
        </ImageWrapper>
      </div>
    </div>
  )
}

export default SideBySideView
