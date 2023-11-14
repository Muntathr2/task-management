export default [
  {
    title: 'Home',
    icon: { icon: 'tabler-smart-home' },
    children: [
      {
        title: 'Dashboard',
        icon: { icon: 'tabler-smart-home' },
        to: { name: 'root' },
      },
    ],
  },
  {
    title: 'Second page',
    to: { name: 'second-page' },
    icon: { icon: 'tabler-file' },
  },
]
