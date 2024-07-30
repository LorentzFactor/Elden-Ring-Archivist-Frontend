import React from 'react';
import { MetaFunction } from '@remix-run/react';

export const meta: MetaFunction = () => {
    return [
      { title: "About" },
      { content: "About The Silver Tear"}
    ]
  }

const About = () => {
    return (
        <div className="max-w-4xl mx-auto p-5">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">About</h1>
            <p className="text-lg text-gray-600">
                This is a personal project by <a href="https://github.com/LorentzFactor" className="text-blue-500 hover:text-blue-700 transition duration-300">@LorentzFactor</a> (aka Colman Bouton).
            </p>
        </div>
    )
};

export default About;