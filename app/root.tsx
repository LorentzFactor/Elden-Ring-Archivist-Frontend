import React from 'react';
import {
    Link,
    Links,
    Meta,
    Outlet,
    Scripts,
  } from "@remix-run/react";
import type { LinksFunction, MetaFunction } from "@remix-run/node";
import stylesheet from "./tailwind.css";

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
        <body className="bg-gray-100 p-10">
          <h1 className="text-3xl font-bold">The Silver Tear</h1>
          <div>
            <Outlet />
          </div>
          <footer className="mx-auto bg-gray-800 text-white py-6">
            <div className="flex justify-center space-x-6">
              <Link className="mx-auto" to="/search"> Search </Link>
              <Link className="mx-auto" to="/about"> About </Link>
            </div>
          </footer>
          <Scripts />
        </body>
      </html>
    );
  }
  