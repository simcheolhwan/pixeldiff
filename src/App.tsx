import { useEffect } from "react"
import { useAtomValue } from "jotai"
import { themeAtom, languageAtom, bothImagesLoadedAtom } from "./store/atoms"
import AppHeader from "./layout/AppHeader"
import ImageDropzone from "./layout/ImageDropzone"
import ImageViewer from "./viewer/ImageViewer"
import styles from "./App.module.css"

/**
 * Main Application Component
 *
 * The root component that orchestrates the entire image comparison application.
 * Manages the overall application state and coordinates between different components.
 */
export default function App() {
  const language = useAtomValue(languageAtom)
  const theme = useAtomValue(themeAtom)
  const bothImagesLoaded = useAtomValue(bothImagesLoadedAtom)

  // Apply theme to document root for CSS variables
  // 테마를 document root에 적용하여 CSS 변수 설정
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme)
  }, [theme])

  // Update HTML lang attribute when language changes
  // 언어가 변경될 때 HTML lang 속성 업데이트
  useEffect(() => {
    document.documentElement.setAttribute("lang", language)
  }, [language])

  return (
    <div className={styles.app}>
      <main className={styles.mainContent}>
        <AppHeader />
        {bothImagesLoaded ? <ImageViewer /> : <ImageDropzone />}
      </main>
    </div>
  )
}
