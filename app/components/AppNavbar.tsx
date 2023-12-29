'use client'

import { Button, Navbar } from "react-daisyui";
import { APP_TITLE } from "../config";

export default function AppNavbar() {
  return (
    <Navbar className="bg-zinc-950 text-neutral-100 px-0">
      <div className="container mx-auto px-32">
        <Navbar.Start className="flex">
          <Button className="btn-ghost px-0 text-lg">{APP_TITLE}</Button>
        </Navbar.Start>
      </div>
    </Navbar>
  )
}