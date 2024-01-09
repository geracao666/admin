import React, { BaseSyntheticEvent, KeyboardEvent, forwardRef, useEffect, useMemo, useReducer, useRef } from "react"
import { AutocompleteItem, AutocompleteProps, AutocompleteReducerAction, AutocompleteReducerState, AutocompleteValue } from './Autocomplete.d'
import classNames from "classnames"

const init = ({ items, value }: {
  items: AutocompleteItem[],
  value: AutocompleteValue
}): AutocompleteReducerState => ({
  open: false,
  dirty: false,
  filterText: '',
  selectedItemsIndex: !value ? [] : (
    Array.isArray(value)
      ? value.map(itemValue => items.findIndex(item => item.value === itemValue))
      : [items.findIndex(item => item.value === value)]
  )
})

const reducer = (state: AutocompleteReducerState, action: AutocompleteReducerAction): AutocompleteReducerState => {
  switch (action.type) {
    case 'open_menu': {
      return { ...state, open: true }
    }
    case 'close_menu': {
      return { ...state, open: false }
    }
    case 'set_filter': {
      return { ...state, filterText: action.text }
    }
    case 'select_single_item': {
      return {
        ...state,
        dirty: true,
        selectedItemsIndex: [action.index]
      }
    }
    case 'toggle_item_selection': {
      return {
        ...state,
        dirty: true,
        selectedItemsIndex: state.selectedItemsIndex.includes(action.index)
          ? state.selectedItemsIndex.filter(index => index !== action.index)
          : [...state.selectedItemsIndex, action.index]
      }
    }
    case 'remove_last_item': {
      return {
        ...state,
        dirty: true,
        selectedItemsIndex: state.selectedItemsIndex.slice(0, -1)
      }
    }
  }
}

const Autocomplete = forwardRef<HTMLInputElement, AutocompleteProps>(({
  items,
  value = '',
  placeholder = '',
  color = 'primary',
  multiple = false,
  disabled = false,
  loading = false,
  loadingVariant = 'spinner',
  onChange = () => {},
  ...props
}, ref) => {
  const [{
    open,
    dirty,
    filterText,
    selectedItemsIndex
  }, dispatch] = useReducer(reducer, { items, value }, init)

  const filteredItems = items.flatMap(item => item.label.includes(filterText) ? item : null)
  const selectedItems = useMemo(
    () => selectedItemsIndex.map(index => items[index]),
    [items, selectedItemsIndex]
  )

  const containerDivRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const openMenu = () => dispatch({ type: 'open_menu' })
  const closeMenu = () => dispatch({ type: 'close_menu' })
  const setFilter = (event: BaseSyntheticEvent) => dispatch({ type: 'set_filter', text: event.target.value })

  const selectItem = (index: number) => {
    const type = multiple ? 'toggle_item_selection' : 'select_single_item'

    dispatch({ type, index })
    inputRef.current?.focus()
    !multiple && closeMenu()
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      return closeMenu()
    }

    const target = event.target as HTMLInputElement
    if (target.value) {
      return
    }

    if (event.key === 'Backspace') {
      return dispatch({ type: 'remove_last_item' })
    }
  }

  useEffect(() => {
    const events = ['mousedown', 'touchstart']
    const listener = (event: Event) => {
      if (!containerDivRef.current?.contains(event.target as Node)) {
        closeMenu()
      }
    }

    events.forEach(event => document.addEventListener(event, listener))
    return () => events.forEach(event => document.removeEventListener(event, listener))
  }, [containerDivRef])

  useEffect(() => {
    if (dirty) {
      const values = selectedItems.map(item => item.value)
      onChange(multiple ? values : values.at(0))
    }
  }, [onChange, selectedItems, multiple, dirty])

  return (
    // TODO: Add aria/roles
    <div className="relative" ref={containerDivRef}>
      <div
        className={classNames(
          `input input-bordered input-${color}`,
          'flex flex-wrap items-center justify-center',
          'h-auto p-3 gap-1',
          { 'input-disabled': disabled }
        )}
      >
        {selectedItems.map(item => (
          <div key={item.value} className="inline-flex badge badge-neutral">
            {item.label}
          </div>
        ))}

        <input
          type="text"
          className={classNames('flex-1 min-w-0', {
            'input-disabled': disabled
          })}
          tabIndex={0}
          ref={(node) => {
            inputRef.current = node
            if (typeof ref === 'function') {
              ref(node)
            } else if (ref && 'current' in ref) {
              ref.current = node
            }
          }}
          disabled={disabled}
          placeholder={selectedItems.length === 0 ? placeholder : ''}
          onFocus={openMenu}
          onChange={setFilter}
          onKeyDown={handleKeyDown}
          {...props}
        />
        
        {loading && <span className={classNames('loading', `loading-${loadingVariant}`)}></span>}
      </div>

      <ul
        className={classNames(
          'absolute w-full menu bg-base-100 rounded-box',
          { hidden: !open }
        )}
      >
        {filteredItems.flatMap((item, index) => item ? (
          <li key={item.value}>
            <label
              className="label place-content-start"
            >
              <input
                type="checkbox"
                className={classNames('checkbox', { hidden: !multiple })}
                checked={selectedItems.includes(item)}
                onChange={() => selectItem(index)}
              />

              <span className="label-text">{item.label}</span>
            </label>
          </li>
        ) : [])}
      </ul>
    </div>
  )
})

Autocomplete.displayName = 'Autocomplete'
export default Autocomplete