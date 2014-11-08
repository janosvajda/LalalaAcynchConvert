/**
 * @description Asynchronous image convert script.
 * 
 * @description It can read files from any directory to convert them with Imagick convert command. It can copy converted files to 
 * any selected directory.
 * 
 * @author Janos Vajda janos.vajda@tradeonly.com
 * @version 0.0.3
 */

var converted_items = [];
var imagick_path='C:\\bin\\ImageMagick-6.8.9-10'; //ImageMagick path.
var uploaded_image_path='C:\\wamp\\images'; //Here are images which should be converted. 
var converted_image_path='C:\\wamp\\converted_images'; //Here will be converted images
var converting_timer_interval=1000; //default = 1 second
var convert_options = '-resize 50%'; //convert options. This example reduce the converted image size.
var converted_format='jpg'; //converted file format
var delete_after_convert=false; //deleting originally images after the converting

var fs = require('fs');
var path = require('path');

var debug = false; //debug mode


/**
 * Run external process.
 * @param string arg
 * @param object callback
 * @returns array, callback
 */
function convert(arg, callback) { //convert. Run external process.
    var fileWithPath=arg;
    if (debug) console.log('Converting: '+fileWithPath);
    fs.exists(fileWithPath, function (exists) { //Check whether file exists or not.
        var exec = require('child_process').exec;
        var basename=path.basename(fileWithPath, path.extname(fileWithPath));
        var commande='convert '+fileWithPath+' '+convert_options+' '+converted_image_path+'\\'+basename+'.'+converted_format;

        if (debug) console.log(commande);

        //run external command
        exec(imagick_path+'\\'+commande, function callback(error, stdout, stderr){
            if (debug) console.log('Error', error);
            if (!error){
                if (delete_after_convert){
                    fs.unlink(fileWithPath, function (err) {
                      if (err) throw err;
                      if (debug) console.log('successfully deleted'+fileWithPath);
                    });
                }
            } else throw error;
        });
    });

    //timer -  parallel control flow
    setTimeout(function() {
            callback(fileWithPath);
  }, converting_timer_interval);
}


/*
 * @Final callback. Here is currently a simple console.log.
 * @todo it should be any logging.
 */
function final() { 
    if (debug) console.log('Converted items', converted_items); 
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