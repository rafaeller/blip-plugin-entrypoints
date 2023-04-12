import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const InputChips = ({
    onChange,
    disabled,
    chips,
    duplicated,
    label
}) => {
    const inputChipsRf = useRef(null);

    useEffect(() => {
        const { current } = inputChipsRf;
        current.addEventListener('bdsChangeChips', onChange);

        return () => {
            current.removeEventListener('bdsChangeChips', onChange);
        };
        // eslint-disable-next-line
	}, []);


    return (
        <bds-input-chips
            ref={inputChipsRf}
            disabled={disabled}
            duplicated={duplicated}
            chips={chips}
            label={label}
        />
    );
};

InputChips.propTypes = {
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    chips: PropTypes.string,
    duplicated: PropTypes.bool,
    label: PropTypes.string,
};

export default InputChips;
