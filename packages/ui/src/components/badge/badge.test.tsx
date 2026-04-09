import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { describe, it, expect } from 'vitest'
import { Badge } from './badge'

describe('Badge', () => {
  it('renders correctly', () => {
    render(<Badge>Badge text</Badge>)
    expect(screen.getByText('Badge text')).toBeInTheDocument()
  })

  it('applies default variant classes', () => {
    render(<Badge>Default</Badge>)
    expect(screen.getByText('Default')).toHaveClass('bg-primary')
  })

  it('applies secondary variant classes', () => {
    render(<Badge variant="secondary">Secondary</Badge>)
    expect(screen.getByText('Secondary')).toHaveClass('bg-secondary')
  })

  it('applies destructive variant classes', () => {
    render(<Badge variant="destructive">Destructive</Badge>)
    expect(screen.getByText('Destructive')).toHaveClass('bg-destructive')
  })

  it('applies outline variant classes', () => {
    render(<Badge variant="outline">Outline</Badge>)
    expect(screen.getByText('Outline')).toHaveClass('text-foreground')
  })

  it('applies custom className', () => {
    render(<Badge className="custom-class">Badge</Badge>)
    expect(screen.getByText('Badge')).toHaveClass('custom-class')
  })

  it('passes through HTML attributes', () => {
    render(<Badge data-testid="badge">Badge</Badge>)
    expect(screen.getByTestId('badge')).toBeInTheDocument()
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<Badge>Badge</Badge>)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
