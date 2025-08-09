import { useAtomValue } from "jotai"
import { languageAtom } from "../store/atoms"
import { translations } from "../store/translations"

/**
 * 현재 선택된 언어에 해당하는 번역 객체를 반환하는 Hook
 * @returns 현재 언어의 번역 텍스트 객체
 */
export function useTranslation() {
  const language = useAtomValue(languageAtom)
  return translations[language]
}
