import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "FHEVM Example Hub",
  description: "Zama Bounty Templates",
  
  // Default Light Mode + Toggle Button
  appearance: true, 

  markdown: {
    theme: {
      light: 'github-light',
      dark: 'dracula'
    }
  },

  themeConfig: {
    siteTitle: 'FHEVM Hub', 
    logo: 'https://github.com/zama-ai.png',
    
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples Library', link: '/examples' }, 
      { text: 'Guide', link: '/guide/getting-started' }
    ],

    sidebar: [
      {
        text: 'Guide',
        collapsed: false, // Isko khula rakha hai taaki dikhe
        items: [
          { text: 'Getting Started', link: '/guide/getting-started' },
        ]
      },
      {
        text: '15+ FHE Examples', // 🔥 YEH HAI NAYA SECTION
        collapsed: false, // Isko bhi khula rakha hai
        items: [
          // Yeh links tumhare examples.md ke headers se match karenge
          { text: '🧮 Arithmetic', link: '/examples#arithmetic-operations' },
          { text: '🧠 Bitwise Logic', link: '/examples#bitwise-logic' },
          { text: '⚖️ Comparisons', link: '/examples#comparisons' },
          { text: '🎛️ Advanced (Mux)', link: '/examples#advanced-logic' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Syed9536/fhevm-example-hub' }
    ],

    footer: {
      message: 'Built for Zama Bounty Program December 2025.',
      copyright: 'Copyright © 2025 Syed Jafar | FHEVM Example Hub'
    }
  }
})