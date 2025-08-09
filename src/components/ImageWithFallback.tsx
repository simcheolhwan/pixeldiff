import { useState, useEffect, type CSSProperties } from "react"
import styles from "./ImageWithFallback.module.css"

interface ImageWithFallbackProps {
  /** 이미지 소스 URL */
  src: string
  /** 이미지에 적용할 CSS 클래스 (기본값: styles.image) */
  className?: string
  /** 인라인 스타일 객체 */
  style?: CSSProperties
}

/**
 * 이미지 로드 실패 시 폴백 UI를 표시하는 이미지 컴포넌트
 *
 * 이미지 로딩에 실패하면 자동으로 아이콘과 에러 메시지를 표시합니다.
 * 이미지 경로가 변경되면 자동으로 에러 상태를 초기화합니다.
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

  // 이미지 경로 변경 시 에러 상태 초기화
  useEffect(() => {
    setHasError(false)
  }, [src])

  const handleError = () => {
    setHasError(true)
  }

  // 에러 발생 시 폴백 UI 렌더링
  if (hasError) {
    return (
      <div className={styles.imagePlaceholder} style={style}>
        <div className={styles.placeholderText}>이미지를 불러올 수 없습니다</div>
      </div>
    )
  }

  // 정상적인 이미지 렌더링
  // TODO: lazy loading 고려 - loading="lazy" 속성 추가
  return <img src={src} className={className} style={style} onError={handleError} />
}

export default ImageWithFallback
