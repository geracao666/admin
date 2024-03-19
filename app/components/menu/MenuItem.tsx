import { Menu, Tooltip } from "react-daisyui";
import { MenuItemProps } from "./MenuItem.d";
import classNames from "classnames";

export default function MenuItem({
  name = '',
  collapse = false,
  icon,
  href,
  onClick
}: MenuItemProps) {
  const expanded = !collapse

  return (
    <Menu.Item key={name}>
      <a href={href} onClick={onClick} className={classNames(
        'flex m-auto hover:bg-slate-800',
        { 'w-full': expanded }
      )}>
        <span className={classNames(
          'flex-grow text-right text-sm',
          { hidden: collapse }
        )}>
          {name}
        </span>

        {expanded || !name ? icon : (
          <Tooltip position="right" message={name}>
            {icon}
          </Tooltip>
        )}
      </a>
    </Menu.Item>
  )
}