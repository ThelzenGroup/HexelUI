import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { describe, it, expect } from 'vitest'
import { Alert, AlertTitle, AlertDescription } from './alert'

describe('Alert', () => {
  it('renders correctly', () => {
    render(<Alert>Alert content</Alert>)
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })

  it('forwards ref', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<Alert ref={ref}>Alert</Alert>)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  it('applies default variant classes', () => {
    render(<Alert>Default</Alert>)
    expect(screen.getByRole('alert')).toHaveClass('bg-background')
  })

  it('applies destructive variant classes', () => {
    render(<Alert variant="destructive">Destructive</Alert>)
    expect(screen.getByRole('alert')).toHaveClass('border-destructive/50')
  })

  it('applies custom className', () => {
    render(<Alert className="custom-class">Alert</Alert>)
    expect(screen.getByRole('alert')).toHaveClass('custom-class')
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<Alert>Alert</Alert>)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})

describe('AlertTitle', () => {
  it('renders correctly', () => {
    render(<AlertTitle>Title</AlertTitle>)
    expect(screen.getByText('Title')).toBeInTheDocument()
  })

  it('forwards ref', () => {
    const ref = React.createRef<HTMLParagraphElement>()
    render(<AlertTitle ref={ref}>Title</AlertTitle>)
    expect(ref.current).toBeInstanceOf(HTMLHeadingElement)
  })

  it('applies custom className', () => {
    render(<AlertTitle className="custom-class">Title</AlertTitle>)
    expect(screen.getByText('Title')).toHaveClass('custom-class')
  })
})

describe('AlertDescription', () => {
  it('renders correctly', () => {
    render(<AlertDescription>Description</AlertDescription>)
    expect(screen.getByText('Description')).toBeInTheDocument()
  })

  it('forwards ref', () => {
    const ref = React.createRef<HTMLParagraphElement>()
    render(<AlertDescription ref={ref}>Description</AlertDescription>)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  it('applies custom className', () => {
    render(<AlertDescription className="custom-class">Description</AlertDescription>)
    expect(screen.getByText('Description')).toHaveClass('custom-class')
  })
})
