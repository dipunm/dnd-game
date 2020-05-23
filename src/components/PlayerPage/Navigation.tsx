import React, { ElementType, ReactNode } from "react";
import { useDialogState, DialogDisclosure, useMenuState, Separator } from "reakit";
import { NavMenuItem, NavMenuButton, NavMenu, NavLabel } from "../StyledTags/Navigation";
import { Dialog, DialogBackdrop } from "../StyledTags/Dialog";
import { Button } from "../StyledTags/FormAndInputs";
import UserObservable from "../../observables/UserObservable";
import { useObservable } from "react-use";
import { GrMoreVertical } from "react-icons/gr";

function LogoutBtn({ className }: React.ComponentProps<ElementType>) {
  const dialog = useDialogState({ modal: true, visible: true });

  return (
    <>
      <DialogDisclosure className={className} as={NavMenuItem} {...dialog}>
        Logout
            </DialogDisclosure>
      <DialogBackdrop {...dialog}>
        <Dialog role="alertdialog" {...dialog}>
          <p>Are you sure you want to logout?</p>
          <div style={{ display: 'grid', gridAutoFlow: 'column', gap: '20px' }}>
            <Button primary onClick={() => UserObservable.reset()}>Yes</Button>
            <Button onClick={() => dialog.hide()}>Cancel</Button>
          </div>
        </Dialog>
      </DialogBackdrop>
    </>
  );
}

export type TopBarProps = {
  tabs: ReactNode[],
  panels: ReactNode[],
}

export const More = () => {
  const menu = useMenuState({ placement: 'bottom-end', gutter: -10 });
  const user = useObservable(UserObservable);

  return (
    <>
      <NavMenuButton {...menu}><GrMoreVertical /></NavMenuButton>
      <NavMenu {...menu} aria-label="Navigation submenu">
        <NavLabel>You are logged in as <strong>{user?.username}</strong></NavLabel>
        <Separator />
        <NavMenuItem {...menu} as={LogoutBtn} />
      </NavMenu>
    </>
  );
}