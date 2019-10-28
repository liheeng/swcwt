import * as React from "react";
import "./Sidebar.less";
interface SidebarState {
    collapsed: boolean;
    mode: "vertical" | "inline" | "horizontal" | undefined;
}
declare class Sidebar extends React.Component<{}, SidebarState> {
    constructor(props: {});
    render(): JSX.Element;
    private toggle;
}
export default Sidebar;
