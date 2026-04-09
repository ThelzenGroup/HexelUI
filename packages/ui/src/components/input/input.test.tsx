import * as React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { describe, it, expect, vi } from 'vitest'
import { Input } from './input'

describe('Input', () => {
  it('renders correctly', () => {
    render(<Input placeholder="Enter text" />)
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument()
  })

  it('forwards ref', () => {
    const ref = React.createRef<HTMLInputElement>()
    render(<Input ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLInputElement)
  })

  it('applies custom className', () => {
    render(<Input className="custom-class" data-testid="input" />)
    expect(screen.getByTestId('input')).toHaveClass('custom-class')
  })

  it('passes through HTML attributes', () => {
    render(<Input type="email" name="email" data-testid="input" />)
    const input = screen.getByTestId('input')
    expect(input).toHaveAttribute('type', 'email')
    expect(input).toHaveAttribute('name', 'email')
  })

  it('is disabled when disabled prop is set', () => {
    render(<Input disabled data-testid="input" />)
    expect(screen.getByTestId('input')).toBeDisabled()
  })

  it('fires onChange when value changes', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Input onChange={onChange} />)
    await user.type(screen.getByRole('textbox'), 'test')
    expect(onChange).toHaveBeenCalled()
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<Input aria-label="Text input" />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
