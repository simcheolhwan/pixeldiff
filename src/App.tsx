import { useState, useEffect } from "react"
import { useAtomValue, useSetAtom } from "jotai"
import { useSuspenseQuery } from "@tanstack/react-query"
import ky from "ky"
import clsx from "clsx"
import { themeAtom, selectedIssueIndexAtom } from "./store/atoms"
import { DiffsJsonSchema, type DiffsJson } from "./schemas/diffs.schema"
import IssueCards from "./components/IssueCards"
import ImageControls from "./components/ImageControls"
import ThemeSwitch from "./components/ThemeSwitch"
import LanguageDropdown from "./components/LanguageDropdown"
import ImageViewer from "./components/ImageViewer"
import styles from "./App.module.css"

export function App() {
  // TODO: App 컴포넌트가 너무 많은 책임을 가짐
  // - 데이터 fetching -> useScreenData 훅으로 분리
  // - 화면 선택 로직 -> useScreenNavigation 훅으로 분리
  // - 테마 관리 -> ThemeProvider로 분리
  
  // 테마
  const theme = useAtomValue(themeAtom)

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme)
  }, [theme])

  // diffs.json
  const { data } = useSuspenseQuery({
    queryKey: ["diffs"],
    queryFn: async () => {
      const jsonData = await ky.get("/diffs.json").json<DiffsJson>()
      return DiffsJsonSchema.parse(jsonData)
    },
    staleTime: Infinity,
  })

  // 선택된 스크린 및 이슈 인덱스
  const [selectedScreenIndex, setSelectedScreenIndex] = useState(0)
  const setSelectedIssueIndex = useSetAtom(selectedIssueIndexAtom)

  // 스크린 변경 시 선택된 이슈 인덱스 초기화
  const selectScreen = (index: number) => {
    setSelectedScreenIndex(index)
    setSelectedIssueIndex(null) // 이슈 선택 상태 초기화
  }

  const { screens, metadata } = data
  const currentScreen = screens[selectedScreenIndex]

  return (
    <div className={styles.app}>
      <aside className={styles.sidebar}>
        <div className={styles.screenTabsHeader}>Screens</div>
        <nav className={styles.screenTabs}>
          {screens.map((screen, index) => (
            <button
              key={screen.id}
              className={clsx(styles.screenTab, selectedScreenIndex === index && styles.active)}
              onClick={() => selectScreen(index)}
            >
              {screen.screenName}
            </button>
          ))}
        </nav>

        {currentScreen.issues && (
          <>
            <div className={styles.sidebarDivider} />
            <div className={styles.issuesHeader}>Issues</div>
            <IssueCards issues={currentScreen.issues} />
          </>
        )}
      </aside>

      <main className={styles.mainContent}>
        <div className={styles.imageHeader}>
          <ImageControls />
          <div className={styles.headerControls}>
            <LanguageDropdown />
            <ThemeSwitch />
          </div>
        </div>
        <ImageViewer
          figmaImage={currentScreen.figmaScreenshot}
          appImage={currentScreen.appScreenshot}
          issues={currentScreen.issues}
          imageWidth={metadata.width}
        />
      </main>
    </div>
  )
}
