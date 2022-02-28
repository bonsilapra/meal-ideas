import React from 'react';
import './Commons.css';

const STYLES = [
    'btn--primary', 
    'btn--primary--rev', 
    'btn--secondary',
    'btn--object'
];


const SHAPES = [
    'btn--square',
];

const SIZES = [
    'btn--small', 
    'btn--medium', 
    'btn--medium-smaller',
    'btn--medium--rev'
];

export const MyButton = ({
    children,
    type,
    onClick,
    style,
    title,
    disabled,
    buttonStyle,
    buttonShape,
    buttonSize
}) => {
    const checkButtonStyle = STYLES.includes(buttonStyle)
        ? buttonStyle
        : STYLES[0];

    const checkButtonShape = SHAPES.includes(buttonShape) ? buttonShape : "";

    const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

    return (
        <button
        className={`btn ${checkButtonStyle} ${checkButtonShape} ${checkButtonSize}`}
        onClick={onClick}
        type={type}
        style={style}
        title={title}
        disabled={disabled}
        >
        {children}
        </button>
    );
};