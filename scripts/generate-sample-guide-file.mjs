import fs from "fs";
import path from "path";

const getBase64 = (filename) => {
  const filePath = path.resolve("public/sample", filename);
  const buffer = fs.readFileSync(filePath);
  return `data:image/png;base64,${buffer.toString("base64")}`;
};

const sampleGuideCode = `import { Guide } from '@/types/guide';

export const SAMPLE_GUIDE: Guide = {
  id: 'sample-guide-vercel-domain',
  slug: 'how-to-configure-custom-domain-on-vercel',
  title: 'How to Configure a Custom Domain & SSL on Vercel',
  summary: 'A step-by-step walkthrough to connect your custom apex or subdomain to a Vercel project, configure DNS CNAME records, and verify automatic SSL certificate provisioning.',
  authorName: 'Alex Rivera',
  createdAt: '2026-10-11T10:00:00.000Z',
  visibility: 'public',
  steps: [
    {
      id: 'step-1',
      title: 'Navigate to Project Settings',
      description: 'Open your Vercel Dashboard, select your deployment project from the overview list, and click on the "Settings" tab in the top navigation bar to access environment and routing parameters.',
      imageUrl: '${getBase64("step1.png")}',
      imageAlt: 'Vercel Dashboard highlighting the Settings tab'
    },
    {
      id: 'step-2',
      title: 'Select Domains from the Sidebar Navigation',
      description: 'In the left-hand navigation sidebar, locate and click on "Domains". This section displays all currently assigned production and preview domains along with their DNS validation status.',
      imageUrl: '${getBase64("step2.png")}',
      imageAlt: 'Project Settings sidebar with Domains highlighted'
    },
    {
      id: 'step-3',
      title: 'Enter Custom Domain or Subdomain',
      description: 'In the input field under "Add Domain", type your target hostname (e.g., docs.stepsnap.dev or app.yourdomain.com). Choose the production branch to route traffic to, and click the "Add" button.',
      imageUrl: '${getBase64("step3.png")}',
      imageAlt: 'Add Domain input field with docs.stepsnap.dev entered'
    },
    {
      id: 'step-4',
      title: 'Configure DNS Records at Your Registrar',
      description: 'Vercel will detect whether DNS records are active. For subdomains, add a CNAME record with Host "docs" pointing to "cname.vercel-dns.com". For apex domains, configure an A record pointing to "76.76.21.21". Set TTL to 300 seconds.',
      imageUrl: '${getBase64("step4.png")}',
      imageAlt: 'DNS configuration table showing required CNAME record details'
    },
    {
      id: 'step-5',
      title: 'Verify Configuration and Automatic SSL Certificate',
      description: 'Allow 1-2 minutes for DNS propagation. Once Vercel detects the record, it automatically provisions and installs a Let\\'s Encrypt SSL/TLS certificate. The status badge will turn green showing "Valid Configuration".',
      imageUrl: '${getBase64("step5.png")}',
      imageAlt: 'Vercel domain card displaying green checkmark and valid SSL certificate'
    }
  ]
};
`;

fs.writeFileSync("src/lib/sampleGuide.ts", sampleGuideCode, "utf8");
console.log("Successfully wrote src/lib/sampleGuide.ts");
