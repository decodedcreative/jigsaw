import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardImage,
} from './Card';

afterEach(() => {
  cleanup();
});

describe('Card', () => {
  it('renders with default props', () => {
    render(<Card>Card content</Card>);
    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  it('renders as a div element', () => {
    const { container } = render(<Card>Content</Card>);
    expect(container.querySelector('div')).toBeInTheDocument();
  });

  it('passes additional HTML attributes', () => {
    render(<Card data-testid="card">Content</Card>);
    expect(screen.getByTestId('card')).toBeInTheDocument();
  });
});

describe('CardHeader', () => {
  it('renders children', () => {
    render(<CardHeader>Header</CardHeader>);
    expect(screen.getByText('Header')).toBeInTheDocument();
  });

  it('renders as a div element', () => {
    const { container } = render(<CardHeader>Header</CardHeader>);
    expect(container.querySelector('div')).toBeInTheDocument();
  });
});

describe('CardTitle', () => {
  it('renders children', () => {
    render(<CardTitle>My Card Title</CardTitle>);
    expect(screen.getByText('My Card Title')).toBeInTheDocument();
  });

  it('renders as an h3 element', () => {
    const { container } = render(<CardTitle>Title</CardTitle>);
    expect(container.querySelector('h3')).toBeInTheDocument();
  });

  it('passes additional HTML attributes', () => {
    render(<CardTitle data-testid="card-title">Title</CardTitle>);
    expect(screen.getByTestId('card-title')).toBeInTheDocument();
  });
});

describe('CardDescription', () => {
  it('renders children', () => {
    render(<CardDescription>Some description</CardDescription>);
    expect(screen.getByText('Some description')).toBeInTheDocument();
  });

  it('renders as a p element', () => {
    const { container } = render(<CardDescription>Description</CardDescription>);
    expect(container.querySelector('p')).toBeInTheDocument();
  });
});

describe('CardContent', () => {
  it('renders children', () => {
    render(<CardContent>Content area</CardContent>);
    expect(screen.getByText('Content area')).toBeInTheDocument();
  });

  it('renders as a div element', () => {
    const { container } = render(<CardContent>Content</CardContent>);
    expect(container.querySelector('div')).toBeInTheDocument();
  });
});

describe('CardFooter', () => {
  it('renders children', () => {
    render(<CardFooter>Footer content</CardFooter>);
    expect(screen.getByText('Footer content')).toBeInTheDocument();
  });

  it('renders as a div element', () => {
    const { container } = render(<CardFooter>Footer</CardFooter>);
    expect(container.querySelector('div')).toBeInTheDocument();
  });
});

describe('CardImage', () => {
  it('renders an img element', () => {
    render(<CardImage src="https://example.com/img.jpg" alt="Card image" />);
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('renders with correct src and alt', () => {
    render(<CardImage src="https://example.com/img.jpg" alt="Card image" />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'https://example.com/img.jpg');
    expect(img).toHaveAttribute('alt', 'Card image');
  });
});

describe('Card composition', () => {
  it('renders a full card with all sub-components', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card description text</CardDescription>
        </CardHeader>
        <CardContent>Main content</CardContent>
        <CardFooter>Footer</CardFooter>
      </Card>
    );
    expect(screen.getByText('Card Title')).toBeInTheDocument();
    expect(screen.getByText('Card description text')).toBeInTheDocument();
    expect(screen.getByText('Main content')).toBeInTheDocument();
    expect(screen.getByText('Footer')).toBeInTheDocument();
  });
});
