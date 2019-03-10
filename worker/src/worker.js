// const debug = require('debug')('worker');
const fs = require('fs');
const path = require('path');

const inputPath = './input';
const hbjs = require('handbrake-js')

const videoExtensions = ['.avi', '.mkv', '.mp4'];

const options = {
};

console.log('Reading folders from ' + inputPath);
const dirs = fs.readdirSync(inputPath);
for (let i=0; i<dirs.length; i++) {
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
        preset: 'Normal'
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
