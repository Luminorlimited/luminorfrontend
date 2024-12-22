import { ReactNode } from "react";
import FilteredComponent from "./_FilteredComponent";

export default function layout({ children }: { children: ReactNode }) {
    return (
        <>
            <FilteredComponent>{children}</FilteredComponent>
        </>
    );
}