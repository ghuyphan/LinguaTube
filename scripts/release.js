#!/usr/bin/env node

/**
 * Controlled Release & Version Bump Script
 * Usage:
 *   node scripts/release.js patch           (e.g. 1.1.37 -> 1.1.38)
 *   node scripts/release.js minor           (e.g. 1.1.37 -> 1.2.0)
 *   node scripts/release.js major           (e.g. 1.1.37 -> 2.0.0)
 *   node scripts/release.js 1.2.0           (explicit version)
 *   node scripts/release.js patch --no-build (skips rebuilding functions)
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = path.resolve(__dirname, '..');
const pkgPath = path.join(rootDir, 'package.json');
const versionInfoPath = path.join(rootDir, 'src', 'app', 'data', 'version-info.json');

const args = process.argv.slice(2);
const target = args[0] || 'patch';
const skipBuild = args.includes('--no-build');

if (target === '--help' || target === '-h') {
    console.log(`
Usage: npm run release [patch|minor|major|<version>] [--no-build]

Options:
  patch       Bump patch version (e.g. 1.1.37 -> 1.1.38)
  minor       Bump minor version (e.g. 1.1.37 -> 1.2.0)
  major       Bump major version (e.g. 1.1.37 -> 2.0.0)
  <version>   Set explicit version (e.g. 1.2.0)
  --no-build  Skip running 'npm run build:functions'
`);
    process.exit(0);
}

// 1. Read current version metadata
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
const versionInfo = JSON.parse(fs.readFileSync(versionInfoPath, 'utf8'));

const currentVersion = versionInfo.version || pkg.version;
console.log(`Current version: ${currentVersion}`);

// 2. Compute new version
function bumpVersion(current, type) {
    const parts = current.split('.').map(n => parseInt(n, 10));
    if (parts.length !== 3 || parts.some(isNaN)) {
        throw new Error(`Invalid semver version: ${current}`);
    }

    if (type === 'patch') {
        parts[2] += 1;
    } else if (type === 'minor') {
        parts[1] += 1;
        parts[2] = 0;
    } else if (type === 'major') {
        parts[0] += 1;
        parts[1] = 0;
        parts[2] = 0;
    } else if (/^\d+\.\d+\.\d+(-[a-zA-Z0-9.]+)?$/.test(type)) {
        return type;
    } else {
        throw new Error(`Unrecognized bump type or invalid version: ${type}`);
    }
    return parts.join('.');
}

const newVersion = bumpVersion(currentVersion, target);
const today = new Date().toISOString().split('T')[0];

console.log(`Bumping to:      ${newVersion} (buildDate: ${today})\n`);

// 3. Update package.json
pkg.version = newVersion;
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
console.log(`✓ Updated package.json (${newVersion})`);

// 4. Update src/app/data/version-info.json
versionInfo.version = newVersion;
versionInfo.buildDate = today;
fs.writeFileSync(versionInfoPath, JSON.stringify(versionInfo, null, 2) + '\n');
console.log(`✓ Updated src/app/data/version-info.json (${newVersion}, ${today})`);

// 5. Rebuild Cloudflare Functions (unless skipped)
if (!skipBuild) {
    console.log('\nBuilding functions with new version metadata...');
    try {
        execSync('npm run build:functions', { stdio: 'inherit', cwd: rootDir });
        console.log('✓ Functions built successfully.');
    } catch (err) {
        console.error('Failed to build functions:', err.message);
        process.exit(1);
    }
}

console.log(`\n🎉 Release ${newVersion} prepared successfully!`);
console.log(`Remember to update 'highlights' in src/app/data/version-info.json if this release introduces notable user-facing features.`);
