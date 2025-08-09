import { type ReactNode, type CSSProperties } from "react"
import clsx from "clsx"
import styles from "./ImageWrapper.module.css"

interface ImageWrapperProps {
  children: ReactNode
  style?: CSSProperties
  className?: string
}

interface ImageLabelProps {
  children: ReactNode
  className?: string
}

interface ImageContainerProps {
  children: ReactNode
  width: number
  className?: string
  style?: CSSProperties
}

/**
 * 이미지를 감싸는 공통 래퍼 컴포넌트
 *
 * 모든 이미지 뷰 모드에서 사용되는 공통 래퍼로,
 * 일관된 스타일링과 레이아웃을 제공합니다.
 */
function ImageWrapper({ children, style, className }: ImageWrapperProps) {
  return (
    <div className={clsx(styles.wrapper, className)} style={style}>
      {children}
    </div>
  )
}

export function ImageLabel({ children, className }: ImageLabelProps) {
  return <div className={clsx(styles.imageLabel, className)}>{children}</div>
}

export function ImageContainer({ children, width, className, style }: ImageContainerProps) {
  return (
    <div
      className={clsx(styles.imageContainer, className)}
      style={{
        width: `${width}px`,
        ...style,
      }}
    >
      {children}
    </div>
  )
}

export default ImageWrapper
