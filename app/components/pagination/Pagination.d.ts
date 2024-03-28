import { PaginationParams } from "@/app/api/types";

export type PaginationProps = PaginationParams & {
  total?: number
  range?: number
  margin?: number
  separator?: string
  color?: "neutral" | "primary" | "secondary" | "accent" | "ghost" | "info" | "success" | "warning" | "error"
  onPageSelected?: (page: number) => void
}