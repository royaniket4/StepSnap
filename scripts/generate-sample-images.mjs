import sharp from "sharp";
import fs from "fs";
import path from "path";

const steps = [
  {
    name: "step1.png",
    title: "1. Navigate to Project Settings",
    subtitle: "Vercel Dashboard > stepsnap-production > Settings",
    highlight: "Settings Tab",
    accent: "#6366f1",
    details: "Select your active production deployment from the projects list."
  },
  {
    name: "step2.png",
    title: "2. Select Domains from the Sidebar",
    subtitle: "Settings Navigation > Domains",
    highlight: "Domains (Active)",
    accent: "#8b5cf6",
    details: "Click on Domains in the left-hand navigation menu."
  },
  {
    name: "step3.png",
    title: "3. Enter Custom Domain Name",
    subtitle: "Input: docs.stepsnap.dev",
    highlight: "Add Domain Button",
    accent: "#6366f1",
    details: "Enter your domain or subdomain and click Add."
  },
  {
    name: "step4.png",
    title: "4. Configure DNS CNAME Record",
    subtitle: "Host: docs | Target: cname.vercel-dns.com",
    highlight: "DNS Table Configuration",
    accent: "#f59e0b",
    details: "Add the generated CNAME record in your DNS provider control panel."
  },
  {
    name: "step5.png",
    title: "5. SSL Provisioned and Verified",
    subtitle: "Status: Valid Configuration - Automatic SSL Issued",
    highlight: "Status: Valid (Green Checkmark)",
    accent: "#10b981",
    details: "Domain verification succeeded and Let's Encrypt certificate is active."
  }
];

const outDir = path.resolve("public/sample");
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

for (const step of steps) {
  const cleanTitle = step.title.replace(/&/g, '&amp;');
  const cleanSubtitle = step.subtitle.replace(/&/g, '&amp;');
  const cleanDetails = step.details.replace(/&/g, '&amp;');
  const cleanHighlight = step.highlight.replace(/&/g, '&amp;');

  const svg = `
  <svg width="800" height="450" viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0f172a" />
        <stop offset="100%" stop-color="#1e293b" />
      </linearGradient>
      <linearGradient id="cardGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#1e293b" />
        <stop offset="100%" stop-color="#0f172a" />
      </linearGradient>
    </defs>
    
    <!-- Window Background -->
    <rect width="800" height="450" rx="12" fill="url(#bgGrad)" />
    
    <!-- Window Title Bar -->
    <rect width="800" height="42" rx="12" fill="#0b1120" />
    <circle cx="24" cy="21" r="6" fill="#ef4444" />
    <circle cx="44" cy="21" r="6" fill="#f59e0b" />
    <circle cx="64" cy="21" r="6" fill="#10b981" />
    <rect x="180" y="10" width="440" height="22" rx="6" fill="#1e293b" />
    <text x="400" y="25" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" fill="#94a3b8" text-anchor="middle">vercel.com/stepsnap/production/settings</text>
    
    <!-- Main Content Area -->
    <g transform="translate(40, 70)">
      <!-- Step Badge -->
      <rect x="0" y="0" width="120" height="26" rx="13" fill="${step.accent}" opacity="0.2" />
      <text x="60" y="17" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="bold" fill="${step.accent}" text-anchor="middle">SCREENSHOT</text>
      
      <!-- Title -->
      <text x="0" y="60" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="22" font-weight="bold" fill="#f8fafc">${cleanTitle}</text>
      <text x="0" y="88" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" fill="#94a3b8">${cleanSubtitle}</text>
      
      <!-- Mock Interface Card -->
      <rect x="0" y="115" width="720" height="195" rx="8" fill="url(#cardGrad)" stroke="#334155" stroke-width="1.5" />
      
      <!-- Card Header -->
      <line x1="0" y1="165" x2="720" y2="165" stroke="#334155" stroke-width="1" />
      <text x="24" y="148" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="600" fill="#e2e8f0">Configuration Console</text>
      
      <!-- Action Highlight Box -->
      <rect x="24" y="185" width="672" height="60" rx="6" fill="#0b1120" stroke="${step.accent}" stroke-width="2" />
      <circle cx="50" cy="215" r="12" fill="${step.accent}" />
      <text x="50" y="219" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="bold" fill="#ffffff" text-anchor="middle">&#10003;</text>
      <text x="75" y="212" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="bold" fill="#f8fafc">${cleanHighlight}</text>
      <text x="75" y="230" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" fill="#94a3b8">${cleanDetails}</text>
      
      <!-- Status pill -->
      <rect x="24" y="262" width="160" height="28" rx="6" fill="#1e293b" />
      <circle cx="38" cy="276" r="4" fill="${step.accent}" />
      <text x="50" y="280" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" fill="#cbd5e1">StepSnap Verified</text>
    </g>
  </svg>
  `;

  const dest = path.join(outDir, step.name);
  await sharp(Buffer.from(svg)).png().toFile(dest);
  console.log(`Generated ${dest}`);
}
