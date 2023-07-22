const icons = [
  {
    src: '/favicon/pwa-36x36.png?v=2',
    sizes: '36x36',
    type: 'image/png',
  },
  {
    src: '/favicon/pwa-48x48.png?v=2',
    sizes: '48x48',
    type: 'image/png',
  },
  {
    src: '/favicon/pwa-72x72.png?v=2',
    sizes: '72x72',
    type: 'image/png',
  },
  {
    src: '/favicon/pwa-96x96.png?v=2',
    sizes: '96x96',
    type: 'image/png',
  },
  {
    src: '/favicon/pwa-144x144.png?v=2',
    sizes: '144x144',
    type: 'image/png',
  },
  {
    src: '/favicon/pwa-192x192.png?v=2',
    sizes: '192x192',
    type: 'image/png',
  },
  {
    src: '/favicon/pwa-256x256.png?v=2',
    sizes: '256x256',
    type: 'image/png',
  },
  {
    src: '/favicon/pwa-384x384.png?v=2',
    sizes: '384x384',
    type: 'image/png',
  },
  {
    src: '/favicon/pwa-512x512.png?v=2',
    sizes: '512x512',
    type: 'image/png',
  },
];

export const manifest = {
  name: 'direkt',
  short_name: 'direkt',
  description: 'The application to manage your directions',
  icons,
  theme_color: '#050505',
  background_color: '#050505',
  display: 'standalone',
  orientation: 'portrait',
} as const;
