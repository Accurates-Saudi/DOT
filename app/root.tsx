import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import { seoDefaults, siteSettings } from "@/data";
import "./app.css";

export const links: Route.LinksFunction = () => [
  { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Something went wrong";
  let details = "An unexpected error occurred. Please try again later.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "Page Not Found" : "Error";
    details =
      error.status === 404
        ? "The page you are looking for does not exist."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="flex min-h-svh items-center justify-center p-6">
      <div className="max-w-md space-y-4 text-center">
        <p className="text-sm font-medium text-primary uppercase">
          {siteSettings.companyName}
        </p>
        <h1 className="text-3xl font-bold text-foreground">{message}</h1>
        <p className="text-muted-foreground">{details}</p>
        <a
          href="/"
          className="inline-block text-sm font-medium text-primary hover:underline"
        >
          Return to homepage
        </a>
        {stack && (
          <pre className="mt-6 w-full overflow-x-auto rounded-lg bg-muted p-4 text-left text-xs">
            <code>{stack}</code>
          </pre>
        )}
      </div>
    </main>
  );
}

export const meta: Route.MetaFunction = () => {
  return [
    { title: seoDefaults.titleTemplate.replace("%s", siteSettings.companyName) },
    { name: "description", content: seoDefaults.defaultDescription },
  ];
};
