Node ImageMagick convert.
=========================

Asynchronous image convert script. It can collect images from any directory and can convert them with ImageMagick convert command. It also can copy converted images to any customised directory.

Usage
-----

<?php

There is a simple configuration in the file.

var imagick_path='C:\\bin\\ImageMagick-6.8.9-10'; //ImageMagick path.
var uploaded_image_path='C:\\wamp\\images'; //Here are images which should be converted. 
var converted_image_path='C:\\wamp\\converted_images'; //Here will be converted images
var converting_timer_interval=1000; //default = 1 second

You can customise it with these parameters. 

Run: node convert.js


Requirements
------------

Node.js 

It just use default Node.js libraries so it does not need any external lib.


Licence
---------

Copyright (c) 2014 Janos Vajda