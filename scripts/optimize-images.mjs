import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';

const TARGET_IMAGES = [
  'public/Sidebar/people-happy.jpg',
  'public/Sidebar/link-up.jpg',
  'public/Sidebar/sunday-ill.jpg',
  'public/Sidebar/sip-ill.jpg',
  'public/Sidebar/ice-cream.svg',
  'public/Sidebar/people-happy.svg',
  'public/Sidebar/link-up.svg',
  'public/Sidebar/sunday-ill.svg',
  'public/Sidebar/sip-ill.svg',
  'public/Sidebar/ice-cream.svg',
];

async function optimizeImages() {
  console.log('Starting image optimization...');
  
  for (const relativePath of TARGET_IMAGES) {
    const inputPath = path.join(process.cwd(), relativePath);
    const outputPath = inputPath.replace(/\.(jpg|svg)$/, '.webp');
    
    try {
      console.log(`Processing ${relativePath}...`);
      
      const imageBuffer = await fs.readFile(inputPath);
      
      await sharp(imageBuffer)
        .resize({ width: 1200, withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(outputPath);
        
      console.log(`Created ${outputPath}`);
      
      const originalStats = await fs.stat(inputPath);
      const newStats = await fs.stat(outputPath);
      
      console.log(`Size reduced: ${(originalStats.size / 1024 / 1024).toFixed(2)}MB -> ${(newStats.size / 1024 / 1024).toFixed(2)}MB`);
      
    } catch (error) {
      console.error(`Failed to process ${relativePath}:`, error);
    }
  }
  
  console.log('Optimization complete!');
}

optimizeImages();
