//https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction/
var myPort = 8080;//Set pot to one not used on your box

var fs = require("fs")
var http = require("http");

var request = require("request"), zlib = require("zlib");

var headers = {
    "Accept-Encoding": "gzip"
};



console.log("Starting server...")
var server = http.createServer(function(req, resp){
    console.log("Request received. ");
    var url = req.url;
    var fileLoc = "test/index.html";
    var id = false;
    var mime_type = "text/html";
    //console.log(req.url);resp.end();return;
    if( url.indexOf("?") > 0 ){
        //get url param and change file based on param or url
        var param = url.split("?");
        if (param.length > 1) {
            param = param[1].split("&");
            param = param[0].split("=");
            if (param.length > 1) {
                id = param[1];
            }
        }
        fileLoc = "test/sections/"+id+".html";
        //mime_type = "application/json";
    }else{
        url.split("simple-server\\").join("");
        if( url.indexOf(".css") > 0 ){
            fileLoc = url;
            if (url.substring(0, 1) == "/") {
                fileLoc = url.substring(1);
            }
            mime_type = "text/css";
        }else if( req.url.indexOf(".scss") > 0 ){
            fileLoc = url;
            if (url.substring(0, 1) == "/") {
                fileLoc = url.substring(1);
            }
            mime_type = "text/css";
        }else if( req.url.indexOf(".js") > 0 ){
            fileLoc = url;
            if (url.substring(0, 1) == "/") {
                fileLoc = url.substring(1);
            }
            mime_type = "application/javascript";
        }else if( req.url.indexOf(".svg") > 0 ){
            fileLoc = url;
            if (url.substring(0, 1) == "/") {
                fileLoc = url.substring(1);
            }
            mime_type = "image/svg+xml";
        }else if( req.url.indexOf(".png") > 0 ){
            fileLoc = url;
            if (url.substring(0, 1) == "/") {
                fileLoc = url.substring(1);
            }
            mime_type = "image/png";
        }else if( req.url.indexOf(".jpg") > 0 ){
            fileLoc = url;
            if (url.substring(0, 1) == "/") {
                fileLoc = url.substring(1);
            }
            mime_type = "image/jpg";
        }else if( req.url.indexOf(".json") > 0 ){
            fileLoc = url;
            if (url.substring(0, 1) == "/") {
                fileLoc = url.substring(1);
            }
            mime_type = "application/json";
        }
    }
    fs.readFile(fileLoc, "utf8", function(err, data) {
        var raw = fs.createReadStream(fileLoc);
        var acceptEncoding = req.headers["accept-encoding"];
        if (err) {
            console.log(err);
        }
        else {
            //console.log(data);
            //resp.statusCode = 200;
            //resp.setHeader("Content-Type", mime_type);
            //resp.setHeader("content-encoding", "deflate");
            //resp.setHeader("content-encoding", "gzip");

            if (acceptEncoding.match(/\bdeflate\b/)) {
                resp.writeHead(200, { "content-encoding": "deflate" , "Content-Type": mime_type + '; charset=utf-8' });
                raw.pipe(zlib.createDeflateRaw()).pipe(resp);
            } else if (acceptEncoding.match(/\bgzip\b/)) {
                resp.writeHead(200, { "content-encoding": "gzip" , "Content-Type": mime_type + '; charset=utf-8' });
                raw.pipe(zlib.createGzip()).pipe(resp);
            } else {
                resp.writeHead(200, {"Content-Type": mime_type + '; charset=utf-8'});
                raw.pipe(resp);
            }
        }
    });
}).listen(myPort);
