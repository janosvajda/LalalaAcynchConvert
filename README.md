Node ImageMagick convert
========================

Asynchronous image convert script. It can collect images from any directory and can convert them with ImageMagick convert command. It also can copy converted images to any directory.

Usage
-----

There is a simple configuration in the file.

ImageMagick path:

var imagick_path='C:\\bin\\ImageMagick-6.8.9-10';


Here are images which should be converted:
var uploaded_image_path='C:\\wamp\\images';

Here will be converted images:
var converted_image_path='C:\\wamp\\converted_images'; 


So, You can customise it with these parameters. 

Run: node convert.js


Requirements
------------

Node.js 

It just use default Node.js libraries so it does not need any external lib.


Licence
---------

Copyright (c) 2014 Janos Vajda