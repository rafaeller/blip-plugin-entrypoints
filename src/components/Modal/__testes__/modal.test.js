import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Modal from '../Modal';

describe('Modal component', () => {
    const mockClose = jest.fn();
    const mockCancel = jest.fn();
    const mockConfirm = jest.fn();

    beforeEach(() =>
        render(
            <Modal
                title="My Modal"
                visible={true}
                hasFooter={true}
                onConfirm={mockConfirm}
                onCancel={mockCancel}
                onClose={mockClose}
            >
                Content
            </Modal>
        )
    );

    afterEach(() => jest.clearAllMocks());

    it('should handle cancel click event', () => {
        const buttonNode = screen.queryByTestId('cancel-modal-button');
        userEvent.click(buttonNode);
        expect(mockCancel).toHaveBeenCalledTimes(1);
    });

    it('should handle confirm click event', () => {
        const buttonNode = screen.queryByTestId('confirm-modal-button');
        userEvent.click(buttonNode);
        expect(mockConfirm).toHaveBeenCalledTimes(1);
    });

    it('should handle close modal when click on overlay', () => {
        const node = screen.queryByTestId('close-overlay');
        userEvent.click(node);
        expect(mockClose).toHaveBeenCalledTimes(1);
    });

    it('should handle close modal when click on close icon', () => {
        const node = screen.queryByTestId('close-modal-icon');
        userEvent.click(node);
        expect(mockClose).toHaveBeenCalledTimes(1);
    });

    it('should render correctly', () => {
        const { container } = render(
            <Modal title="My Modal" visible={true}>
                Content
            </Modal>
        );
        expect(container.firstChild).toMatchSnapshot();
    });
});
