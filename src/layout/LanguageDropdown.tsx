/**
 * LanguageDropdown Component
 *
 * Dropdown menu for language selection between English and Korean.
 * Uses Base UI Menu component for accessibility and displays language
 * options with flag emojis and check indicators for the selected language.
 */
/**
 * LanguageDropdown 컴포넌트
 *
 * 영어와 한국어 간 언어 선택을 위한 드롭다운 메뉴입니다.
 * 접근성을 위해 Base UI Menu 컴포넌트를 사용하고 국기 이모지와
 * 선택된 언어를 위한 체크 표시기로 언어 옵션을 표시합니다.
 */

import { useAtom } from "jotai"
import { Menu } from "@base-ui-components/react/menu"
import { languageAtom } from "../store/atoms"
import ChevronDownIcon from "../assets/icons/chevron-down.svg?react"
import CheckIcon from "../assets/icons/check.svg?react"
import styles from "./LanguageDropdown.module.css"

function LanguageDropdown() {
  const [language, setLanguage] = useAtom(languageAtom)

  return (
    <Menu.Root>
      <Menu.Trigger className={styles.trigger}>
        <span>{language === "ko" ? "🇰🇷 한국어" : "🇺🇸 English"}</span>
        <ChevronDownIcon />
      </Menu.Trigger>

      <Menu.Portal>
        <Menu.Positioner>
          <Menu.Popup className={styles.content}>
            <Menu.Item className={styles.item} onClick={() => setLanguage("en")}>
              <span>🇺🇸</span>
              <span>English</span>
              {language === "en" && <CheckIcon className={styles.check} />}
            </Menu.Item>

            <Menu.Item className={styles.item} onClick={() => setLanguage("ko")}>
              <span>🇰🇷</span>
              <span>한국어</span>
              {language === "ko" && <CheckIcon className={styles.check} />}
            </Menu.Item>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  )
}

export default LanguageDropdown
