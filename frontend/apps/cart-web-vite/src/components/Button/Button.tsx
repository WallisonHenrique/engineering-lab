import "./Button.css"
import type { ComponentPropsWithoutRef } from "react";

export function Button({ children, ...props }: ComponentPropsWithoutRef<'button'>) {
    return <button className="button" {...props}>{children}</button>
}