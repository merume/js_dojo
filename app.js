var moneies={}
var HTTP = require('http');
var URL  = require('url');
var fs = require("fs");
var qs = require('querystring');
var okodukai=1000;

HTTP.createServer(function (req, res){
  response = res;
  console.log(req.url);
  if (req.url.match(/.html/)) {
    res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
    res.end(fs.readFileSync( '.' + req.url ));
  }
  if (req.url.match(/.css/)){
    res.writeHead(200, {'Content-Type':'text/css; charset=utf-8'});
    res.end(fs.readFileSync( '.' + req.url ));
  }
  if (req.url.match(/.js/)){
    res.writeHead(200, {'Content-Type':'text/javascript; charset=utf-8'});
    res.end(fs.readFileSync( '.' + req.url ));
  }

  switch(req.url) {
    case '/list':
    parameter(req,res,'list');
    break;
    case '/input':
    parameter(req,res,'input');
    break;
    default:
    res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
    res.end('HelloW Node.js');
    break;
  }

}).listen(8888);
console.log('Server runing at http://127.0.0.1:8888/');

function parameter(req,res,mode){
  if(req.method=='POST') {
    var body='';
    req.on('data', function (data) {
      body +=data;
    });
    req.on('end',function(){  
      var POST =  qs.parse(body);
      switch (mode){
        case 'list':
        list(POST,res);
        break;
        case 'input':
        input(POST,res);
        break;
        default:
        break;
      }
    });
  }
}

function list(params,res){
  // console.log('list');
  // console.log(params);
  // return_data = [];
  console.log(moneies);
  // for (var keyString in moneies) {
  //   return_data.push({keyString: moneies[keyString]});
  //   // console.log(keyString);

  // }
  
  // console.log(return_data);
  // var data={};
  res.writeHead(200, {'Content-Type':'application/json; charset=utf-8'});
  res.end(JSON.stringify(moneies));
}

function input(params,res){
  moneies[params.date] = params.money;
  console.log(moneies);
  res.writeHead(200, {'Content-Type':'application/json; charset=utf-8'});
  res.end(JSON.stringify({'response':1}));
}
