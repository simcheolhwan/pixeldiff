import type { Issue } from "../schemas/diffs.schema"
import styles from "./ImageViewer.module.css"

interface IssueHighlightProps {
  issue: Issue | null
}

function IssueHighlight({ issue }: IssueHighlightProps) {
  if (!issue?.bounds) return null

  return (
    <div
      className={styles.highlight}
      style={{
        left: `${issue.bounds.x}px`,
        top: `${issue.bounds.y}px`,
        width: `${issue.bounds.width}px`,
        height: `${issue.bounds.height}px`,
      }}
    />
  )
}

export default IssueHighlight