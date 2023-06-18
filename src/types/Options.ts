import {Color} from "@/types/Color";
import Link from "next/link";
import {SVGProps} from "react";

export type DropdownOption = {
    text: string;
    Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
    //@ts-ignore
    color: Color;
    action: () => void;
};