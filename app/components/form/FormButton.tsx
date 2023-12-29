import classNames from "classnames";
import React from "react";
import { Button } from "react-daisyui";

export default function FormButton({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <Button
      type="submit"
      className={classNames(
        'rounded-none uppercase mt-3',
        'bg-zinc-950 text-neutral-100',
        'hover:bg-red-900'
      )}
    >
      {children}
    </Button>
  )
}