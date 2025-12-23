import { ReactNode } from "react";

export type SidebarItemProps = {
    className?: string;
    label: string;
    labelClassName?: string;
    value?: ReactNode;
    valueClassName?: string;
}