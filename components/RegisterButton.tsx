import { ReactNode } from "react";
import "./RegisterButton.css";

interface RegisterButtonProps {
  href: string;
  children?: ReactNode;
  className?: string;
  [dataAttr: `data-${string}`]: string | undefined;
}

export default function RegisterButton({
  href,
  children,
  className = "",
  ...dataProps
}: RegisterButtonProps) {
  return (
    <a
      href={href}
      className={`register-button inline-flex items-center justify-center rounded-full border border-green-500/40 bg-green-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-green-500${className ? ` ${className}` : ""}`}
      {...dataProps}
    >
      <span
        className="register-glitch-text"
        data-text={typeof children === "string" ? children : undefined}
      >
        {children}
      </span>
    </a>
  );
}
