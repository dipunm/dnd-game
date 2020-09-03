import React, { useEffect } from "react";
import { VerticalStack } from "./flexbox/VerticalStack";
import { NavBar } from "../controls/navigation/NavBar";
import { TabList } from "../controls/tab-controls/TabList";
import { useTabState, TabStateReturn, MenuStateReturn } from "reakit";
import { Tab } from "../controls/tab-controls/Tab";
import { MoreMenu } from "../controls/navigation/MoreMenu";
import { Template } from "./Template";
import TabObservable from "./TabObservable";

type TabbedLayoutProps = {
    tabLabels: string[],
    tabIds: string[],
    moreMenuContents?: (menuProps: MenuStateReturn) => React.ReactNode,
    children: (tabProps: TabStateReturn) => React.ReactNode
};

export function TabbedLayout({ children, tabLabels, tabIds, moreMenuContents }: TabbedLayoutProps) {
    const tab = useTabState();

    useEffect(() => {
        TabObservable.updateActiveTab(tab.selectedId || null);
    },[tab.selectedId])

    return (
        <Template>
            <VerticalStack>
                <NavBar>
                    <TabList {...tab} aria-label="Menu">
                        {tabLabels.map((label,i) => (
                            <Tab key={label} {...tab} id={tabIds[i]}>{label}</Tab>
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