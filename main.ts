import axios from "axios"
import cheerio from "cheerio"

/*
in the browser

const posts = document.querySelectorAll('.posts li a')
const s = [...posts].filter(p => p.href.includes('series'))
let series = []
s.forEach(s => series.push(s.href))

then series in the console and copy object

*/
// Last one was 
// "https://icewolfchastity.blogspot.com/2021/01/4971-to-4975-series.html",

import { exec } from 'child_process'
import { fstat, mkdir } from "fs"
const DOWNLOAD_DIR = './downloads'

function downloadFile(file_url:string, dl_path:string) {
  const wget = 'wget -P ' + dl_path + ' ' + 'http:' + file_url
  exec(wget, function(err, stdout, stderr) {
    if (err) throw err;
  })
};

async function getStory(url:string) {
  const html = await axios.get(url)
  const $ = cheerio.load(html.data)
  
  const postTitle = $('.post-title').text()
  const images = $('div.separator a')
  const dl_path = `"${DOWNLOAD_DIR}/${postTitle.trim()}"`

  mkdir(dl_path, () => {})
  images.each((i, img) => downloadFile(img.attribs.href, dl_path))
}

async function main(){

}

main()