/**
 * Translation definitions for multilingual support
 * Contains all text strings used throughout the application in multiple languages
 */
/**
 * 다국어 지원을 위한 번역 정의
 * 애플리케이션 전체에서 사용되는 모든 텍스트 문자열을 여러 언어로 포함
 */
export const translations = {
  en: {
    toolbar: {
      sideBySide: "Side by Side",
      overlay: "Overlay",
      swipe: "Swipe",
      opacity: "Opacity",
    },
    dropzone: {
      dragDropText: "Drag & drop images here, or click to select files",
      dropHereText: "Drop the images here...",
      uploadHint: "Select 1 or 2 images to compare",
      oneMoreImage: "Please select exactly 1 more image",
      waitingForSecondImage: "First image loaded. Add another image to compare",
      addSecondImageHint: "Drop, click, or paste the second image",
      pasteHint: "You can also paste images using Ctrl+V (or Cmd+V on Mac)",
    },
    actions: {
      clearImages: "Clear Images",
    },
  },
  ko: {
    toolbar: {
      sideBySide: "나란히",
      overlay: "오버레이",
      swipe: "스와이프",
      opacity: "투명도",
    },
    dropzone: {
      dragDropText: "이미지를 여기에 드래그하거나 클릭하여 파일을 선택하세요",
      dropHereText: "이미지를 여기에 놓으세요...",
      uploadHint: "비교할 이미지를 1개 또는 2개 선택하세요",
      oneMoreImage: "이미지를 1개 더 선택해주세요",
      waitingForSecondImage: "첫 번째 이미지 로드 완료. 비교할 이미지를 추가하세요",
      addSecondImageHint: "두 번째 이미지를 드래그, 클릭 또는 붙여넣기하세요",
      pasteHint: "Ctrl+V (Mac에서는 Cmd+V)로 이미지를 붙여넣을 수도 있습니다",
    },
    actions: {
      clearImages: "이미지 지우기",
    },
  },
} as const
