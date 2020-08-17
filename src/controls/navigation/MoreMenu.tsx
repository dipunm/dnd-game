import { useMenuState, MenuStateReturn } from "reakit";
import React from "react";
import { NavMenu } from "./NavMenu";
import { NavMenuButton } from "./NavMenuButton";
import { GrMoreVertical } from "react-icons/gr";

type MoreMenuProps = {
  children: (menuProps: MenuStateReturn) => React.ReactNode
}

export const MoreMenu = ({ children }: MoreMenuProps) => {
    const menu = useMenuState({ placement: 'bottom-end', gutter: -10 });
  
    return (
      <>
        <NavMenuButton {...menu}><GrMoreVertical /></NavMenuButton>
        <NavMenu {...menu} aria-label="Navigation submenu">
          { children(menu) }
        </NavMenu>
      </>
    );
}
