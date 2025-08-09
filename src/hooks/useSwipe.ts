import { useState, useRef, useEffect } from "react"
import type { RefObject } from "react"

/**
 * Hook for managing boundary line drag functionality in Swipe view
 *
 * Enables first-second movement of the boundary line between two images via mouse drag.
 * Event listeners are activated only in Swipe mode, and cursor changes during drag.
 *
 * @param viewMode - Current image viewer display mode ("side-by-side" | "overlay" | "swipe")
 * @param containerRef - Reference to the image container DOM element
 * @returns {Object} Swipe state and handlers
 * @returns {number} swipePosition - Boundary line position (0-100 percent)
 * @returns {Function} handleMouseDown - Drag start event handler
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
/**
 * 스와이프 뷰에서 경계선 드래그 기능을 관리하는 훅
 *
 * 마우스 드래그를 통해 두 이미지 사이의 경계선을 좌우로 이동할 수 있게 합니다.
 * 이벤트 리스너는 스와이프 모드에서만 활성화되며, 드래그 중 커서가 변경됩니다.
 *
 * @param viewMode - 현재 이미지 뷰어 표시 모드 ("side-by-side" | "overlay" | "swipe")
 * @param containerRef - 이미지 컨테이너 DOM 요소 참조
 * @returns {Object} 스와이프 상태와 핸들러
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
  const [swipePosition, setSwipePosition] = useState(50) // Initial value 50% (center)
  // 초기값 50% (중앙)
  const isDragging = useRef(false)

  useEffect(() => {
    // TODO: Performance optimization - apply throttle to optimize mousemove event handling
    // Consider applying throttling at 60fps (16ms) intervals
    // TODO: 성능 최적화 - mousemove 이벤트 처리 최적화를 위해 스로틀 적용
    // 60fps (16ms) 간격으로 스로틀링 적용 고려
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current || !containerRef.current) return

      // Convert mouse position to percentage
      // 마우스 위치를 백분율로 변환
      // TODO: Check possibility of containerRef.current being null (already exists but improve TypeScript narrowing)
      // TODO: containerRef.current가 null일 가능성 확인 (이미 존재하지만 TypeScript narrowing 개선)
      const rect = containerRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const percentage = (x / rect.width) * 100

      // Constrain to 0-100% range
      // 0-100% 범위로 제한
      setSwipePosition(Math.max(0, Math.min(100, percentage)))
    }

    const handleMouseUp = () => {
      isDragging.current = false
      document.body.style.cursor = "" // Reset cursor style
      // 커서 스타일 재설정
    }

    // Register event listeners only in Swipe mode
    // 스와이프 모드에서만 이벤트 리스너 등록
    if (viewMode === "swipe") {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }

    // Cleanup: remove listeners on component unmount or viewMode change
    // 정리: 컴포넌트 언마운트 또는 viewMode 변경 시 리스너 제거
    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [viewMode, containerRef])

  const handleMouseDown = () => {
    isDragging.current = true
    document.body.style.cursor = "grabbing" // Change cursor during drag
    // 드래그 중 커서 변경
  }

  return {
    swipePosition,
    handleMouseDown,
  }
}
