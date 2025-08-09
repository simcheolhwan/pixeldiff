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
