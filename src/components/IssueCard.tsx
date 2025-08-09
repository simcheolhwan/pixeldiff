import { useAtomValue } from "jotai"
import clsx from "clsx"
import { languageAtom } from "../store/atoms"
import { getSuggestedFix } from "../utils/issueUtils"
import type { Issue } from "../schemas/diffs.schema"
import LocationIcon from "../assets/icons/location.svg?react"
import styles from "./IssueCard.module.css"

interface DiffCardProps {
  issue: Issue
  index: number
  isSelected: boolean
  onSelect: (index: number) => void
}

function IssueCard({ issue, index, isSelected, onSelect }: DiffCardProps) {
  const language = useAtomValue(languageAtom)

  const handleClick = () => {
    if (issue.bounds) {
      onSelect(index)
    }
  }

  const suggestedFix = getSuggestedFix(issue, language)

  return (
    <div
      className={clsx(styles.card, isSelected && styles.selected, issue.bounds && styles.clickable)}
      onClick={handleClick}
    >
      <div className={styles.cardHeader}>
        <span className={styles.type}>{issue.type}</span>
        <div className={styles.headerRight}>
          <span className={clsx(styles.severity, styles[issue.severity])}>{issue.severity}</span>
          {issue.bounds && (
            <div className={styles.locationIndicator}>
              <LocationIcon />
            </div>
          )}
        </div>
      </div>

      <div className={styles.cardBody}>
        <div className={styles.valueRow}>
          <span className={styles.valueLabel}>Figma</span>
          <code className={styles.value}>{issue.figmaValue}</code>
        </div>
        <div className={styles.valueRow}>
          <span className={styles.valueLabel}>App</span>
          <code className={styles.value}>{issue.appValue}</code>
        </div>
      </div>

      {suggestedFix && (
        <div className={styles.cardFooter}>
          <div className={styles.suggestion}>{suggestedFix}</div>
        </div>
      )}
    </div>
  )
}

export default IssueCard
