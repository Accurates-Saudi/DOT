import { Link, type LinkProps } from "react-router";

import { useLocalizedPath } from "@/i18n/hooks";

export interface LocalizedLinkProps extends Omit<LinkProps, "to"> {
  to: string;
}

export function LocalizedLink({ to, ...props }: LocalizedLinkProps) {
  const localizePath = useLocalizedPath();
  return <Link to={localizePath(to)} {...props} />;
}
