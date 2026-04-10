import * as React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { describe, it, expect } from 'vitest'
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from './dialog'

describe('Dialog', () => {
  const renderDialog = (open?: boolean) =>
    render(
      <Dialog open={open}>
        <DialogTrigger asChild>
          <button>Open dialog</button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Dialog title</DialogTitle>
          <DialogDescription>Dialog description</DialogDescription>
        </DialogContent>
      </Dialog>
    )

  it('renders trigger correctly', () => {
    renderDialog()
    expect(screen.getByRole('button', { name: 'Open dialog' })).toBeInTheDocument()
  })

  it('opens dialog on trigger click', async () => {
    const user = userEvent.setup()
    renderDialog()
    await user.click(screen.getByRole('button', { name: 'Open dialog' }))
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText('Dialog title')).toBeInTheDocument()
  })

  it('closes dialog on Escape key', async () => {
    const user = userEvent.setup()
    renderDialog()
    await user.click(screen.getByRole('button', { name: 'Open dialog' }))
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    await user.keyboard('{Escape}')
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('renders open dialog correctly', () => {
    renderDialog(true)
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText('Dialog title')).toBeInTheDocument()
    expect(screen.getByText('Dialog description')).toBeInTheDocument()
  })

  it('has no accessibility violations when open', async () => {
    const { container } = renderDialog(true)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
