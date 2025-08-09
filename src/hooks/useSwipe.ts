import { useState, useRef, useEffect } from "react"
import type { RefObject } from "react"

/**
 * Swipe 뷰에서 경계선 드래그 기능을 관리하는 Hook
 *
 * 두 이미지 간의 경계선을 마우스 드래그로 좌우 이동할 수 있게 합니다.
 * Swipe 모드에서만 이벤트 리스너가 활성화되며, 드래그 중에는 cursor를 변경합니다.
 *
 * @param viewMode - 현재 이미지 뷰어의 표시 모드 ("side-by-side" | "overlay" | "swipe")
 * @param containerRef - 이미지 컨테이너 DOM 요소의 참조
 * @returns {Object} Swipe 상태와 핸들러
 * @returns {number} swipePosition - 경계선 위치 (0-100 퍼센트)
 * @returns {Function} handleMouseDown - 드래그 시작 이벤트 핸들러
 *
 * @example
 * ```tsx
 * const { swipePosition, handleMouseDown } = useSwipe(viewMode, containerRef)
 *
 * <div
 *   className={styles.swipeHandle}
 *   style={{ left: `${swipePosition}%` }}
 *   onMouseDown={handleMouseDown}
 * />
 * ```
 */
export function useSwipe(viewMode: string, containerRef: RefObject<HTMLDivElement | null>) {
  const [swipePosition, setSwipePosition] = useState(50) // 초기값 50% (중앙)
  const isDragging = useRef(false)

  useEffect(() => {
    // TODO: 성능 최적화 - throttle 적용으로 mousemove 이벤트 처리 최적화
    // 60fps(16ms) 간격으로 throttling 적용 고려
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current || !containerRef.current) return

      // 마우스 위치를 퍼센트로 변환
      // TODO: containerRef.current가 null일 가능성 체크 (이미 있지만 TypeScript narrowing 개선)
      const rect = containerRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const percentage = (x / rect.width) * 100

      // 0-100% 범위로 제한
      setSwipePosition(Math.max(0, Math.min(100, percentage)))
    }

    const handleMouseUp = () => {
      isDragging.current = false
      document.body.style.cursor = "" // 커서 스타일 초기화
    }

    // Swipe 모드일 때만 이벤트 리스너 등록
    if (viewMode === "swipe") {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }

    // 클린업: 컴포넌트 언마운트 또는 viewMode 변경 시 리스너 제거
    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [viewMode, containerRef])

  const handleMouseDown = () => {
    isDragging.current = true
    document.body.style.cursor = "grabbing" // 드래그 중 커서 변경
  }

  return {
    swipePosition,
    handleMouseDown,
  }
}
