/**
 * ThemeSwitch Component
 *
 * Toggle switch for switching between light and dark themes.
 * Uses Base UI Switch component for accessibility and provides
 * visual theme indicators with sun and moon icons.
 */
/**
 * ThemeSwitch 컴포넌트
 *
 * 라이트와 다크 테마 간 전환을 위한 토글 스위치입니다.
 * 접근성을 위해 Base UI Switch 컴포넌트를 사용하고
 * 태양과 달 아이콘으로 시각적 테마 표시기를 제공합니다.
 */

import { useAtom } from "jotai"
import { Switch } from "@base-ui-components/react/switch"
import { themeAtom } from "../store/atoms"
import styles from "./ThemeSwitch.module.css"

function ThemeSwitch() {
  const [theme, setTheme] = useAtom(themeAtom)

  return (
    <div className={styles.container}>
      <label className={styles.label}>
        <span className={styles.icon}>☀️</span>
        <Switch.Root
          className={styles.switchRoot}
          checked={theme === "dark"}
          onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
        >
          <Switch.Thumb className={styles.switchThumb} />
        </Switch.Root>
        <span className={styles.icon}>🌙</span>
      </label>
    </div>
  )
}

export default ThemeSwitch
