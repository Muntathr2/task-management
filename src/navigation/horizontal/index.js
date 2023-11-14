export default [
  {
    title: 'Home',
    to: { name: 'root' },
    icon: { icon: 'tabler-smart-home' },
    children: [
      {
        title: 'Dashboard',
        to: { name: 'dashboard' },
        icon: { icon: 'tabler-smart-home' },
      },
    ],
  },
  {
    title: 'Second page',
    to: { name: 'second-page' },
    icon: { icon: 'tabler-file' },
  },
]
