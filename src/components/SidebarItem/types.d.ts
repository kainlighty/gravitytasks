import { ReactNode } from "react";

type SidebarItemProps = {
    className?: string;
    label: string;
    labelClassName?: string;
    value?: ReactNode;
    valueClassName?: string;
}

export default SidebarItemProps;