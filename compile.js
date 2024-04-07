const ts = require('typescript');
const fs = require('fs');

let files = ['types', 'algorithms', 'entities', 'engine', process.argv.length > 2 ? process.argv[2] : 'adventure_kingdom'];
let cont = [];

process.stdout.write(`${files[files.length-1]}.ts\t\t`);

async function watch() {
    let changed = -1;
    for(var i = 0; i < files.length; i++) {
        let tmp = (await fs.promises.readFile(`src/${files[i]}.ts`)).toString('utf8');
        if (tmp != cont[i]) {
            cont[i] = tmp;
            changed = i;
            break;
        }
    }
    if (changed != -1) {
        process.stdout.write(`${files[changed]}.ts\t\t`);
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
        let code = '';
        files.forEach((f,i) => code += cont[i].replace(/(import |export ).*/g, ''));
        const scriptjs = ts.transpileModule(code, options).outputText;
        const web = `<!DOCTYPE html><html><head><title>Adventure Kingdom</title><style>body{background-color:#000}canvas{position:fixed;left:0;top:0;width:100%;height:100%;object-fit:contain;image-rendering:pixelated;z-index:1}h1{z-index:2;opacity:0}</style></head><body><script>${scriptjs}</script></body></html>`
        await fs.promises.writeFile('index.html', web);
        process.stdout.write(`Success\n`);
        watch();
    } catch(e) {
        process.stdout.write(`Failed\n`);
    }
}

async function init() {
    try {
        for(var i = 0; i < files.length; i++) cont[i] = (await fs.promises.readFile(`src/${files[i]}.ts`)).toString('utf8');
        compile();
    } catch (err) {
        console.log('Error reading files: ', err);
        process.exit(1);
    }
}

init();