/**
 * usePasteImage Hook
 *
 * Custom hook for handling image paste events.
 * Listens for paste events on the document and extracts image files
 * from the clipboard, then calls the provided callback with the files.
 */
/**
 * usePasteImage 훅
 *
 * 이미지 붙여넣기 이벤트를 처리하기 위한 커스텀 훅.
 * 문서에서 붙여넣기 이벤트를 수신하고 클립보드에서 이미지 파일을
 * 추출한 다음, 제공된 콜백을 파일과 함께 호출합니다.
 */

import { useEffect, useCallback } from "react"

export function usePasteImage(onDrop: (files: File[]) => void) {
  // Handle paste event
  // 붙여넣기 이벤트 처리
  const handlePaste = useCallback(
    (e: ClipboardEvent) => {
      const items = e.clipboardData?.items
      if (!items) return

      const imageFiles: File[] = []

      for (let i = 0; i < items.length; i++) {
        const item = items[i]
        if (item.type.startsWith("image/")) {
          const file = item.getAsFile()
          if (file) {
            imageFiles.push(file)
          }
        }
      }

      if (imageFiles.length > 0) {
        e.preventDefault()
        onDrop(imageFiles)
      }
    },
    [onDrop],
  )

  // Add paste event listener
  // 붙여넣기 이벤트 리스너 추가
  useEffect(() => {
    document.addEventListener("paste", handlePaste)
    return () => {
      document.removeEventListener("paste", handlePaste)
    }
  }, [handlePaste])
}
