import React from 'react';
import {
    Link,
    Links,
    Meta,
    Outlet,
    Scripts,
    LiveReload,
    ScrollRestoration
  } from "@remix-run/react";
import type { LinksFunction, MetaFunction } from "@remix-run/node";
import stylesheet from "./tailwind.css?url";
import favicon from "./assets/favicon.ico";
import bannerimage from "./assets/silver_tear.png";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
  { rel: "icon", href: favicon, type: "image/x-icon" },
];

export const meta: MetaFunction = () => {
  return [
    { title: "The Silver Tear" },
    { content: "Find in-game items that answer your Elden Ring lore questions"},
  ]
}
  
  export default function App() {
    return (
      <html>
        <head>
          <meta name="google-site-verification" content="ntWWyoqDy-ijf2kcjbyXr_IFNfD86KOSxzoFvBwgrJY" />
          <meta charSet="utf-8" />
          <Meta />
          <Links />
        </head>
        <body className="overscroll-contain">
          <header className="sticky top-0 bg-zinc-800 p-4 shadow-md w-full z-50 flex flex-row items-center justify-left space-x-4">
            <img src={bannerimage} alt="The Silver Tear Banner" className="max-h-20" />
            <Link prefetch="render" to="/search" className="text-4xl font-bold bg-transparent text-white hover:text-zinc-200 transition-transform hover:scale-105">The Silver Tear</Link>
          </header>
          <div className="static min-h-screen">
            <Outlet />
          </div>
          <div className="relative bg-zinc-800 text-white w-screen bottom-0 h-12 p-4 m-0 shadow-md flex justify-center items-center">
            <p className="flex gap-2 text-lg">
              <Link className="hover:text-gray-300" to="/search">Search</Link>
              <span>|</span>
              <Link className="hover:text-gray-300" to="/about">About</Link>
            </p>
          </div>
          <Scripts />
          <ScrollRestoration />
        </body>
      </html>
    );
  }
  