import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { describe, it, expect } from 'vitest'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from './select'

describe('Select', () => {
  it('renders trigger correctly', () => {
    render(
      <Select>
        <SelectTrigger aria-label="Select fruit">
          <SelectValue placeholder="Choose a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
        </SelectContent>
      </Select>
    )
    expect(screen.getByRole('combobox', { name: 'Select fruit' })).toBeInTheDocument()
  })

  it('shows placeholder', () => {
    render(
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Choose a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
        </SelectContent>
      </Select>
    )
    expect(screen.getByText('Choose a fruit')).toBeInTheDocument()
  })

  it('renders open select correctly', () => {
    render(
      <Select open>
        <SelectTrigger aria-label="Select fruit">
          <SelectValue placeholder="Choose" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
        </SelectContent>
      </Select>
    )
    expect(screen.getByRole('listbox')).toBeInTheDocument()
  })

  it('forwards ref on trigger', () => {
    const ref = React.createRef<HTMLButtonElement>()
    render(
      <Select>
        <SelectTrigger ref={ref} aria-label="Select">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="a">A</SelectItem>
        </SelectContent>
      </Select>
    )
    expect(ref.current).not.toBeNull()
  })

  it('has no accessibility violations', async () => {
    const { container } = render(
      <Select>
        <SelectTrigger aria-label="Select fruit">
          <SelectValue placeholder="Choose" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
        </SelectContent>
      </Select>
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
