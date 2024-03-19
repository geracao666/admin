'use client'

import { PiUserListFill } from "react-icons/pi";
import { ExpandableMenu } from "./menu";

export default function AppMenu() {
  const items = [
    {
      name: 'Artistas',
      href: '/artist',
      icon: <PiUserListFill />
    },
  ]

  return <ExpandableMenu items={items} />
}