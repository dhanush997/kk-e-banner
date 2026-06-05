import fs from 'fs';
import path from 'path';

// Primary source paths (where you copied them in the project folder)
const localBgSource = path.join(process.cwd(), 'flagship_store_bg_1780679326638.png');
const localLogoSource = path.join(process.cwd(), 'kk_brand_logo_1780680510511.png');

// Fallback source paths (from the brain sandbox folders)
const fallbackBgSource = 'C:\\Users\\Dhanush\\.gemini\\antigravity-ide\\brain\\a5302791-4a7c-4c49-8376-46df593d6867\\flagship_store_bg_1780679326638.png';
const fallbackLogoSource = 'C:\\Users\\Dhanush\\.gemini\\antigravity-ide\\brain\\a5302791-4a7c-4c49-8376-46df593d6867\\kk_brand_logo_1780680510511.png';

const destDir = path.join(process.cwd(), 'public');
const bgDest = path.join(destDir, 'flagship_store_bg.png');
const logoDest = path.join(destDir, 'kk_brand_logo.png');

try {
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  // Handle Background Image Copy
  if (fs.existsSync(localBgSource)) {
    fs.copyFileSync(localBgSource, bgDest);
    console.log('✨ [KK Banner] Background copied from project folder to public/flagship_store_bg.png');
  } else if (fs.existsSync(fallbackBgSource)) {
    fs.copyFileSync(fallbackBgSource, bgDest);
    console.log('✨ [KK Banner] Background copied from sandbox brain to public/flagship_store_bg.png');
  } else {
    console.log('⚠️ [KK Banner] Flagship background image not found, using CSS web fallback.');
  }

  // Handle Logo Image Copy
  if (fs.existsSync(localLogoSource)) {
    fs.copyFileSync(localLogoSource, logoDest);
    console.log('✨ [KK Banner] Logo copied from project folder to public/kk_brand_logo.png');
  } else if (fs.existsSync(fallbackLogoSource)) {
    fs.copyFileSync(fallbackLogoSource, logoDest);
    console.log('✨ [KK Banner] Logo copied from sandbox brain to public/kk_brand_logo.png');
  } else {
    console.log('⚠️ [KK Banner] KK brand logo image not found, using HTML text fallback.');
  }
} catch (err) {
  console.error('❌ [KK Banner] Error copying assets:', err);
}
