import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './styles.module.scss';

const VARIATIONS = {
    primary:
        'bn bp-bg-primary-main bp-c-neutral-light-snow hover-bp-bg-primary-dark active-bp-bg-primary-night',
    'primary-trackings':
        'bn bg-transparent bp-c-neutral-dark-rooftop hover-bp-bg-disabled-bg active-bp-c-neutral-light-snow active-bp-bg-neutral-medium-elephant',
    secondary:
        'bn bg-transparent bp-c-neutral-dark-rooftop hover-bp-c-primary-main hover-bp-bg-disabled-bg active-bp-c-primary-main active-bp-bg-hover-light',
    'secondary-dark':
        'bn bg-transparent bp-c-neutral-medium-silver hover-bp-c-neutral-light-snow hover-bp-bg-neutral-dark-rooftop active-bp-c-neutral-light-snow active-bp-bg-neutral-medium-elephant',
    'secondary-delete':
        'bn bg-transparent bp-c-neutral-dark-rooftop hover-bp-bg-disabled-bg active-bp-c-neutral-light-snow active-bp-bg-extend-reds-delete',
    tertiary:
        'ba bg-transparent bp-c-primary-main bp-bc-neutral-medium-wave hover-bp-bc-primary-main active-bp-bg-hover-light',
    delete: 'bn bp-bg-extend-reds-delete bp-c-neutral-light-snow hover-bp-bg-extend-reds-lipstick active-bp-bg-extend-reds-dragon',
    ghost: 'ba bg-transparent bp-c-primary-main bp-bc-primary-main hover-bp-bg-disabled-bg active-bp-bg-hover-light'
};

const CustomButton = ({
    dataTestId,
    text,
    children,
    icon,
    active = false,
    variant = 'secondary',
    size = 'standard',
    type = 'button',
    iconOnly = false,
    disabled = false,
    wrap = false,
    options = {
        width: 'auto',
        colorClass: ''
    },
    onClick = () => {}
}) => {
    const buttonClass = classNames(
        'flex items-center f6 b br3 outline-0',
        styles.button,
        styles[size],
        styles[variant],
        options.colorClass,
        {
            'w-100': options?.width === '100%',
            'w-auto': options?.width === 'auto',
            nowrap: !wrap,
            pointer: !disabled,
            'not-allowed': disabled,
            [styles.active]: active,
            pv2: true,
            ph2: iconOnly,
            ph3: !iconOnly,
            'justify-center': iconOnly,
            [VARIATIONS[variant]]: !options?.colorClass
        }
    );

    const iconSize = {
        short: 'x-small',
        standard: 'medium'
    };

    return (
        <button
            type={type}
            className={buttonClass}
            disabled={disabled}
            onClick={onClick}
            data-testid={dataTestId}
        >
            {icon && (
                <div
                    className={classNames('flex items-center', {
                        mr1: !iconOnly
                    })}
                >
                    <bds-icon name={icon} size={iconSize[size]} />
                </div>
            )}

            {!iconOnly && (text || children)}
        </button>
    );
};

CustomButton.propTypes = {
    dataTestId: PropTypes.string,
    text: PropTypes.string,
    children: PropTypes.any,
    icon: PropTypes.string,
    active: PropTypes.bool,
    variant: PropTypes.string,
    size: PropTypes.string,
    type: PropTypes.string,
    iconOnly: PropTypes.bool,
    disabled: PropTypes.bool,
    wrap: PropTypes.bool,
    options: PropTypes.object,
    onClick: PropTypes.func
};

export default CustomButton;
