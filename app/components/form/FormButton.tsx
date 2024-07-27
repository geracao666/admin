import classNames from "classnames";
import React from "react";
import { Button } from "react-daisyui";

export default function FormButton({
  children,
  className,
  variant,
  type = 'button',
  disabled = false
}: {
  type?: 'submit' | 'button'
  variant?: 'outline' | undefined
  disabled?: boolean
  className?: string
  children: React.ReactNode
}) {
  const variantClassNames = variant === 'outline'
    ? 'text-zinc-950 hover:bg-red-900 hover:text-neutral-100 hover:border-red-900'
    : 'bg-zinc-950 text-neutral-100 hover:bg-emerald-700 hover:border-emerald-700'

  return (
    <Button
      type={type}
      disabled={disabled}
      className={classNames(
        'border-zinc-950 rounded-none uppercase mt-3',
        variantClassNames,
        className
      )}
    >
      {children}
    </Button>
  )
}