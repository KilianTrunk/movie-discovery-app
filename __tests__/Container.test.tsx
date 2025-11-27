import { render, screen } from '@testing-library/react'
import { Container } from '@/components/ui/Container'

describe('Container', () => {
  it('renders children correctly', () => {
    render(
      <Container>
        <div>Test content</div>
      </Container>
    )

    expect(screen.getByText('Test content')).toBeInTheDocument()
  })

  it('applies default classes', () => {
    const { container } = render(
      <Container>
        <div>Content</div>
      </Container>
    )

    const containerDiv = container.firstChild as HTMLElement
    expect(containerDiv).toHaveClass('mx-auto', 'max-w-7xl', 'px-4', 'sm:px-6', 'lg:px-8')
  })

  it('applies custom className', () => {
    const { container } = render(
      <Container className="custom-class">
        <div>Content</div>
      </Container>
    )

    const containerDiv = container.firstChild as HTMLElement
    expect(containerDiv).toHaveClass('custom-class')
    expect(containerDiv).toHaveClass('mx-auto', 'max-w-7xl', 'px-4', 'sm:px-6', 'lg:px-8')
  })
})
