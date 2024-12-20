import React, { useMemo } from "react";
import ContextMenu, { Position } from "devextreme-react/context-menu";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import "./userPanel.scss";

export default function UserPanel({ toolbarRef }) {
  const router = useRouter();
  const { data: session } = useSession();

  const menuItems = useMemo(() => {
    function navigateToProfile() {
      toolbarRef.current.instance().repaint();
      router.push("/profile");
    }
    return [
      {
        text: "Profile",
        icon: "user",
        onClick: navigateToProfile,
      },
      {
        text: "Logout",
        icon: "runner",
        onClick: () =>
          signOut({
            callbackUrl: "/auth/signin",
          }),
      },
    ];
  }, [router, toolbarRef]);

  return (
    <div className={"user-panel"}>
      <div className={"user-info"}>
        <div className={"image-container"}>
          {session.user.image && (
            <img alt={""} src={session.user.image} width={30} height={30} />
          )}
        </div>
        <div className={"user-name"}>{session.user.name}</div>
      </div>
      <ContextMenu
        items={menuItems}
        target={".user-button"}
        showEvent={"dxclick"}
        width={150}
        cssClass={"user-menu"}
      >
        <Position my={"top center"} at={"bottom center"} />
      </ContextMenu>
    </div>
  );
}
