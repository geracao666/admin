'use client'

import { Button, Navbar } from "react-daisyui";
import { APP_TITLE } from "../config";

export default function AppNavbar() {
  return (
    <Navbar className="bg-zinc-950 text-neutral-100 px-16">
      <Navbar.Start className="flex">
        <Button className="btn-ghost px-0 text-lg">
          {APP_TITLE}
        </Button>
      </Navbar.Start>
    </Navbar>
  )
}