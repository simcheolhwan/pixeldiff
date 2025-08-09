/**
 * ImageWithFallback Component
 *
 * Enhanced image component with automatic error handling and fallback UI.
 * Displays a placeholder with error message when image loading fails.
 * Automatically resets error state when the image source changes.
 * Provides consistent fallback experience across the application.
 */
/**
 * ImageWithFallback 컴포넌트
 *
 * 자동 오류 처리와 대체 UI를 가진 향상된 이미지 컴포넌트입니다.
 * 이미지 로딩이 실패했을 때 오류 메시지와 함께 플레이스홀더를 표시합니다.
 * 이미지 소스가 변경될 때 오류 상태를 자동으로 재설정합니다.
 * 애플리케이션 전반에 걸쳐 일관된 대체 경험을 제공합니다.
 */

import { useState, useEffect, type CSSProperties } from "react"
import styles from "./ImageWithFallback.module.css"

interface ImageWithFallbackProps {
  /** Image source URL */
  src: string
  /** CSS class to apply to the image (default: styles.image) */
  className?: string
  /** Inline style object */
  style?: CSSProperties
}

/**
 * Image component that displays fallback UI when image loading fails
 *
 * Automatically displays icon and error message when image loading fails.
 * Automatically resets error state when image path changes.
 *
 * @component
 * @example
 * ```tsx
 * <ImageWithFallback
 *   src="/path/to/image.png"
 *   alt="Description text"
 *   fallbackText="Image could not be found"
 * />
 * ```
 */
/**
 * 이미지 로딩이 실패했을 때 대체 UI를 표시하는 이미지 컴포넌트
 *
 * 이미지 로딩이 실패하면 자동으로 아이콘과 오류 메시지를 표시합니다.
 * 이미지 경로가 변경되면 오류 상태를 자동으로 재설정합니다.
 *
 * @component
 * @example
 * ```tsx
 * <ImageWithFallback
 *   src="/path/to/image.png"
 *   alt="설명 텍스트"
 *   fallbackText="이미지를 찾을 수 없습니다"
 * />
 * ```
 */
function ImageWithFallback({ src, className = styles.image, style }: ImageWithFallbackProps) {
  const [hasError, setHasError] = useState(false)

  // Reset error state when image path changes
  // 이미지 경로가 변경될 때 오류 상태 재설정
  useEffect(() => {
    setHasError(false)
  }, [src])

  const handleError = () => {
    setHasError(true)
  }

  // Render fallback UI when error occurs
  // 오류 발생 시 대체 UI 렌더링
  if (hasError) {
    return (
      <div className={styles.imagePlaceholder} style={style}>
        <div className={styles.placeholderText}>이미지를 불러올 수 없습니다</div>
      </div>
    )
  }

  // Normal image rendering
  // 일반 이미지 렌더링
  // TODO: Consider lazy loading - add loading="lazy" attribute
  // TODO: 지연 로딩 고려 - loading="lazy" 속성 추가
  return <img src={src} className={className} style={style} onError={handleError} />
}

export default ImageWithFallback
