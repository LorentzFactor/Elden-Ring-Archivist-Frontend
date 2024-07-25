import React from 'react';
import {
    Link,
    Links,
    Meta,
    Outlet,
    Scripts,
    LiveReload,
  } from "@remix-run/react";
import type { LinksFunction, MetaFunction } from "@remix-run/node";
import stylesheet from "./tailwind.css?url";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

export const meta: MetaFunction = () => {
  return [
    { title: "The Silver Tear" },
    { content: "Find in-game items that answer your Elden Ring lore questions"},
    { charSet: "UTF-8"}
  ]
}
  
  export default function App() {
    return (
      <html>
        <head>
          <link
            rel="icon"
            href="data:image/x-icon;base64,AA"
          />
          <Meta />
          <Links />
        </head>
        <body className="overscroll-contain">
          <div className="bg-zinc-300 overscroll-contain">
          <h1 className="sticky top-0 text-3xl font-bold bg-zinc-800 text-white p-4 shadow-md w-full z-50">
            The Silver Tear
          </h1>
            <div className="static min-h-screen">
              <Outlet />
            </div>
            <div className="relative bg-zinc-800 text-white w-screen bottom-0 h-12 p-4 m-0 shadow-md  flex justify-center items-center">
              <p className="flex gap-2 text-lg">
                <Link className="hover:text-gray-300" to="/search">Search</Link>
                <span>|</span>
                <Link className="hover:text-gray-300" to="/about">About</Link>
              </p>
            </div>
          </div>
          <Scripts />
          <LiveReload />
        </body>
      </html>
    );
  }
  