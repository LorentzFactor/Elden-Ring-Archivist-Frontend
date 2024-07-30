import React from 'react';

const default_class = "display: inline-block text-sky-500 hover:text-sky-700 transition duration-300";

const GitHubLink = ({className, children }) => {
    if (className === undefined) { className = default_class};
    let href: string = children;
    // trim @ from username if it exists
    if (href.startsWith('@')) {
        href = href.slice(1);
    }
    href = `https://github.com/${href}`;
    // if this is a repo link (i.e. there is / in it), then we only display the repo name.
    if (children.includes('/')) {
        children = children.split('/').pop();
    }
    return <a href={href} className={className}>{children}</a>
}

export default GitHubLink;
