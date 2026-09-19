import fs from 'node:fs';
import path from 'node:path';

const REG_DIR = path.resolve('node_modules/@mingcute/icons/dist/styles/core-regular');
const FILL_DIR = path.resolve('node_modules/@mingcute/icons/dist/styles/core-filled');

function loadIcon(dir, name) {
  const file = path.join(dir, `${name}.js`);
  if (!fs.existsSync(file)) {
    throw new Error(`MingCute icon not found: ${file}`);
  }
  const content = fs.readFileSync(file, 'utf8');
  const match = content.match(/=\s*(\{[\s\S]*?\});/);
  if (!match) throw new Error(`Could not parse JSON from ${file}`);
  return JSON.parse(match[1]);
}

/**
 * 100% Official MingCute Icons Mapping for all 121 UI Icons in Voca
 * Every icon maps directly to an official MingCute vector in @mingcute/icons.
 */
const mingCuteMap = {
  // Navigation & Media Controls
  'play': loadIcon(REG_DIR, 'play'),
  'pause': loadIcon(REG_DIR, 'pause'),
  'skip-back': loadIcon(REG_DIR, 'skip-previous'),
  'skip-forward': loadIcon(REG_DIR, 'skip-forward'),
  'rewind': loadIcon(REG_DIR, 'rewind-backward-10'),
  'fast-forward': loadIcon(REG_DIR, 'rewind-forward-10'),
  'volume-2': loadIcon(REG_DIR, 'volume'),
  'volume-x': loadIcon(REG_DIR, 'volume-mute'),
  'volume-1': loadIcon(REG_DIR, 'volume'),
  'sun': loadIcon(REG_DIR, 'sun'),
  'moon': loadIcon(REG_DIR, 'moon'),
  'search': loadIcon(REG_DIR, 'search'),
  'plus': loadIcon(REG_DIR, 'add'),
  'plus-circle': loadIcon(REG_DIR, 'add-circle'),
  'check': loadIcon(REG_DIR, 'check'),
  'x': loadIcon(REG_DIR, 'close'),
  'trash-2': loadIcon(REG_DIR, 'delete-2'),
  'upload': loadIcon(REG_DIR, 'upload'),
  'download': loadIcon(REG_DIR, 'download'),
  'file-text': loadIcon(REG_DIR, 'document-3'),
  'book-open': loadIcon(REG_DIR, 'book-6'),
  'book-open-filled': loadIcon(FILL_DIR, 'book-6'),
  'settings': loadIcon(REG_DIR, 'settings-3'),
  'chevron-down': loadIcon(REG_DIR, 'down'),
  'external-link': loadIcon(REG_DIR, 'external-link'),
  'loader': loadIcon(REG_DIR, 'loading-3'),
  'alert-circle': loadIcon(REG_DIR, 'warning'),
  'info': loadIcon(REG_DIR, 'information'),
  'bookmark': loadIcon(REG_DIR, 'bookmark'),
  'bookmark-plus': loadIcon(REG_DIR, 'bookmark-add'),
  'bookmark-filled': loadIcon(FILL_DIR, 'bookmark'),
  'repeat': loadIcon(REG_DIR, 'repeat'),
  'repeat-1': loadIcon(REG_DIR, 'repeat-one'),
  'languages': loadIcon(REG_DIR, 'translate-2'),
  'subtitles': loadIcon(REG_DIR, 'subtitle'),
  'captions': loadIcon(REG_DIR, 'subtitle'),
  'subtitles-ai': loadIcon(REG_DIR, 'translate-2-ai'),
  'captions-ai': loadIcon(REG_DIR, 'translate-2-ai'),
  'video': loadIcon(REG_DIR, 'video'),
  'graduation-cap': loadIcon(REG_DIR, 'mortarboard'),
  'graduation-cap-filled': loadIcon(FILL_DIR, 'mortarboard'),
  'rotate-ccw': loadIcon(REG_DIR, 'refresh-anticlockwise-1'),
  'shuffle': loadIcon(REG_DIR, 'shuffle'),
  'refresh-cw': loadIcon(REG_DIR, 'refresh-1'),
  'chevron-left': loadIcon(REG_DIR, 'left'),
  'chevron-right': loadIcon(REG_DIR, 'right'),
  'chevron-up': loadIcon(REG_DIR, 'up'),
  'chevrons-up': loadIcon(REG_DIR, 'arrows-up'),
  'chevrons-down': loadIcon(REG_DIR, 'arrows-down'),
  'arrow-left': loadIcon(REG_DIR, 'arrow-left'),
  'arrow-right': loadIcon(REG_DIR, 'arrow-right'),
  'layers': loadIcon(REG_DIR, 'layers'),
  'sparkles': loadIcon(REG_DIR, 'ai'),
  'wand': loadIcon(REG_DIR, 'magic-1'),
  'play-circle': loadIcon(REG_DIR, 'play-circle'),
  'play-circle-filled': loadIcon(FILL_DIR, 'play-circle'),
  'eye': loadIcon(REG_DIR, 'eye'),
  'eye-off': loadIcon(REG_DIR, 'eye-close'),
  'type': loadIcon(REG_DIR, 'font-size'),
  'log-out': loadIcon(REG_DIR, 'exit'),
  'log-in': loadIcon(REG_DIR, 'enter-door'),
  'maximize': loadIcon(REG_DIR, 'fullscreen'),
  'minimize': loadIcon(REG_DIR, 'minimize'),
  'miniplayer': loadIcon(REG_DIR, 'miniplayer'),
  'expand': loadIcon(REG_DIR, 'fullscreen'),
  'fullscreen': loadIcon(REG_DIR, 'fullscreen'),
  'fullscreen-exit': loadIcon(REG_DIR, 'fullscreen-exit'),
  'globe': loadIcon(REG_DIR, 'globe'),
  'user': loadIcon(REG_DIR, 'user-1'),
  'google': loadIcon(REG_DIR, 'google'),
  'clock': loadIcon(REG_DIR, 'time'),
  'history': loadIcon(REG_DIR, 'history'),
  'heart': loadIcon(REG_DIR, 'heart'),
  'heart-filled': loadIcon(FILL_DIR, 'heart'),
  'cloud': loadIcon(REG_DIR, 'cloud'),
  'star': loadIcon(REG_DIR, 'star'),
  'star-filled': loadIcon(FILL_DIR, 'star'),
  'fire': loadIcon(FILL_DIR, 'fire'),
  'trophy': loadIcon(REG_DIR, 'trophy'),
  'medal': loadIcon(REG_DIR, 'medal'),
  'gift': loadIcon(REG_DIR, 'gift'),
  'diamond': loadIcon(REG_DIR, 'diamond-2'),
  'crown': loadIcon(REG_DIR, 'vip-2'),
  'party-popper': loadIcon(REG_DIR, 'celebrate'),
  'smile': loadIcon(REG_DIR, 'happy'),
  'target': loadIcon(REG_DIR, 'aiming-2'),
  'zap': loadIcon(REG_DIR, 'flash'),
  'snowflake': loadIcon(REG_DIR, 'snowflake'),
  'more-horizontal': loadIcon(REG_DIR, 'more-1'),
  'more-horizontal-filled': loadIcon(FILL_DIR, 'more-1'),
  'more-vertical': loadIcon(REG_DIR, 'more-2'),
  'list': loadIcon(REG_DIR, 'list-check'),
  'list-video': loadIcon(REG_DIR, 'playlist'),
  'list-video-filled': loadIcon(FILL_DIR, 'playlist'),
  'list-plus': loadIcon(REG_DIR, 'playlist-2'),
  'share': loadIcon(REG_DIR, 'share-2'),
  'link': loadIcon(REG_DIR, 'link'),
  'lock': loadIcon(REG_DIR, 'lock'),
  'grip-vertical': loadIcon(REG_DIR, 'dots'),
  'headphones': loadIcon(REG_DIR, 'headphone-2'),
  'clipboard-check': loadIcon(REG_DIR, 'file-check'),
  'coffee': loadIcon(REG_DIR, 'teacup'),
  'bell': loadIcon(REG_DIR, 'notification'),
  'mic': loadIcon(REG_DIR, 'mic'),
  'mic-off': loadIcon(REG_DIR, 'mic-off'),
  'keyboard': loadIcon(REG_DIR, 'keyboard'),
  'send': loadIcon(REG_DIR, 'send'),
  'check-circle': loadIcon(REG_DIR, 'check-circle'),
  'slash': loadIcon(REG_DIR, 'forbid-circle'),
  'lightbulb': loadIcon(REG_DIR, 'bulb'),
  'leaf': loadIcon(REG_DIR, 'leaf'),
  'box': loadIcon(REG_DIR, 'box'),
  'droplet': loadIcon(REG_DIR, 'drop'),
  'copy': loadIcon(REG_DIR, 'copy'),
  'speedometer': loadIcon(REG_DIR, 'dashboard'),
  'timer': loadIcon(REG_DIR, 'stopwatch'),
  'ruby-text': loadIcon(REG_DIR, 'translate'),
  'sparkle-text': loadIcon(REG_DIR, 'book-6-ai'),
  'chart-bar': loadIcon(FILL_DIR, 'chart-bar-2'),
  'brain': loadIcon(REG_DIR, 'brain'),
  'cards': loadIcon(REG_DIR, 'documents'),
  'share-ios': loadIcon(REG_DIR, 'upload-2')
};

function renderElement(el) {
  const attrs = Object.entries(el.attributes || {})
    .map(([k, v]) => `${k}="${v}"`)
    .join(' ');
  return `    <${el.tag} ${attrs} />`;
}

const typeFilePath = path.resolve('src/app/shared/components/icon/icon.component.ts');
const typeContent = fs.readFileSync(typeFilePath, 'utf8');
const match = typeContent.match(/export type IconName =\s*([\s\S]*?);/);
const names = match[1].replace(/\/\/.*$/gm, '').split('|').map(s => s.trim().replace(/['"]/g, '')).filter(Boolean);

let svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="display: none;">\n`;

for (const name of names) {
  const icon = mingCuteMap[name];
  if (!icon) {
    throw new Error(`Missing MingCute icon mapping for IconName: ${name}`);
  }
  svg += `  <symbol id="${name}" viewBox="0 0 24 24">\n`;
  for (const el of icon.elements) {
    if (name === 'loader' && el.tag === 'circle') el.attributes.class = 'spinner-track';
    if (name === 'loader' && el.tag === 'path') el.attributes.class = 'spinner-head';
    if (name === 'fire') el.attributes.class = 'fire-flame';
    if (el.attributes && el.attributes.fill === 'currentColor' && !el.attributes.stroke) {
      el.attributes.stroke = 'none';
    }
    svg += `${renderElement(el)}\n`;
  }
  svg += `  </symbol>\n`;
}

svg += `</svg>\n`;

const targetPath = path.resolve('src/assets/icons/sprite.svg');
fs.writeFileSync(targetPath, svg, 'utf8');
console.log(`Successfully compiled ${names.length} official MingCute icons from @mingcute/icons into ${targetPath} (${svg.length} bytes)`);
