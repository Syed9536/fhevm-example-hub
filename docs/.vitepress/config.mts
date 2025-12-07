import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "FHEVM Example Hub",
  description: "Zama Bounty Templates",
  
  // Isko 'true' rakhne se Default Light Mode rahega aur Toggle button kaam karega
  appearance: true, 

  // 👇 YE NAYA PART HAI: Code Colors ko Vibrant banane ke liye
  markdown: {
    theme: {
      light: 'github-light',
      dark: 'dracula' // Ye neon colors layega dark mode me
    }
  },

 themeConfig: {
    siteTitle: 'FHEVM Hub', 

    // ✅ FIXED: Official GitHub Avatar (Ye kabhi 404 nahi dega)
    logo: 'https://github.com/zama-ai.png',
    
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples Library', link: '/examples' }, 
      { text: 'Guide', link: '/guide/getting-started' }
    ],

    sidebar: [
      {
        text: 'Guide',
        collapsed: true, // 👈 CHANGE: Ye ab default me BAND rahega (Click to open)
        items: [
          { text: 'Getting Started', link: '/guide/getting-started' },
        ]
      },
      {
        text: 'Available Templates',
        collapsed: false, // 👈 CHANGE: Ye KHULA rahega (Main focus hai isliye)
        items: [
          { text: 'Blind Auction', link: '/templates/blind-auction' },
          { text: 'Confidential Token', link: '/templates/confidential-token' },
          { text: 'Encrypted Counter', link: '/templates/encrypted-counter' },
          { text: 'Access Control', link: '/templates/access-control' }
        ]
      }
    ],

    socialLinks: [
      // Yahan apna username daal dena agar change karna ho
      { icon: 'github', link: 'https://github.com/Syed9536/fhevm-example-hub' }
    ],

    footer: {
      message: 'Built for Zama Bounty Program December 2025.',
      copyright: 'Copyright © 2025 Syed Jafar | FHEVM Example Hub'
    }
  }
})