/**
 * Script to add animation scripts to all skill HTML pages
 * Run this with Node.js: node update-skill-pages.js
 */

const fs = require('fs');
const path = require('path');

const skillsDir = path.join(__dirname, 'skills');
const scriptToAdd = `    <!-- Scripts -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
    <script src="../common-animations.js" defer></script>
</head>`;

const files = fs.readdirSync(skillsDir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    const filePath = path.join(skillsDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check if scripts are already added
    if (content.includes('common-animations.js')) {
        console.log(`✓ ${file} already has animations`);
        return;
    }
    
    // Find </head> tag and insert scripts before it
    if (content.includes('</head>')) {
        content = content.replace('</head>', scriptToAdd);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✓ Updated ${file}`);
    } else {
        console.log(`✗ Could not find </head> in ${file}`);
    }
});

console.log(`\nDone! Updated ${files.length} skill pages.`);

