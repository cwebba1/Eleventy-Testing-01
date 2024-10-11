---
layout: base.njk
title: post-one
author: Craig Webb
date: 2024-06-05
description: This is the first post.
image: assets/images/shitification.jpeg
tags: post
---
<p>I am post One. One is the lonliest number.</p>

markdown: (does not work)  
[index](/)
[Post Two](post2)<br>
[Post Three](post3)<br>

HTML w/ post in collections.post:
<nav>
<ul>
{% for post in collections.post %}
  <li class="snippet__title"><a href="{{root}}{{ post.url | url }}">{{ post.data.title }}</a></l1>
{% endfor %}
</ul>
</nav>
