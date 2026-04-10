import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { describe, it, expect } from 'vitest'
import {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastAction,
} from './toast'

describe('Toast', () => {
  const renderToast = (open = true) =>
    render(
      <ToastProvider>
        <Toast open={open}>
          <ToastTitle>Toast title</ToastTitle>
          <ToastDescription>Toast description</ToastDescription>
          <ToastAction altText="Undo">Undo</ToastAction>
        </Toast>
        <ToastViewport />
      </ToastProvider>
    )

  it('renders toast when open', () => {
    renderToast(true)
    expect(screen.getByText('Toast title')).toBeInTheDocument()
    expect(screen.getByText('Toast description')).toBeInTheDocument()
  })

  it('renders action button', () => {
    renderToast(true)
    expect(screen.getByRole('button', { name: 'Undo' })).toBeInTheDocument()
  })

  it('does not render when closed', () => {
    renderToast(false)
    expect(screen.queryByText('Toast title')).not.toBeInTheDocument()
  })

  it('has no accessibility violations when open', async () => {
    const { container } = renderToast(true)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
