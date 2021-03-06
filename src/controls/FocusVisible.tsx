import React from "react";
import { useFocusVisible } from "use-focus-visible";
import { css } from "styled-components";
import colors from "../constants/colors";

interface IFocusableComponentProps {
    onBlur?: ((e: React.FormEvent) => void)
    onFocus?: ((e: React.FormEvent) => void)
}

export function withFocusVisibleAttr<TProps>(Component:  React.ComponentType<TProps & IFocusableComponentProps>) { 
    return React.forwardRef((props: TProps, forwardedRef) =>  {
        const { onBlur, onFocus, focusVisible } = useFocusVisible();
        return (
            <Component ref={forwardedRef} {...props} focus-visible={focusVisible ? 'true' : 'false'}
                onBlur={onBlur} onFocus={onFocus} />
        );
    });
}

export const defaultFocusStyle = css`
        box-shadow: 0 7px 5px -3px ${colors.outline};
`;
export const focusStyles = (customStyle = defaultFocusStyle) => css`
    /**
     * when focus-visible attr is missing
     * rely on browser :focus-visible using
     * backwards compatible technique:
     */
    &:not([focus-visible]) {
        &:focus {
            ${customStyle}
        }

        &:focus:not(:focus-visible) {
            outline: none;
        }

        &::-moz-focus-inner {
            border: 0;
        }
    }

    /** 
     * when focus-visible attr available, 
     * we reset browser focus styles by default.
     */
    &[focus-visible] {
        &:focus {
            outline: none;
        }
    
        &::-moz-focus-inner {
            border: 0;
        }
    }

    &[focus-visible=true]:focus {
        ${customStyle}
    }
`;