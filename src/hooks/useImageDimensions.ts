import { useState, useEffect } from "react"
import type { ImageFile } from "../types"

interface ImageDimensions {
  width: number
  height: number
  aspectRatio: number
  isLandscape: boolean
}

export function useImageDimensions(image: ImageFile | null): ImageDimensions | null {
  const [dimensions, setDimensions] = useState<ImageDimensions | null>(null)

  useEffect(() => {
    if (!image) {
      setDimensions(null)
      return
    }

    const img = new Image()
    img.onload = () => {
      const width = img.naturalWidth
      const height = img.naturalHeight
      const aspectRatio = width / height

      setDimensions({
        width,
        height,
        aspectRatio,
        isLandscape: aspectRatio > 1,
      })
    }
    img.src = image.preview

    return () => {
      img.onload = null
    }
  }, [image])

  return dimensions
}

// Check if both images are landscape
// 두 이미지가 모두 가로 방향인지 확인
export function useBothImagesLandscape(
  firstImage: ImageFile | null,
  secondImage: ImageFile | null,
): boolean {
  const firstDimensions = useImageDimensions(firstImage)
  const secondDimensions = useImageDimensions(secondImage)

  if (!firstDimensions || !secondDimensions) {
    return false
  }

  return firstDimensions.isLandscape && secondDimensions.isLandscape
}
