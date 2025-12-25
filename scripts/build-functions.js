const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

// Find all JS files in a directory (recursive)
function findJsFiles(dir) {
    const entries = [];
    if (!fs.existsSync(dir)) return entries;

    const items = fs.readdirSync(dir, { withFileTypes: true });
    for (const item of items) {
        const fullPath = path.join(dir, item.name);
        if (item.isDirectory() && item.name !== '_shared' && item.name !== 'node_modules') {
            entries.push(...findJsFiles(fullPath));
        } else if (item.name.endsWith('.js')) {
            entries.push(fullPath);
        }
    }
    return entries;
}

// Copy directory recursively
function copyDir(src, dest) {
    if (!fs.existsSync(src)) return;
    fs.mkdirSync(dest, { recursive: true });
    for (const item of fs.readdirSync(src, { withFileTypes: true })) {
        const srcPath = path.join(src, item.name);
        const destPath = path.join(dest, item.name);
        if (item.isDirectory()) {
            copyDir(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

async function build() {
    const srcDir = 'functions-src';
    const outDir = 'functions';

    // Ensure source directory exists (first run: rename functions to functions-src)
    if (!fs.existsSync(srcDir) && fs.existsSync(outDir)) {
        console.log('First run: Moving functions/ to functions-src/');
        fs.renameSync(outDir, srcDir);
    }

    if (!fs.existsSync(srcDir)) {
        console.error('Error: functions-src/ directory not found');
        process.exit(1);
    }

    // Clean output
    if (fs.existsSync(outDir)) {
        fs.rmSync(outDir, { recursive: true });
    }
    fs.mkdirSync(outDir);

    // Copy _shared files (not bundled)
    console.log('Copying _shared files...');
    copyDir(`${srcDir}/_shared`, `${outDir}/_shared`);

    // Find and bundle entry points
    const entryPoints = findJsFiles(srcDir);
    console.log(`Bundling ${entryPoints.length} functions...\n`);

    let success = 0;
    let failed = 0;

    for (const entry of entryPoints) {
        const outfile = entry.replace(srcDir, outDir);
        fs.mkdirSync(path.dirname(outfile), { recursive: true });

        try {
            await esbuild.build({
                entryPoints: [entry],
                bundle: true,
                format: 'esm',
                platform: 'browser',
                target: 'es2022',
                outfile,
                external: ['../_shared/*', '../../_shared/*'],
                minify: false,
                conditions: ['worker', 'browser', 'import', 'default'],
                mainFields: ['browser', 'module', 'main'],
            });
            console.log(`✓ ${entry.replace(srcDir + '/', '')}`);
            success++;
        } catch (e) {
            console.error(`✗ ${entry}: ${e.message}`);
            failed++;
        }
    }

    console.log(`\n${success} succeeded, ${failed} failed`);
    if (failed > 0) process.exit(1);
}

build().catch(e => {
    console.error(e);
    process.exit(1);
});
