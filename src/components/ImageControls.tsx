import { useAtom } from "jotai"
import { ToggleGroup } from "@base-ui-components/react/toggle-group"
import { Toggle } from "@base-ui-components/react/toggle"
import { Slider } from "@base-ui-components/react/slider"
import { viewModeAtom, overlayOpacityAtom, type ViewMode } from "../store/atoms"
import { useTranslation } from "../hooks/useTranslation"
import SideBySideIcon from "../assets/icons/side-by-side.svg?react"
import OverlayIcon from "../assets/icons/overlay.svg?react"
import SwipeIcon from "../assets/icons/swipe.svg?react"
import styles from "./ImageControls.module.css"

// TODO: 확장성 - 플러그인 방식으로 뷰 모드를 동적으로 추가할 수 있도록 개선
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

      {/* Overlay 모드일 때만 투명도 슬라이더 표시 */}
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
    </div>
  )
}

export default ImageControls
