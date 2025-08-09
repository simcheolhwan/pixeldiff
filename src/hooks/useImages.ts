/**
 * useImages Hook
 *
 * Custom hook for managing images with Jotai atoms.
 * Provides simplified image state management using array instead of first/second approach.
 * This hook handles:
 * - Image file state management using Jotai atoms
 * - Object URL creation and cleanup for image previews
 * - Memory management by revoking object URLs when images change
 * - Clearing all images functionality
 * - Simplified array-based image handling
 */
/**
 * useImages 훅
 *
 * Jotai atom을 사용한 이미지 관리를 위한 커스텀 훅.
 * first/second 방식 대신 배열을 사용한 단순화된 이미지 상태 관리를 제공.
 * 이 훅은 다음을 처리합니다:
 * - Jotai atom을 사용한 이미지 파일 상태 관리
 * - 이미지 미리보기를 위한 Object URL 생성 및 정리
 * - 이미지가 변경될 때 Object URL을 해제하여 메모리 관리
 * - 모든 이미지 지우기 기능
 * - 단순화된 배열 기반 이미지 처리
 */

import { useCallback } from "react"
import { useAtom, useAtomValue } from "jotai"
import {
  firstImageAtom,
  secondImageAtom,
  isWaitingForSecondImageAtom,
  hasImagesAtom,
} from "../store/atoms"
import { useTranslation } from "./useTranslation"

export function useImages() {
  const t = useTranslation()
  const [firstImage, setFirstImage] = useAtom(firstImageAtom)
  const [secondImage, setSecondImage] = useAtom(secondImageAtom)
  const isWaitingForSecondImage = useAtomValue(isWaitingForSecondImageAtom)
  const hasImages = useAtomValue(hasImagesAtom)

  // Handle file drop with support for 1 or 2 images
  // 1개 또는 2개 이미지 드롭 처리
  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      // Support single image upload
      // 단일 이미지 업로드 지원
      if (acceptedFiles.length === 1) {
        const file = acceptedFiles[0]

        // Set first image without revoking immediately
        // 즉시 revoke하지 않고 첫 번째 이미지 설정
        setFirstImage({ file, preview: URL.createObjectURL(file), name: file.name })
        setSecondImage(null)
        return
      }

      // Handle 2 or more images - take first 2 and ignore rest
      // 2개 이상의 이미지 처리 - 앞 2개만 사용하고 나머지는 무시
      if (acceptedFiles.length >= 2) {
        const file1 = acceptedFiles[0]
        const file2 = acceptedFiles[1]

        // Set both images without revoking immediately
        // 즉시 revoke하지 않고 두 이미지 모두 설정
        setFirstImage({ file: file1, preview: URL.createObjectURL(file1), name: file1.name })
        setSecondImage({ file: file2, preview: URL.createObjectURL(file2), name: file2.name })
      }
    },
    [setFirstImage, setSecondImage],
  )

  // Handle adding second image when waiting
  // 대기 중일 때 두 번째 이미지 추가 처리
  const handleAddSecondImage = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length !== 1) {
        alert(t.dropzone.oneMoreImage)
        return
      }

      const file = acceptedFiles[0]

      // Set second image without revoking immediately
      // 즉시 revoke하지 않고 두 번째 이미지 설정
      setSecondImage({ file, preview: URL.createObjectURL(file), name: file.name })
    },
    [setSecondImage, t.dropzone.oneMoreImage],
  )

  // Clear all loaded images
  // 로드된 모든 이미지 지우기
  const clearImages = useCallback(() => {
    // Revoke URLs before clearing
    // 지우기 전에 URL revoke
    if (firstImage?.preview) URL.revokeObjectURL(firstImage.preview)
    if (secondImage?.preview) URL.revokeObjectURL(secondImage.preview)

    setFirstImage(null)
    setSecondImage(null)
  }, [firstImage, secondImage, setFirstImage, setSecondImage])

  // Note: We're not revoking URLs immediately to prevent images from disappearing
  // 참고: 이미지가 사라지는 것을 방지하기 위해 URL을 즉시 revoke하지 않음
  // URLs will be revoked when clearing images or when the component unmounts
  // URL은 이미지를 지우거나 컴포넌트가 언마운트될 때 revoke됨

  return {
    firstImage,
    secondImage,
    handleDrop,
    handleAddSecondImage,
    clearImages,
    hasImages,
    isWaitingForSecondImage,
    // For backward compatibility with legacy left/right naming
    // 레거시 left/right 네이밍과의 역방향 호환성을 위해
    leftImage: firstImage,
    rightImage: secondImage,
  }
}
