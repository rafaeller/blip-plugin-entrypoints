import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './modal.module.scss';

import { ReactComponent as CloseIcon } from '../../assets/images/svg/close-icon.svg';
import CustomButton from '../CustomButton';

const Modal = ({
    title,
    children,
    footer,
    width = 50,
    closable = true,
    visible = false,
    hasFooter = false,
    elementRef = null,
    confirmLabel = 'Salvar',
    cancelLabel = 'Cancelar',
    onConfirm = () => {},
    onCancel = () => {},
    onClose = () => {}
}) => {
    const [isVisible, setIsVisible] = useState(visible);
    const [customPosition, setCustomPosition] = useState({});

    const wraper_class = classNames(
        'h-100 w-100 center pa0 pt4-ns fixed z-9999 dn',
        {
            [styles['modal-open']]: !!isVisible
        }
    );

    const mask_class = classNames(
        'h-100 w-100 absolute top-0 left-0 bg-black-70',
        styles['modal-mask']
    );

    const content_class = classNames(
        'w-100 relative center',
        styles['modal-content'],
        {
            [`w-${width}-ns`]: !!width
        }
    );

    useEffect(() => {
        if (elementRef) {
            const { offsetTop } = elementRef.current;
            setCustomPosition({ paddingTop: offsetTop });
        } else {
            setCustomPosition({});
        }
    }, [elementRef]);

    useEffect(() => {
        setIsVisible(!!visible);
    }, [visible]);

    const handleClose = () => {
        setIsVisible(false);
        onClose();
    };

    const renderHeader = () => (
        <div className="relative flex items-center">
            {!!title && (
                <div className="f3 fw6 lh-copy ma0 mw6 truncate bp-c-neutral-dark-desk">
                    {title}
                </div>
            )}
            {!!closable && (
                <div
                    aria-label="Close"
                    data-testid="close-modal-icon"
                    className="pointer ml-auto bp-c-neutral-dark-rooftop"
                    onClick={() => handleClose()}
                >
                    <CloseIcon />
                </div>
            )}
        </div>
    );

    const renderFooter = () => (
        <div className="flex justify-end">
            <div className="mr2">
                <CustomButton
                    text={cancelLabel}
                    variant="secondary"
                    onClick={() => {
                        onCancel();
                        handleClose();
                    }}
                    dataTestId="cancel-modal-button"
                />
            </div>
            <bds-button
                variant='primary'
                onClick={() => onConfirm()}
                dataTestId="confirm-modal-button"
            >
                {confirmLabel}
            </bds-button>
        </div>
    );

    return (
        <div className={wraper_class} style={customPosition}>
            <div
                className={mask_class}
                data-testid="close-overlay"
                onClick={() => handleClose()}
            ></div>
            <div className={content_class}>
                <div className="bg-white shadow-6 br3 pa4">
                    <div className="h-100 w-100 flex flex-column flex-nowrap">
                        {(!!title || !!closable) && renderHeader()}
                        <div className="pt1-5 pb1-5">{children}</div>
                        {hasFooter && (footer || renderFooter())}
                    </div>
                </div>
            </div>
        </div>
    );
};

Modal.propTypes = {
    title: PropTypes.string,
    children: PropTypes.any,
    footer: PropTypes.any,
    width: PropTypes.number,
    closable: PropTypes.bool,
    visible: PropTypes.bool,
    hasFooter: PropTypes.bool,
    elementRef: PropTypes.any,
    confirmLabel: PropTypes.string,
    cancelLabel: PropTypes.string,
    onConfirm: PropTypes.func,
    onCancel: PropTypes.func,
    onClose: PropTypes.func
};

export default Modal;
