/**
 * Created by feifei on 16/7/31.
 */

var fs = require('fs');
var path=require("path");

var OUT_PATH=path.join("build");
var ARTICLE_PATH=path.join("build","articles");

var remotePath = "./articles/";
var fileArr=[];


fs.readdir(ARTICLE_PATH,function(err,files){
    if(err){
        console.log(err);
        return;
    }

    var count = files.length;
    console.log(count);

    var results = {};
    files.forEach(function(filename){

        //filePath+"/"+filename不能用/直接连接，Unix系统是”/“，Windows系统是”\“
        fs.stat(path.join(ARTICLE_PATH,filename),function(err, stats){
            if (err) throw err;

            //文件
            if(stats.isFile()){
                //if(getdir(filename) == 'html'){
                    var newUrl=remotePath+filename;
                    fileArr.push(newUrl);
                    writeFile(fileArr);
                //}

            }else if(stats.isDirectory()){
                // console.log("%s is a directory文件目录", filename);

                var name = filename;
                readFile(path.join(ARTICLE_PATH,filename),name);
            }
        });
    });
});



function writeFile(data){
    var data = data.join("\n");
    fs.writeFile(OUT_PATH+"/"+"bloglist.txt",data+'\n',function(err){
        if(err) {
            throw err;
        }
        console.log("写入成功");
    });
}


function readFile(readurl,name){
    console.log(readurl+"/"+name);

    var name = name;
    fs.readdir(readurl,function(err,files){
        if(err){console.log(err);return;}

        files.forEach(function(filename){
            // console.log(path.join(readurl,filename));

            fs.stat(path.join(readurl,filename),function(err, stats){
                if (err) throw err;
                //是文件
                if(stats.isFile()){
                    var newUrl=remotePath+name+'/'+filename;
                    fileArr.push(newUrl);
                    writeFile(fileArr)
                    //是子目录
                }else if(stats.isDirectory()){
                    var dirName = filename;
                    readFile(path.join(readurl,filename),name+'/'+dirName);
                    //利用arguments.callee(path.join())这种形式利用自身函数，会报错
                    //arguments.callee(path.join(readurl,filename),name+'/'+dirName);
                }
            });
        });
    });
}
