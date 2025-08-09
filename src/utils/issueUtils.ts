import type { Issue } from "../schemas/diffs.schema"

/**
 * Issue의 권장 수정 사항을 언어에 따라 반환
 * 한국어 버전이 없으면 영어 버전을 폴백으로 사용
 * @param issue - 이슈 객체
 * @param language - 현재 선택된 언어
 * @returns 해당 언어의 수정 제안 문자열
 */
export const getSuggestedFix = (issue: Issue, language: "en" | "ko"): string => {
  if (!issue.suggestedFix) return ""

  if (language === "ko") {
    // 한국어 버전 우선, 없으면 영어 버전 사용
    return issue.suggestedFix.ko || issue.suggestedFix.en
  }
  return issue.suggestedFix.en
}

/**
 * 선택된 인덱스를 토글하는 헬퍼 함수
 * 이미 선택된 항목을 다시 클릭하면 선택 해제 (null 반환)
 * @param currentIndex - 현재 선택된 인덱스
 * @param targetIndex - 클릭한 항목의 인덱스
 * @returns 새로 선택된 인덱스 또는 null
 */
export const toggleSelection = (
  currentIndex: number | null,
  targetIndex: number,
): number | null => {
  return currentIndex === targetIndex ? null : targetIndex
}
