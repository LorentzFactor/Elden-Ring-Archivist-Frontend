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
import bannerimage from "./assets/silver_tear.webp";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
  { rel: "icon", href: favicon, type: "image/x-icon" },
];

  export default function App() {
    return (
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="google-site-verification" content="ntWWyoqDy-ijf2kcjbyXr_IFNfD86KOSxzoFvBwgrJY" />
          <meta charSet="utf-8" />
          <Meta />
          <Links />
          <script 
            dangerouslySetInnerHTML={{__html:`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-LH21TD322X');
          `}}></script>
        </head>
        <body className="overscroll-contain">
          <header className="sticky top-0 bg-zinc-800 p-4 shadow-md w-full z-50 flex flex-row items-center space-x-4">
            <img src={bannerimage} alt="The Silver Tear Banner" className="max-h-20" />
            <Link prefetch="render" to="/search" className="text-4xl font-bold bg-transparent text-white hover:text-zinc-200 transition-transform hover:scale-105">The Silver Tear</Link>
            <div className="grow place-self-end pb-0 text-right">
              <Link prefetch="hover" to="/about" className=" text-2xl bg-transparent text-violet-400 hover:text-zinc-200 ">About</Link>
            </div>
          </header>
          <div className="static min-h-screen">
            <Outlet />
          </div>
          <div className="relative bg-zinc-800 text-violet-400 w-screen bottom-0 h-12 p-4 m-0 shadow-md flex justify-center items-center">
            <p className="flex gap-2 text-lg">
              <Link className="hover:text-gray-300" to="/search">Search</Link>
              <span className="text-zinc-100">|</span>
              <Link className="hover:text-gray-300" to="/about">About</Link>
            </p>
          </div>
          <Scripts />
          <ScrollRestoration />
          <LiveReload />
        </body>
      </html>
    );
  }
  