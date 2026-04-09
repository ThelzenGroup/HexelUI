import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { describe, it, expect } from 'vitest'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './card'

describe('Card', () => {
  it('renders correctly', () => {
    render(<Card>Card content</Card>)
    expect(screen.getByText('Card content')).toBeInTheDocument()
  })

  it('forwards ref', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<Card ref={ref}>Card</Card>)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  it('applies custom className', () => {
    render(<Card className="custom-class" data-testid="card">Card</Card>)
    expect(screen.getByTestId('card')).toHaveClass('custom-class')
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<Card>Card</Card>)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})

describe('CardHeader', () => {
  it('renders correctly', () => {
    render(<CardHeader>Header</CardHeader>)
    expect(screen.getByText('Header')).toBeInTheDocument()
  })

  it('forwards ref', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<CardHeader ref={ref}>Header</CardHeader>)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })
})

describe('CardTitle', () => {
  it('renders correctly', () => {
    render(<CardTitle>Title</CardTitle>)
    expect(screen.getByText('Title')).toBeInTheDocument()
  })

  it('forwards ref', () => {
    const ref = React.createRef<HTMLParagraphElement>()
    render(<CardTitle ref={ref}>Title</CardTitle>)
    expect(ref.current).toBeInstanceOf(HTMLHeadingElement)
  })
})

describe('CardDescription', () => {
  it('renders correctly', () => {
    render(<CardDescription>Description</CardDescription>)
    expect(screen.getByText('Description')).toBeInTheDocument()
  })

  it('forwards ref', () => {
    const ref = React.createRef<HTMLParagraphElement>()
    render(<CardDescription ref={ref}>Description</CardDescription>)
    expect(ref.current).toBeInstanceOf(HTMLParagraphElement)
  })
})

describe('CardContent', () => {
  it('renders correctly', () => {
    render(<CardContent>Content</CardContent>)
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('forwards ref', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<CardContent ref={ref}>Content</CardContent>)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })
})

describe('CardFooter', () => {
  it('renders correctly', () => {
    render(<CardFooter>Footer</CardFooter>)
    expect(screen.getByText('Footer')).toBeInTheDocument()
  })

  it('forwards ref', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<CardFooter ref={ref}>Footer</CardFooter>)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })
})
