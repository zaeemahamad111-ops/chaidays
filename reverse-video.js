const ffmpeg = require('ffmpeg-static');
const { spawn } = require('child_process');
const path = require('path');

const input = path.join(__dirname, 'public', 'hero.mp4');
const output = path.join(__dirname, 'public', 'hero-reversed.mp4');

console.log('Using ffmpeg path:', ffmpeg);
console.log('Reversing video... This may take a moment.');

const child = spawn(ffmpeg, [
  '-i', input,
  '-vf', 'reverse',
  '-an', // No audio
  '-y',  // Overwrite output
  output
]);

child.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

child.stderr.on('data', (data) => {
  // ffmpeg outputs progress to stderr
  process.stdout.write('.');
});

child.on('close', (code) => {
  console.log(`\nchild process exited with code ${code}`);
});
