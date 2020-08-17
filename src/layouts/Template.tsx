import React from "react";
import { BreakpointLock, FullPage } from "./containers/MobileHelpers";

export const Template: React.FC = ({ children }) => (
    <FullPage>
        <BreakpointLock>
            { children }
        </BreakpointLock>
    </FullPage>
);