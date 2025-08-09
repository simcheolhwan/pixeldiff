/**
 * AppHeader Component
 *
 * Application header containing the main controls and settings.
 * This layout component manages:
 * - Image comparison controls (view mode selection, opacity slider)
 * - Global application settings (language, theme)
 * - Clear images action
 *
 * The header is always visible and provides quick access to all
 * application controls regardless of the current view state.
 */
/**
 * AppHeader 컴포넌트
 *
 * 메인 컨트롤과 설정을 포함한 애플리케이션 헤더입니다.
 * 이 레이아웃 컴포넌트는 다음을 관리합니다:
 * - 이미지 비교 컨트롤 (뷰 모드 선택, 투명도 슬라이더)
 * - 글로벌 애플리케이션 설정 (언어, 테마)
 * - 이미지 지우기 액션
 *
 * 헤더는 항상 보이며 현재 뷰 상태와 관계없이 모든
 * 애플리케이션 컨트롤에 빠른 접근을 제공합니다.
 */

import ImageControls from "./ImageControls"
import ThemeSwitch from "./ThemeSwitch"
import LanguageDropdown from "./LanguageDropdown"
import styles from "../App.module.css"

export default function AppHeader() {
  return (
    <div className={styles.imageHeader}>
      <ImageControls />
      <div className={styles.headerControls}>
        <LanguageDropdown />
        <ThemeSwitch />
      </div>
    </div>
  )
}
