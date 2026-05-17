import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button as AriaButton } from 'react-aria-components';
import { Modal, ModalContent, ModalTrigger, ModalFooter } from './Modal';

afterEach(() => {
  cleanup();
});

describe('Modal', () => {
  it('opens when trigger is clicked', async () => {
    const user = userEvent.setup();
    render(
      <ModalTrigger>
        <AriaButton>Open Modal</AriaButton>
        <Modal>
          <ModalContent title="Test Modal">Modal body content</ModalContent>
        </Modal>
      </ModalTrigger>
    );
    await user.click(screen.getByRole('button', { name: 'Open Modal' }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('displays modal title', async () => {
    const user = userEvent.setup();
    render(
      <ModalTrigger>
        <AriaButton>Open</AriaButton>
        <Modal>
          <ModalContent title="My Dialog Title">Content</ModalContent>
        </Modal>
      </ModalTrigger>
    );
    await user.click(screen.getByRole('button', { name: 'Open' }));
    expect(screen.getByText('My Dialog Title')).toBeInTheDocument();
  });

  it('displays modal body content', async () => {
    const user = userEvent.setup();
    render(
      <ModalTrigger>
        <AriaButton>Open</AriaButton>
        <Modal>
          <ModalContent title="Dialog">Body text here</ModalContent>
        </Modal>
      </ModalTrigger>
    );
    await user.click(screen.getByRole('button', { name: 'Open' }));
    expect(screen.getByText('Body text here')).toBeInTheDocument();
  });

  it('renders a close button by default', async () => {
    const user = userEvent.setup();
    render(
      <ModalTrigger>
        <AriaButton>Open</AriaButton>
        <Modal>
          <ModalContent title="Dialog">Content</ModalContent>
        </Modal>
      </ModalTrigger>
    );
    await user.click(screen.getByRole('button', { name: 'Open' }));
    const dialog = screen.getByRole('dialog');
    const buttons = dialog.querySelectorAll('button');
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('closes when close button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <ModalTrigger>
        <AriaButton>Open</AriaButton>
        <Modal>
          <ModalContent title="Dialog">Content</ModalContent>
        </Modal>
      </ModalTrigger>
    );
    await user.click(screen.getByRole('button', { name: 'Open' }));
    const dialog = screen.getByRole('dialog');
    const closeButton = dialog.querySelector('button');
    if (closeButton) {
      await user.click(closeButton);
    }
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('does not render close button when showCloseButton is false', async () => {
    const user = userEvent.setup();
    render(
      <ModalTrigger>
        <AriaButton>Open</AriaButton>
        <Modal>
          <ModalContent title="Dialog" showCloseButton={false}>Content</ModalContent>
        </Modal>
      </ModalTrigger>
    );
    await user.click(screen.getByRole('button', { name: 'Open' }));
    const dialog = screen.getByRole('dialog');
    expect(dialog.querySelectorAll('button')).toHaveLength(0);
  });

  it('supports render prop children for close access', async () => {
    const user = userEvent.setup();
    render(
      <ModalTrigger>
        <AriaButton>Open</AriaButton>
        <Modal>
          <ModalContent title="Dialog" showCloseButton={false}>
            {({ close }) => (
              <button onClick={close}>Close from inside</button>
            )}
          </ModalContent>
        </Modal>
      </ModalTrigger>
    );
    await user.click(screen.getByRole('button', { name: 'Open' }));
    expect(screen.getByText('Close from inside')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Close from inside' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('modal is not shown initially', () => {
    render(
      <ModalTrigger>
        <AriaButton>Open</AriaButton>
        <Modal>
          <ModalContent title="Dialog">Content</ModalContent>
        </Modal>
      </ModalTrigger>
    );
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});

describe('ModalFooter', () => {
  it('renders children', () => {
    render(<ModalFooter><button>OK</button></ModalFooter>);
    expect(screen.getByRole('button', { name: 'OK' })).toBeInTheDocument();
  });

  it('renders as a div element', () => {
    const { container } = render(<ModalFooter>Footer</ModalFooter>);
    expect(container.querySelector('div')).toBeInTheDocument();
  });
});
