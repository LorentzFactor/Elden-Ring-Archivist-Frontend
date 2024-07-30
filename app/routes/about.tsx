import React from 'react';
import GitHubLink from '../components/GitHubLink';
import { MetaFunction } from '@remix-run/react';

export const meta: MetaFunction = () => {
    return [
      { title: "About" },
      { content: "About The Silver Tear"}
    ]
  }


const About = () => {
    return (
        <div className="flex flex-col max-w-4xl mx-auto px-5 py-1  bg-zinc-100 min-h-screen divide-y-2 divide-zinc-500">
            <div className="content">
                <h1 className="text-3xl font-bold text-zinc-800 mb-4">About</h1>
                <p className="text-lg text-zinc-600">
                    This is a personal project developed by <GitHubLink>@LorentzFactor</GitHubLink> (aka Colman Bouton),
                    with the goal of providing an effective way to test and develop lore theories you might have about the game Elden Ring.
                    Simply enter a (natural language) question about the lore, and the search engine will return in-game items that are most likely to provide answers. 
                </p>
            </div>
            <div className="content">
                <h1 className="text-2xl font-bold text-zinc-800 mt-4">Contribute</h1>
                <p className="text-lg text-zinc-600">
                    If you think this is a cool project and want to contribute, feel free to check out the source code 
                    at <GitHubLink>LorentzFactor/Elden-Ring-Archivist-Frontend</GitHubLink> (everything that makes up this site) and <GitHubLink>LorentzFactor/Elden-Ring-Archivist</GitHubLink> (data science component).
                    You can say hi 👋 <a href="https://github.com/LorentzFactor/Elden-Ring-Archivist-Frontend/discussions/15" className="text-sky-500 hover:text-sky-700 transition duration-300">here</a>.
                </p>
            </div>
        </div>
    )
}; 

export default About;