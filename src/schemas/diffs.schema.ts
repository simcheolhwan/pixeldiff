import { z } from "zod"

/** 이슈 영역의 위치 및 크기 정보 스키마 */
const BoundsSchema = z.object({
  x: z.number(),
  y: z.number(),
  width: z.number(),
  height: z.number(),
})

/** 언어별 수정 제안 스키마 */
const SuggestedFixSchema = z.object({
  en: z.string(),
  ko: z.string().optional(),
})

/** 디자인과 앱 간 차이점을 나타내는 이슈 스키마 */
const IssueSchema = z.object({
  /** 이슈 타입 (예: 텍스트, 색상, 크기 등) */
  type: z.string(),
  /** 이슈의 심각도 수준 */
  severity: z.enum(["minor", "major", "critical"]),
  /** Figma 디자인에서의 값 */
  figmaValue: z.string(),
  /** 실제 앱에서 구현된 값 */
  appValue: z.string(),
  /** 언어별 수정 제안 */
  suggestedFix: SuggestedFixSchema.optional(),
  /** 이슈 영역의 위치 및 크기 정보 */
  bounds: BoundsSchema.optional(),
})

/** 스크린 단위의 차이점 비교 데이터 스키마 */
const ScreenDataSchema = z.object({
  /** 고유 식별자 */
  id: z.string(),
  /** 화면 이름 */
  screenName: z.string(),
  /** Figma 스크린샷 경로 */
  figmaScreenshot: z.string(),
  /** 앱 스크린샷 경로 */
  appScreenshot: z.string(),
  /** 해당 화면의 이슈 목록 */
  issues: z.array(IssueSchema).optional(),
})

/** diffs.json 파일의 전체 구조 스키마 */
export const DiffsJsonSchema = z.object({
  /** 메타데이터 정보 */
  metadata: z.object({
    /** 스크린샷 기본 너비 */
    width: z.number(),
  }),
  /** 모든 화면의 비교 데이터 배열 */
  screens: z.array(ScreenDataSchema).min(1),
})

// 타입 추론
export type DiffsJson = z.infer<typeof DiffsJsonSchema>
export type ScreenData = z.infer<typeof ScreenDataSchema>
export type Issue = z.infer<typeof IssueSchema>
