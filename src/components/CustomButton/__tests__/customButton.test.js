import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import CustomButton from '../CustomButton';

describe('CustomButton component', () => {
    const mockHandle = jest.fn();

    afterEach(() => jest.clearAllMocks());

    it('should handle click event', () => {
        render(
            <CustomButton
                text="Mocked Button"
                variant="secondary"
                size="standard"
                onClick={mockHandle}
                dataTestId="mocked-button"
            />
        );
        const cardNode = screen.queryByTestId('mocked-button');
        userEvent.click(cardNode);
        expect(mockHandle).toHaveBeenCalledTimes(1);
    });

    it('should render correctly', () => {
        const { container } = render(
            <CustomButton
                text="Mocked Button"
                variant="secondary"
                size="standard"
            />
        );

        expect(container.firstChild).toMatchSnapshot();
    });
});
