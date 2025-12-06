import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "FHEVM Example Hub",
  description: "Zama Bounty Templates",
  themeConfig: {
    // Logo agar koi image hai to yahan daal sakta hai, warna text dikhega
    siteTitle: 'FHEVM Hub 🛡️', 

    nav: [
      { text: 'Home', link: '/' },
      // Yahan maine drop-down hata diya aur seedha link de diya
      { text: 'Examples Library', link: '/examples' }, 
      { text: 'Guide', link: '/guide/getting-started' }
    ],

    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Getting Started', link: '/guide/getting-started' },
        ]
      },
      {
        text: 'Available Templates',
        items: [
          // Ye sidebar me list rahegi navigation ke liye
          { text: 'Blind Auction', link: '/templates/blind-auction' },
          { text: 'Confidential Token', link: '/templates/confidential-token' },
          { text: 'Encrypted Counter', link: '/templates/encrypted-counter' },
          { text: 'Access Control', link: '/templates/access-control' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Syed9536/fhevm-example-hub' }
    ]
  }
})