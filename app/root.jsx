import {
    Link,
    Links,
    Meta,
    Outlet,
    Scripts,
  } from "@remix-run/react";
  
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
        <body>
          <h1>The Silver Tear</h1>
          <Outlet />
            <nav>
                <Link to="/search"> Search | </Link>
                <Link to="/about"> About </Link>
            </nav>
          <Scripts />
        </body>
      </html>
    );
  }
  