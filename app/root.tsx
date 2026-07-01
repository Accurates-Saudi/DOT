import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteLoaderData,
} from "react-router";

import type { Route } from "./+types/root";
import { CookieConsentProvider } from "@/contexts/cookie-consent-context";
import { MainLayout } from "@/components/layout";
import { NotFoundPage } from "@/pages/NotFoundPage";
import {
  defaultLocale,
  detectLocaleFromPathname,
  getDirection,
  localeHtmlLang,
  parseLocaleCookie,
} from "@/i18n";
import { buildPageTitle } from "@/i18n/seo";
import { FallbackI18nProvider } from "@/i18n/fallback-provider";
import { siteSettings } from "@/data/site";
import "./app.css";

export const links: Route.LinksFunction = () => [
  { rel: "icon", href: "/favicon.webp", type: "image/webp" },
  { rel: "apple-touch-icon", href: "/apple-touch-icon.webp" },
  { rel: "manifest", href: "/site.webmanifest" },
];

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const fromPath = detectLocaleFromPathname(url.pathname);
  const fromCookie = parseLocaleCookie(request.headers.get("Cookie"));
  const locale = fromPath ?? fromCookie ?? defaultLocale;

  return {
    locale,
    direction: getDirection(locale),
  };
}

function RootMessagesBridge({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function Layout({ children }: { children: React.ReactNode }) {
  const data = useRouteLoaderData<typeof loader>("root");
  const locale = data?.locale ?? defaultLocale;
  const direction = data?.direction ?? getDirection(locale);

  return (
    <html lang={localeHtmlLang[locale]} dir={direction}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0c1524" />
        <Meta />
        <Links />
      </head>
      <body>
        <CookieConsentProvider>
          <RootMessagesBridge>{children}</RootMessagesBridge>
        </CookieConsentProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

function ErrorFallback({
  message,
  details,
}: {
  message: string;
  details: string;
}) {
  return (
    <main className="flex min-h-svh items-center justify-center p-6">
      <div className="max-w-md space-y-4 text-center">
        <p className="text-sm font-medium text-primary uppercase">
          {siteSettings.companyName}
        </p>
        <h1 className="text-3xl font-bold text-foreground">{message}</h1>
        <p className="text-muted-foreground">{details}</p>
      </div>
    </main>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Something went wrong";
  let details = "An unexpected error occurred. Please try again later.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return (
        <FallbackI18nProvider>
          <MainLayout>
            <NotFoundPage />
          </MainLayout>
        </FallbackI18nProvider>
      );
    }

    message = "Error";
    details = error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <FallbackI18nProvider>
      <MainLayout>
        <div className="flex min-h-[50vh] flex-col items-center justify-center p-6">
          <ErrorFallback message={message} details={details} />
          {stack && (
            <pre className="mt-6 w-full max-w-3xl overflow-x-auto rounded-lg bg-muted p-4 text-left text-xs">
              <code>{stack}</code>
            </pre>
          )}
        </div>
      </MainLayout>
    </FallbackI18nProvider>
  );
}

export const meta: Route.MetaFunction = ({ loaderData }) => {
  const siteName = "Dynamic Oil Tools";
  return [
    { title: buildPageTitle(siteName) },
    {
      name: "description",
      content:
        "Saudi industrial manufacturing company delivering high-performance oil & gas tools and equipment for the energy sector.",
    },
    ...(loaderData
      ? [{ htmlLang: localeHtmlLang[loaderData.locale] }, { dir: loaderData.direction }]
      : []),
  ];
};
