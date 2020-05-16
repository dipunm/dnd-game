import React from "react";
import { useFocusVisible } from "use-focus-visible";
import { css } from "styled-components";
import colors from "../../constants/colors";

interface IFocusableComponentProps {
    onBlur?: ((e: React.FormEvent) => void)
    onFocus?: ((e: React.FormEvent) => void)
}

export function withFocusVisibleAttr<TProps>(Component:  React.ComponentType<TProps & IFocusableComponentProps>) { 
    return (props: TProps) =>  {
        const { onBlur, onFocus, focusVisible } = useFocusVisible();
        return (
            <Component {...props} focus-visible={focusVisible ? 'true' : 'false'}
                onBlur={onBlur} onFocus={onFocus} />
        );
    }
}

export const defaultFocusStyle = css`
        box-shadow: 0 4px 2px -3px ${colors.outline};
        transition: box-shadow 160ms ease-in;
`;
export const focusStyles = (customStyle = defaultFocusStyle) => css`
    &[focus-visible]::-moz-focus-inner {
        border: 0;
    }
    
    &[focus-visible=true] {
        ${customStyle}
    }

    &:focus:not([focus-visible]) {
        ${customStyle}
    }

    &:focus:not(:focus-visible) {
        outline: none;
    }
`;