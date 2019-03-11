// const debug = require('debug')('worker');
const fs = require('fs');
const path = require('path');

const inputPath = './input';
const hbjs = require('handbrake-js')

const videoExtensions = ['.avi', '.mkv', '.mp4'];

console.log('Reading folders from ' + inputPath);
const dirs = fs.readdirSync(inputPath);
for (let i=0; i<dirs.length; i++) {
    if (dirs[i].indexOf('.') === 0) {
        continue;
    }
    const dir = inputPath + '/' + dirs[i];
    const metaContent = fs.readFileSync(dir + '/meta.json');
    const meta = JSON.parse(metaContent);
    console.log('Reading files from ' + dir);
    const files = fs.readdirSync(dir);
    const videoFiles = files.filter(function(file) {
        return videoExtensions.indexOf(path.extname(file).toLowerCase()) > -1;
    });
    hbjs.spawn({
        input: dir + '/' + videoFiles[0],
        output: dir + '/' + videoFiles[0] + '.mp4', 
        encoder: 'x264',
        quality: 23,
        rate: 30,
        audio: 1,
        aencoder: 'aac',
        maxHeight: 1920,
        maxWidth: 1080,
    })
    .on('error', err => {
        console.log(err);
    })
    .on('progress', progress => {
        console.log(
            progress
        )
    })
}
