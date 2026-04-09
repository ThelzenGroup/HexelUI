import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { describe, it, expect } from 'vitest'
import { Label } from './label'

describe('Label', () => {
  it('renders correctly', () => {
    render(<Label>Label text</Label>)
    expect(screen.getByText('Label text')).toBeInTheDocument()
  })

  it('forwards ref', () => {
    const ref = React.createRef<HTMLLabelElement>()
    render(<Label ref={ref}>Label</Label>)
    expect(ref.current).toBeInstanceOf(HTMLLabelElement)
  })

  it('applies custom className', () => {
    render(<Label className="custom-class">Label</Label>)
    expect(screen.getByText('Label')).toHaveClass('custom-class')
  })

  it('passes through HTML attributes', () => {
    render(<Label htmlFor="input-id">Label</Label>)
    expect(screen.getByText('Label')).toHaveAttribute('for', 'input-id')
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<Label>Label text</Label>)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
