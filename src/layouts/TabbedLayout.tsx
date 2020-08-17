import React from "react";
import { VerticalStack } from "./flexbox/VerticalStack";
import { NavBar } from "../controls/navigation/NavBar";
import { TabList } from "../controls/tab-controls/TabList";
import { useTabState, TabStateReturn, MenuStateReturn } from "reakit";
import { Tab } from "../controls/tab-controls/Tab";
import { MoreMenu } from "../controls/navigation/MoreMenu";
import { Template } from "./Template";

type TabbedLayoutProps = {
    tabLabels: string[],
    moreMenuContents?: (menuProps: MenuStateReturn) => React.ReactNode,
    children: (tabProps: TabStateReturn) => React.ReactNode
};

export function TabbedLayout({ children, tabLabels, moreMenuContents }: TabbedLayoutProps) {
    const tab = useTabState();
    
    return (
        <Template>
            <VerticalStack>
                <NavBar>
                    <TabList {...tab}>
                        {tabLabels.map(label => (
                            <Tab {...tab}>{label}</Tab>
                        ))}
                    </TabList>
                    { moreMenuContents && ( 
                        <MoreMenu>
                            { moreMenuContents }
                        </MoreMenu>
                    )}
                </NavBar>

                {children(tab)}
            
            </VerticalStack>
        </Template>
    );
}