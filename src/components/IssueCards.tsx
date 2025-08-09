import { useAtom } from "jotai"
import { selectedIssueIndexAtom } from "../store/atoms"
import { useTranslation } from "../hooks/useTranslation"
import { toggleSelection } from "../utils/issueUtils"
import IssueCard from "./IssueCard"
import type { Issue } from "../schemas/diffs.schema"
import styles from "./IssueCards.module.css"

interface DiffCardsProps {
  issues: Issue[]
}

function IssueCards({ issues }: DiffCardsProps) {
  const [selectedIssueIndex, setSelectedIssueIndex] = useAtom(selectedIssueIndexAtom)
  const t = useTranslation()

  const handleSelectDiff = (index: number) => {
    setSelectedIssueIndex(toggleSelection(selectedIssueIndex, index))
  }

  if (issues.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.empty}>{t.issues.noIssues}</div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.cardList}>
        {issues.map((issue, index) => (
          <IssueCard
            key={index}
            issue={issue}
            index={index}
            isSelected={selectedIssueIndex === index}
            onSelect={handleSelectDiff}
          />
        ))}
      </div>
    </div>
  )
}

export default IssueCards
