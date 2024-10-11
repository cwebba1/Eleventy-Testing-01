---
layout: base.njk
title: post-two
author: Craig Webb
date: 2024-06-05
description: This is the second post.
image: assets/images/Open-to-Work.jpeg
tags: post
---
<nav>
<ul>
{% for post in collections.post %}
  <li class="snippet__title"><a href="{{root}}{{ post.url | url }}">{{ post.data.title }}</a></l1>
{% endfor %}
</ul>
</nav>

<h1>I am post Two. Two can be as bad as one it's the lonliest number since the number one.</h1>

Getting Eleventy to work requires coordinating multiple parts. There are NPM modules, Configuration files, JavaScript, HTML, CSS, Nunjucks and data files. 

Once the technical details are resolved it is necesary to build templates to target and style CSS.

Once it is working it is a breeze to write and add to.

Getting there is a bear.





