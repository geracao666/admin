export type AutocompleteProps = React.InputHTMLAttributes<InputHTMLAttributes> & {
  items: AutocompleteItem[],
  value?: AutocompleteValue,
  multiple?: boolean,
  loading?: boolean,
  loadingVariant?: 'spinner' | 'dots' | 'ring' | 'ball' | 'bars' | 'infinity',
  color?: DaisyUIColor
  onChange?: (value: AutocompleteValue) => void
}

export type AutocompleteReducerState = {
  open: boolean,
  dirty: boolean,
  filterText: string,
  selectedItemsIndex: number[]  
}

export type AutocompleteReducerAction =
  | { type: 'open_menu' }
  | { type: 'close_menu' }
  | { type: 'set_filter', text: string }
  | { type: 'select_single_item', index: number }
  | { type: 'toggle_item_selection', index: number }
  | { type: 'remove_last_item' }

export type AutocompleteItem = {
  label: string,
  value: string
}

export type AutocompleteValue = typeof AutocompleteItem.value | typeof AutocompleteItem.value[]

export type DaisyUIColor = 'info' | 'success' | 'warning' | 'error' | 'neutral' | 'primary' | 'secondary' | 'accent' | 'ghost'