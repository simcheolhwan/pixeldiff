/**
 * ImageControls Component
 *
 * Provides user interface controls for image comparison modes and settings.
 * Features view mode selection (side-by-side, overlay, swipe), opacity adjustment
 * for overlay mode, and clear images functionality. Uses Base UI components
 * for accessible toggle groups and sliders.
 */
/**
 * ImageControls 컴포넌트
 *
 * 이미지 비교 모드와 설정을 위한 사용자 인터페이스 컨트롤을 제공합니다.
 * 뷰 모드 선택(나란히, 오버레이, 스와이프), 오버레이 모드용 투명도 조절,
 * 이미지 지우기 기능을 특징으로 합니다. 접근 가능한 토글 그룹과 슬라이더를
 * 위해 Base UI 컴포넌트를 사용합니다.
 */

import { useAtom, useAtomValue } from "jotai"
import { ToggleGroup } from "@base-ui-components/react/toggle-group"
import { Toggle } from "@base-ui-components/react/toggle"
import { Slider } from "@base-ui-components/react/slider"
import { viewModeAtom, overlayOpacityAtom, hasImagesAtom, type ViewMode } from "../store/atoms"
import { useTranslation } from "../hooks/useTranslation"
import { useImages } from "../hooks/useImages"
import SideBySideIcon from "../assets/icons/side-by-side.svg?react"
import OverlayIcon from "../assets/icons/overlay.svg?react"
import SwipeIcon from "../assets/icons/swipe.svg?react"
import styles from "./ImageControls.module.css"

// TODO: Extensibility - improve to dynamically add view modes through plugin approach
// Consider dynamic registration system through ViewModeRegistry
// TODO: 확장성 - 플러그인 방식을 통해 뷰 모드를 동적으로 추가하도록 개선
// ViewModeRegistry를 통한 동적 등록 시스템 고려
const VIEW_MODE_OPTIONS = [
  {
    value: "side-by-side" as const,
    labelKey: "sideBySide" as const,
    icon: <SideBySideIcon />,
  },
  {
    value: "overlay" as const,
    labelKey: "overlay" as const,
    icon: <OverlayIcon />,
  },
  {
    value: "swipe" as const,
    labelKey: "swipe" as const,
    icon: <SwipeIcon />,
  },
]

function ImageControls() {
  const [viewMode, setViewMode] = useAtom(viewModeAtom)
  const [overlayOpacity, setOverlayOpacity] = useAtom(overlayOpacityAtom)
  const hasImages = useAtomValue(hasImagesAtom)
  const { clearImages } = useImages()
  const t = useTranslation()

  return (
    <div className={styles.controls}>
      <ToggleGroup
        className={styles.toggleGroup}
        value={[viewMode]}
        onValueChange={(value) => value.length > 0 && setViewMode(value[0] as ViewMode)}
      >
        {VIEW_MODE_OPTIONS.map((option) => (
          <Toggle key={option.value} className={styles.toggleItem} value={option.value}>
            {option.icon}
            <span>{t.toolbar[option.labelKey]}</span>
          </Toggle>
        ))}
      </ToggleGroup>

      {/* Show opacity slider only in Overlay mode */}
      {/* 오버레이 모드에서만 투명도 슬라이더 표시 */}
      {viewMode === "overlay" && (
        <div className={styles.sliderContainer}>
          <span className={styles.sliderLabel}>{t.toolbar.opacity}</span>
          <Slider.Root
            className={styles.sliderRoot}
            value={[overlayOpacity]}
            onValueChange={(value) => setOverlayOpacity(value[0])}
            min={0}
            max={100}
            step={1}
          >
            <Slider.Control className={styles.sliderControl}>
              <Slider.Track className={styles.sliderTrack}>
                <Slider.Indicator className={styles.sliderIndicator} />
                <Slider.Thumb className={styles.sliderThumb} />
              </Slider.Track>
            </Slider.Control>
          </Slider.Root>
          <span className={styles.sliderLabel}>{overlayOpacity}%</span>
        </div>
      )}

      {/* Clear Images button - show only when images are present */}
      {/* 이미지 지우기 버튼 - 이미지가 있을 때만 표시 */}
      {hasImages && (
        <button onClick={clearImages} className={styles.clearButton}>
          {t.actions.clearImages}
        </button>
      )}
    </div>
  )
}

export default ImageControls
