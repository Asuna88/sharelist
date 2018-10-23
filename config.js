const fs = require('fs')
const os = require('os')
const config_path = process.cwd() +'/cache/config.json'
const port = process.env.PORT || 33001

const providers = [
  {name:'GoogleDrive',code:'gd'},
  {name:'OneDrive',code:'od'},
  {name:'VirtualFile',code:'xd'},
  {name:'LocalFileSystem',code:'ld'},
]


var data = {
  port , 

  enabled_proxy : 0 ,

  enabled_proxy_header: 0 ,

  cache_refresh_dir:15 * 60 * 1000,

  cache_refresh_file: 5 * 60 * 1000
}

const save = async (d) => {

  for(var i in d){
    data[i] = d[i]
  }

  let str = JSON.stringify( data )

  return new Promise((resolve, reject) => {
    fs.writeFile(config_path, str, function(err) {
      if (err) {
        console.log(err,'save config error')
      } else {
        console.log('save config success')
      }
      resolve(true)
    })
  })
}

const installed = () => data.token && data.path

const getTitle = () => data.title || 'ShareList'


try{
  let cfg = fs.readFileSync(config_path,'utf-8');  
  if(cfg){
    cfg = JSON.parse(cfg)
    for(var i in cfg){
      data[i] = cfg[i]
    }
  }
  console.log('Load config from file')
}catch(e){

}


module.exports = {
 data, save , installed , port , providers , getTitle
}