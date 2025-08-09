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
