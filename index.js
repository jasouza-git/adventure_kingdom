const ts = require('typescript');
const fs = require('fs');
const path = require('path');
const http = require('http');
//const prepack = require("prepack");

let folder = '';
let port = 8000;
process.argv.slice(2).forEach(a => {
    if (isNaN(a)) folder = a;
    else port = Number(a);
});
let files = ['game.ts'];
let cont = [];


async function watch() {
    let changed = -1, line = -1;
    for(var i = 0; i < files.length; i++) {
        let tmp = (await fs.promises.readFile(path.resolve('src',folder,files[i]))).toString('utf8');
        if (tmp != cont[i]) {
            let diff = [cont[i].split('\n'), tmp.split('\n')];
            for(let j = 0; j < diff[0].length; j++) if (diff[0][j] != diff[1][j]) {
                line = j;
                break;
            }
            if (line == -1) line = diff[0].length;
            cont[i] = tmp;
            changed = i;
            break;
        }
    }
    if (changed != -1) {
        let d = new Date();
        process.stdout.write(`* ${files[changed]} in line ${line+1} at ${d.getHours()}:${d.getMinutes()} `);
        compile();
    } else setTimeout(watch, 1000);
}

async function compile() {
    const options = {
        target: ts.ScriptTarget.ES5,
        module: ts.ModuleKind.ESNext,
        moduleResolution: ts.ModuleResolutionKind.Node10,
        strict: true,
        removeCmments: true
    };
    try {
        let code = [cont[0], ...cont[0].match(/import \{.*\} from ".*";/g)].reduce((code,match)=>code.replace(match, cont[files.indexOf(match.match(/(?<=import \{.*\} from ").*(?=";)/)[0])].replace(/(import |export |\/\*#\*\/ ).*/g, '')));
        const scriptjs = ts.transpileModule(code, options).outputText;
        //console.log(prepack.prepackSources([{filePath:'test.js',fileContents:scriptjs}],{}));
        const web = `<!DOCTYPE html><html><head><title>Adventure Kingdom</title><style>body{background-color:#000}canvas{position:fixed;left:0;top:0;width:100%;height:100%;object-fit:contain;image-rendering:pixelated;z-index:1}h1{z-index:2;opacity:0}</style></head><body><script>${scriptjs}</script></body></html>`
        await fs.promises.writeFile('index.html', web);
        process.stdout.write(`(Success)\n`);
        watch();
    } catch(e) {
        process.stdout.write(`(Failed ${e})\n`);
    }
}

async function init() {
    try {
        process.stdout.write(`* ${files[files.length-1]} `);
        cont.push((await fs.promises.readFile(`src/${folder}/game.ts`)).toString('utf8'));
        files.push(...cont[0].match(/(?<=import \{.*\} from ").*(?=";)/g)); //.map(x=>)
        for (var i = 1; i < files.length; i++) cont[i] = (await fs.promises.readFile(path.resolve('src',folder,files[i]))).toString('utf8');
        compile();
    } catch (err) {
        console.log('Error reading files: ', err);
        process.exit(1);
    }
}


http.createServer((req, res) => {
    let p = req.url == '/' ? 'index.html' : path.join(__dirname, 'asset', decodeURIComponent(req.url));
    fs.exists(p, e => {
        if (e) fs.createReadStream(p).pipe(res);
        else {
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('404 Not Found\n');
        }
    })
}).listen(port, () => {
    console.log('Hosting in', port);
    if (folder != '') init();
});
