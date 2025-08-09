/**
 * ImageDropzone Component
 *
 * Handles the drag-and-drop functionality for image uploads.
 * This component provides:
 * - Drag and drop area for image files
 * - File validation (accepts only image formats)
 * - Visual feedback during drag operations
 * - Support for exactly 2 images for comparison
 */
/**
 * ImageDropzone 컴포넌트
 *
 * 이미지 업로드를 위한 드래그 앤 드롭 기능을 처리합니다.
 * 이 컴포넌트는 다음을 제공합니다:
 * - 이미지 파일을 위한 드래그 앤 드롭 영역
 * - 파일 검증 (이미지 형식만 허용)
 * - 드래그 작업 중 시각적 피드백
 * - 비교를 위한 정확히 2개 이미지 지원
 */

import { useDropzone } from "react-dropzone"
import { useAtomValue } from "jotai"
import clsx from "clsx"
import { isWaitingForSecondImageAtom } from "../store/atoms"
import { useTranslation } from "../hooks/useTranslation"
import { useImages } from "../hooks/useImages"
import { usePasteImage } from "../hooks/usePasteImage"
import styles from "./ImageDropzone.module.css"

export default function ImageDropzone() {
  const isWaitingForSecondImage = useAtomValue(isWaitingForSecondImageAtom)
  const { handleDrop, handleAddSecondImage } = useImages()
  const t = useTranslation()

  // Determine which drop handler to use based on state
  // 상태에 따라 사용할 드롭 핸들러 결정
  const onDrop = isWaitingForSecondImage ? handleAddSecondImage : handleDrop

  // Enable paste functionality
  // 붙여넣기 기능 활성화
  usePasteImage(onDrop)

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"],
    },
    multiple: !isWaitingForSecondImage,
  })

  return (
    <div
      {...getRootProps()}
      className={clsx(
        styles.dropzone,
        isDragActive && styles.dragActive,
        isWaitingForSecondImage && styles.waitingForSecond,
      )}
    >
      <input {...getInputProps()} />
      <div className={styles.dropzoneContent}>
        <p className={styles.dropzoneText}>
          {isDragActive
            ? t.dropzone.dropHereText
            : isWaitingForSecondImage
              ? t.dropzone.waitingForSecondImage
              : t.dropzone.dragDropText}
        </p>
        <p className={styles.dropzoneHint}>
          {isWaitingForSecondImage ? t.dropzone.addSecondImageHint : t.dropzone.uploadHint}
        </p>
        <p className={styles.dropzoneSubHint}>{t.dropzone.pasteHint}</p>
      </div>
    </div>
  )
}
