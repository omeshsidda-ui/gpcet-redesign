import fs from 'node:fs';
import path from 'node:path';

const facultyDir = path.join(process.cwd(), 'src', 'data', 'faculty');
const files = fs.readdirSync(facultyDir).filter(f => f.endsWith('.json'));

let totalFaculty = 0;
let nullPhotos = 0;
let nullProfileRoutes = 0;
let emptyQualifications = 0;
const designations = new Set();
const facultyKeys = new Set();
const departmentCounts = {};

for (const file of files) {
  const dept = path.basename(file, '.json');
  const list = JSON.parse(fs.readFileSync(path.join(facultyDir, file), 'utf8'));
  departmentCounts[dept] = list.length;
  totalFaculty += list.length;
  for (const item of list) {
    Object.keys(item).forEach(k => facultyKeys.add(k));
    if (!item.photoUrl) nullPhotos++;
    if (!item.profileRoute) nullProfileRoutes++;
    if (!item.qualification || item.qualification.trim() === '') emptyQualifications++;
    designations.add(item.designation);
  }
}

console.log('=== FACULTY DATA CONTRACT AUDIT ===');
console.log('Total faculty records:', totalFaculty);
console.log('Department breakdown:', departmentCounts);
console.log('Keys in JSON:', Array.from(facultyKeys));
console.log('Records with null photoUrl:', nullPhotos);
console.log('Records with null profileRoute:', nullProfileRoutes);
console.log('Records with empty qualification:', emptyQualifications);
console.log('Total unique designations:', designations.size);
console.log('Sample designations:', Array.from(designations).slice(0, 10));

// Now inspect media manifest
const manifestPath = path.join(process.cwd(), 'src', 'data', 'media-manifest.json');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

console.log('\n=== MEDIA MANIFEST CONTRACT AUDIT ===');
console.log('Total media items:', manifest.totalMediaCount);
console.log('Categories present in manifest:', manifest.categories);

// Check URL Map
const urlMapPath = path.join(process.cwd(), 'src', 'data', 'url-map.json');
const urlMap = JSON.parse(fs.readFileSync(urlMapPath, 'utf8'));
console.log('\n=== URL MAP CONTRACT AUDIT ===');
console.log('Total URL redirects indexed:', Object.keys(urlMap).length);
