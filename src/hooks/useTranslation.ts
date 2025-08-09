import { useAtomValue } from "jotai"
import { languageAtom } from "../store/atoms"
import { translations } from "../store/translations"

/**
 * Hook that returns translation object for the currently selected language
 * @returns Translation text object for the current language
 */
/**
 * 현재 선택된 언어에 대한 번역 객체를 반환하는 훅
 * @returns 현재 언어에 대한 번역 텍스트 객체
 */
export function useTranslation() {
  const language = useAtomValue(languageAtom)
  return translations[language]
}
