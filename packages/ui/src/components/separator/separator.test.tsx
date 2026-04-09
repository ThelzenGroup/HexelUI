import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { describe, it, expect } from 'vitest'
import { Separator } from './separator'

describe('Separator', () => {
  it('renders correctly', () => {
    const { container } = render(<Separator />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('forwards ref', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<Separator ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  it('applies horizontal orientation classes by default', () => {
    const { container } = render(<Separator />)
    expect(container.firstChild).toHaveClass('h-[1px]', 'w-full')
  })

  it('applies vertical orientation classes', () => {
    const { container } = render(<Separator orientation="vertical" />)
    expect(container.firstChild).toHaveClass('h-full', 'w-[1px]')
  })

  it('is decorative by default', () => {
    const { container } = render(<Separator />)
    expect(container.firstChild).toHaveAttribute('role', 'none')
  })

  it('has separator role when not decorative', () => {
    const { container } = render(<Separator decorative={false} />)
    expect(container.firstChild).toHaveAttribute('role', 'separator')
  })

  it('applies custom className', () => {
    const { container } = render(<Separator className="custom-class" />)
    expect(container.firstChild).toHaveClass('custom-class')
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<Separator />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
