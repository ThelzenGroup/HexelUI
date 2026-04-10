import * as React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { describe, it, expect, vi } from 'vitest'
import { Switch } from './switch'

describe('Switch', () => {
  it('renders correctly', () => {
    render(<Switch aria-label="Toggle feature" />)
    expect(screen.getByRole('switch', { name: 'Toggle feature' })).toBeInTheDocument()
  })

  it('forwards ref', () => {
    const ref = React.createRef<HTMLButtonElement>()
    render(<Switch ref={ref} aria-label="Toggle" />)
    expect(ref.current).not.toBeNull()
  })

  it('applies custom className', () => {
    render(<Switch className="custom-class" aria-label="Toggle" />)
    expect(screen.getByRole('switch')).toHaveClass('custom-class')
  })

  it('is disabled when disabled prop is set', () => {
    render(<Switch disabled aria-label="Disabled" />)
    expect(screen.getByRole('switch')).toBeDisabled()
  })

  it('calls onCheckedChange when clicked', async () => {
    const user = userEvent.setup()
    const onCheckedChange = vi.fn()
    render(<Switch aria-label="Toggle" onCheckedChange={onCheckedChange} />)
    await user.click(screen.getByRole('switch'))
    expect(onCheckedChange).toHaveBeenCalledWith(true)
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<Switch aria-label="Toggle feature" />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
