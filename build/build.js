/* @flow */
import fs from 'fs';
import { exec } from 'child_process';

const ROOT_PATH = __dirname + '/..';
const DIST_PATH = ROOT_PATH + '/dist';

function execPromise(cmd, options) : Promise<{ stdout: Buffer, stderr: Buffer }> {
    return new Promise((resolve, reject) => {
        exec(cmd, options, (err, stdout, stderr) => {
            if (err) {
                reject(err);
            } else {
                resolve({ stdout, stderr });
            }
        })
    });
}

function readFilePromise(path: string, encoding = 'utf-8') {
    return new Promise((resolve, reject) => {
        fs.readFile(path, encoding, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

function writeFilePromise(path: string, content: string, encoding = 'utf-8') {
    return new Promise((resolve, reject) => {
        console.log(path, content);
        fs.writeFile(path, content, encoding, (err) => {
            if (err) {
                reject(err);
            }

            resolve();
        });
    });
}

async function build() {
    console.log(`mkdir '${ROOT_PATH + '/dist'}'...`);
    fs.mkdirSync(ROOT_PATH + '/dist');
    console.log('compile');
    const result = await execPromise('babel --source-maps string --out-dir ./dist ./src', { cwd: ROOT_PATH });
    const packageString = await readFilePromise(ROOT_PATH + '/package.json', 'utf-8');

    const parsedPackage = JSON.parse(packageString);

    // delete parsedPackage.devDependencies;
    // delete parsedPackage.scripts;

    console.log('write new package');
    await writeFilePromise(DIST_PATH + '/package.json', JSON.stringify(parsedPackage, null, 8));
    await execPromise('npm pack', { cwd: DIST_PATH });
}

build().catch(err => console.log(err));
