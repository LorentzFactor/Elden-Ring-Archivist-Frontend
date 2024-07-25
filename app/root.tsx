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
          <h1 className="sticky text-3xl font-bold top">The Silver Tear</h1>
          <div className="static min-h-screen">
            <Outlet />
          </div>
          <div className="relative bg-zinc-800 text-white w-screen bottom-0 h-12 p-0 m-0">
            <div className="flex absolute size-12 inset-x-1/2">
                <Link className="size-min pr-4" to="/search">Search</Link>
                <Link className=" size-min pl-4" to="/about">About</Link>
            </div>
          </div>
          </div>
          <Scripts />
          <LiveReload />
        </body>
      </html>
    );
  }
  