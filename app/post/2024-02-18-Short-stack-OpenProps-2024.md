---
title: Short-stack OpenProps 2024
author: Craig Webb
date: 2024-09-08
tags: ['post', 'featured']
image: assets/images/conference.jpeg
imageAlt: Developer conference, standing room only
description: I first installed Short-stack OpenProps in 2022. The development build had problems with Terser and Rollup 3.0. This year I fixed it. 
templateEngineOverride: njk,md
---
<blockquote>
    <h4>ready to rat-tat rock & roll.</h4>
      <small><a href="https://www.youtube.com/watch?v=qjobBx2P6C0" rel="noopener noreferrer nofollow" target="_blank">Rip It Up / Ready Teddy</a></small>
</blockquote>
    <h3>Re-installing Short-Stack OpenProps in 2024</h3>

    I revisited Shortstack OpenProps as a potential portion of my design system.

    Hoping to get a clean installation, I found that dependency problems dating from 2022 persist. Rollup 3.0 had a peer dependency conflict with Rollup-plugin-terser.
    
    The latest Terser is not the same as Rollup-plugin-terser.

<h2>Dependencies</h2>
    <p>I updated caniuse.lite for Browsersync. The update conflicted with the Terser / Rollup peer dependency problem.</p>

    <h2>Solution Found:</h2>
    I did a search for &ldquo;Terser, Rollup-plugin-terser, and Rollup 3.0 dependency conflict&rdquo; and found a solution here: <a href="https://wilcovanes.ch/articles/peer-dependency-conflict-from-the-rollup-plugin-terser-package/" rel="noopener noreferrer nofollow" 
   target="_blank">Peer dependency conflict from the rollup-plugin-terser package, Feb 4, 2023</a></p>
    I followed directions and fixed the rollup/terser issue. I made detailed notes for myself.

    I looked for a cheet sheet for the OpenProps Custom Properties. I made my own. OpenProps is released as a minified, unreadable CSS within a NPM module. In order to get an unminified CSS it is necessary to go to the OpenProps Github repo, download the repo and extract the source CSS files.

    I did that. I&rsquo;ve added my own CSS file at the bottom of the index.css file to add my own styles. It will serve as my new pair of glasses. I will want to overide some of Adam's opinionated property declarations.

    Now that I have OpenProps installed locally I don't need the NPM module. I plan to go to the Github repo occasionally and download updates.
    
    <h2>Custom Property Libraries</h2>
    I want to try other custom property libraries. I'm looking for the custom property library that I want to follow. I am most interested in how custom properties are named.

    I also have a file full of basic old fashioned CSS stylesheets to test and use.

    Adam Argyle sent a note to me in 2022 suggesting that I try using Vite OpenProps instead of ShortStack OpenProps. Both Vite and Shortstack use Rollup. I plan to test the Vite system too.

