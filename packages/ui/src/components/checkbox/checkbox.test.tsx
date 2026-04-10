import * as React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { describe, it, expect, vi } from 'vitest'
import { Checkbox } from './checkbox'

describe('Checkbox', () => {
  it('renders correctly', () => {
    render(<Checkbox aria-label="Accept terms" />)
    expect(screen.getByRole('checkbox', { name: 'Accept terms' })).toBeInTheDocument()
  })

  it('forwards ref', () => {
    const ref = React.createRef<HTMLButtonElement>()
    render(<Checkbox ref={ref} aria-label="Check" />)
    expect(ref.current).not.toBeNull()
  })

  it('applies custom className', () => {
    render(<Checkbox className="custom-class" aria-label="Check" />)
    expect(screen.getByRole('checkbox')).toHaveClass('custom-class')
  })

  it('is disabled when disabled prop is set', () => {
    render(<Checkbox disabled aria-label="Disabled" />)
    expect(screen.getByRole('checkbox')).toBeDisabled()
  })

  it('calls onCheckedChange when clicked', async () => {
    const user = userEvent.setup()
    const onCheckedChange = vi.fn()
    render(<Checkbox aria-label="Toggle" onCheckedChange={onCheckedChange} />)
    await user.click(screen.getByRole('checkbox'))
    expect(onCheckedChange).toHaveBeenCalledWith(true)
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<Checkbox aria-label="Accept terms" />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
