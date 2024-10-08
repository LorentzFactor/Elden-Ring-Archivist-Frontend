import React from 'react';

const default_class = "display: inline-block text-sky-500 hover:text-sky-700 transition duration-300";
interface GitHubLinkProps {
    className?: string,
    children: string,
}

const GitHubLink = ({ className, children }: GitHubLinkProps) => {
    if (className === undefined) { className = default_class};

    let href: string = children;
    if (href.startsWith('@')) { href = href.slice(1) }; // trim @ from username if it exists
    href = `https://github.com/${href}`;

    // if this is a repo link (i.e. there is / in it), then we only display the repo name.
    if (children.includes('/')) {
        children = children.split('/').pop()!;
    }
    return <a href={href} className={className}>{children}</a>
}

export default GitHubLink;
