import { useState } from "react"
import { MenuItemProps } from "./MenuItem.d"
import { Menu } from "react-daisyui"
import { MdMenu, MdMenuOpen } from 'react-icons/md';
import classNames from "classnames"
import MenuItem from "./MenuItem"

export default function ExpandableMenu({
  items
}: {
  items: MenuItemProps[]
}) {
  const [open, setOpen] = useState(false)
  const icon = open ? <MdMenuOpen /> : <MdMenu />

  const toggleMenu = () => setOpen(!open)

  return (
    <Menu className={classNames(
      'h-full py-3 bg-zinc-950 text-neutral-100 text-2xl transition-[width] ease-out',
      {
        'w-64': open,
        'w-20': !open
      }
    )}>
      <MenuItem
        icon={icon}
        collapse={!open}
        onClick={toggleMenu}
      />

      {items.map((item, index) => (
        <MenuItem
          key={index}
          collapse={!open}
          {...item}
        />
      ))}
    </Menu>
  )
}