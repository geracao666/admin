import React from "react"

export type MenuItemProps = {
  name?: string
  href?: string
  icon?: React.ReactNode
  collapse?: boolean
  onClick?: () => void
}