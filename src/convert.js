/**
 * @description Asynchronous image convert script.
 * 
 * @description It can read files from any directory to convert them with Imagick convert command. It can copy converted files to 
 * any selected directory.
 * 
 * @author Janos Vajda janos.vajda@tradeonly.com
 * @version 0.0.3 
 * @
 */

var converted_items = [];
var imagick_path='C:\\bin\\ImageMagick-6.8.9-10'; //ImageMagick path.
var uploaded_image_path='C:\\wamp\\images'; //Here are images which should be converted. 
var converted_image_path='C:\\wamp\\converted_images'; //Here will be converted images
var converting_timer_interval=1000; //default = 1 second

var fs = require('fs');
var path = require('path');

/**
 * Run external process.
 * @param string arg
 * @param object callback
 * @returns array, callback
 */
function convert(arg, callback) { //convert. Run external process.
    console.log('Converting: '+arg);
    fs.exists(arg, function (exists) { //Check whether file exists or not.
        var exec = require('child_process').exec;
        var basename=path.basename(arg, path.extname(arg));
        var commande='convert '+arg+' '+converted_image_path+'\\'+basename+'.jpg';
        exec(imagick_path+'\\'+commande, function callback(error, stdout, stderr){
            console.log('Error', error);
        });
    });
    setTimeout(function() {
            callback(arg);
  }, converting_timer_interval);
}

/*
 * @Final callback. Here is currently a simple console.log.
 * @todo it should be any logging.
 */
function final() { 
    console.log('Converted items', converted_items); 
}

/**
 * Collecting images in the directory.
 * @param string dir
 * @param object done
 */
var directory_walking = function(dir, done) {
  var results = [];

fs.readdir(dir, function(err, list) {
    if (err) return done(err);
    var pending = list.length;
    if (!pending) return done(null, results);
    list.forEach(function(file) {
      file = dir + '/' + file;
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          directory_walking(file, function(err, res) {
            results = results.concat(res);
            if (!--pending) done(null, results);
          });
        } 
        else {
          results.push(file);
          if (!--pending) done(null, results);
        }
      });
    });
  });
};


/**
 * Process collected images.
 * @param object err
 * @param object results
 */
directory_walking(uploaded_image_path, function(err, results) {
  if (err) throw err;
    results.forEach(function(item) {
      convert(item, function(filename){
        converted_items.push(filename);
        if(converted_items.length == results.length) {
          final();
        }
      })
    });
});