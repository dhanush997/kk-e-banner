import { execSync } from 'child_process';
import fs from 'fs';

console.log('🔍 Running Git diagnosis and automated repair...');

try {
  // 1. Check if git is initialized
  if (!fs.existsSync('.git')) {
    console.error('❌ Error: This folder is not a Git repository.');
    process.exit(1);
  }

  // 2. Check current branch
  const branch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
  console.log(`🌿 Current Git branch: ${branch}`);

  // 3. Check if node_modules is tracked in Git
  let isTracked = false;
  try {
    execSync('git ls-files --error-unmatch node_modules', { stdio: 'ignore' });
    isTracked = true;
  } catch (e) {
    // node_modules is not tracked, which is good
  }

  if (isTracked) {
    console.log('⚠️ Detected: "node_modules" is tracked in Git. Removing from Git cache...');
    execSync('git rm -r --cached node_modules', { stdio: 'inherit' });
    console.log('✅ Removed "node_modules" from Git tracking (local files remain intact).');
  } else {
    console.log('✅ "node_modules" is not tracked in Git. (Good!)');
  }

  // 4. Stage relevant files
  console.log('📦 Staging files...');
  execSync('git add .gitignore package.json copy-bg.js', { stdio: 'inherit' });

  // 5. Commit changes
  try {
    console.log('💾 Committing changes...');
    execSync('git commit -m "chore: stop tracking node_modules and update scripts"', { stdio: 'inherit' });
    console.log('✅ Changes committed.');
  } catch (e) {
    console.log('ℹ️ Nothing new to commit (or files already committed).');
  }

  // 6. Push changes
  console.log(`🚀 Pushing changes to remote branch: ${branch}...`);
  execSync(`git push origin ${branch}`, { stdio: 'inherit' });
  console.log('🎉 Successfully pushed to GitHub! Vercel should start rebuilding automatically.');

} catch (err) {
  console.error('\n❌ An error occurred during the process:', err.message);
  console.log('\n💡 Please check if you have any uncommitted conflicts or if you need to run "git pull" first.');
}
