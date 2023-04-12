import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

import Select from '../Select';

describe('Select component', () => {
    const handleEvent = jest.fn();
    const mockOptions = [
        { value: 'Cat', label: 'Meow' },
        { value: 'Dog', label: 'Woof' }
    ];

    it('should render correctly', () => {
        const { container } = render(
            <Select
                placeholder="Select.."
                value=""
                options={mockOptions}
                onChange={handleEvent}
            />
        );

        expect(container.firstChild).toMatchSnapshot();
    });
});
