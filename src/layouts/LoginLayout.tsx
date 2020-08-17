import React, { ReactElement } from "react";
import { PatternedContainer } from "./containers/PatternedContainer";
import { WhiteContentCard } from "./containers/WhiteContentCard";
import { Template } from "./Template";

export function LoginLayout({ heroContent, mainContent }: { heroContent: ReactElement, mainContent: ReactElement }) {
    return (
        <Template>
            <PatternedContainer>
                <div>
                    { heroContent }
                </div>
                <WhiteContentCard>
                    { mainContent }
                </WhiteContentCard>
            </PatternedContainer>
        </Template>
    )
}