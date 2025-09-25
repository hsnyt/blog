import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import { ThemeToggle } from "./components/ThemeToggle";

import type { Route } from "./+types/root";
import "./app.css";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* CSS適用前に初期テーマを即時反映 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
            (function(){
              try {
                var stored = localStorage.getItem('theme');
                var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                var theme = stored || (prefersDark ? 'dark' : 'light');
                var root = document.documentElement;
                if(theme === 'dark') { root.classList.add('dark'); root.style.colorScheme='dark'; }
                else { root.classList.remove('dark'); root.style.colorScheme='light'; }
              } catch(_){}
            })();
          `,
          }}
        />
        <Meta />
        <Links />
      </head>
      <body className="font-sans text-gray-900 dark:text-gray-100">
        <div className="min-h-dvh flex flex-col">
          <header className="border-b border-gray-200 dark:border-gray-800">
            <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
              <a href="/" className="text-xl font-bold">
                My Blog
              </a>
              <nav className="flex gap-4 items-center text-sm">
                <a href="/" className="hover:underline">
                  Home
                </a>
                <a href="/categories" className="hover:underline">
                  Categories
                </a>
                <a href="#" className="hover:underline">
                  About
                </a>
                <ThemeToggle />
              </nav>
            </div>
          </header>
          <main className="max-w-4xl mx-auto px-4 py-8 flex-1">{children}</main>
          <footer className="border-t border-gray-200 dark:border-gray-800">
            <div className="max-w-4xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-3 gap-8 text-sm">
              <div>
                <div className="text-base font-semibold mb-2">About</div>
                <p className="text-gray-600 dark:text-gray-300 leading-6">
                  開発・学習メモを中心に、気づきや日々の記録を書いている個人ブログです。
                </p>
              </div>
              <div>
                <div className="text-base font-semibold mb-2">Links</div>
                <ul className="space-y-1 text-gray-600 dark:text-gray-300">
                  <li>
                    <a className="hover:underline" href="/">
                      Home
                    </a>
                  </li>
                  <li>
                    <a className="hover:underline" href="/posts/1">
                      Sample Post
                    </a>
                  </li>
                  <li>
                    <a className="hover:underline" href="/categories">
                      Categories
                    </a>
                  </li>
                  <li>
                    <a className="hover:underline" href="/rss.xml">
                      RSS（準備中）
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <div className="text-base font-semibold mb-2">Follow</div>
                <div className="flex items-center gap-4 text-gray-600 dark:text-gray-300">
                  <a
                    href="https://github.com/"
                    aria-label="GitHub"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-current"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="22"
                      height="22"
                      fill="currentColor"
                    >
                      <path d="M12 .5a12 12 0 0 0-3.79 23.4c.6.1.82-.25.82-.57v-2.2c-3.34.73-4.04-1.61-4.04-1.61-.55-1.41-1.34-1.78-1.34-1.78-1.1-.75.08-.73.08-.73 1.22.08 1.86 1.25 1.86 1.25 1.08 1.85 2.82 1.32 3.51 1.01.11-.8.42-1.32.77-1.63-2.67-.3-5.48-1.34-5.48-5.95 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.16 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.66 1.64.25 2.86.12 3.16.77.84 1.23 1.91 1.23 3.22 0 4.62-2.81 5.64-5.49 5.94.43.37.81 1.1.81 2.22v3.29c0 .32.21.68.83.56A12 12 0 0 0 12 .5Z" />
                    </svg>
                  </a>
                  <a
                    href="https://x.com/"
                    aria-label="X"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-current"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="22"
                      height="22"
                      fill="currentColor"
                    >
                      <path d="M17.53 3H20l-5.45 6.23L21.5 21h-6.18l-4.83-6.28L4.9 21H2.43l5.83-6.66L2.5 3h6.27l4.37 5.79L17.53 3Zm-1.08 16.2h1.68L7.64 4.7H5.86l10.59 14.5Z" />
                    </svg>
                  </a>
                  <a
                    href="/rss.xml"
                    aria-label="RSS"
                    className="hover:text-current"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="22"
                      height="22"
                      fill="currentColor"
                    >
                      <path d="M6.18 17.82a2.18 2.18 0 1 1-4.36 0 2.18 2.18 0 0 1 4.36 0ZM2 9.64v3.27a9.09 9.09 0 0 1 9.09 9.09h3.27C14.36 15.3 8.7 9.64 2 9.64Zm0-6.36v3.27c9.7 0 17.57 7.87 17.57 17.57h3.27C22.84 11.46 12.54 1.27 2 3.27Z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-800">
              <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between text-xs text-gray-500">
                <span>© {new Date().getFullYear()} My Blog</span>
                <a href="#" className="hover:underline">
                  Back to top
                </a>
              </div>
            </div>
          </footer>
        </div>
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
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
