export default defineAppConfig({
  ui: {
    primary: 'blue',
    gray: 'cool',

    card: {
      base: '',
      background: 'bg-gray-50/10 dark:bg-gray-950',
      divide: 'divide-y divide-gray-400/30 dark:divide-gray-400/30',
      ring: 'ring-1 ring-gray-400/30 dark:ring-gray-400/30',
      rounded: 'rounded overflow-hidden',
      shadow: 'shadow',
      header: {
        base: '',
        background: 'bg-gray-100/30 dark:bg-gray-900/20',
        padding: 'px-4 py-2 sm:px-4 sm:py-2'
      },
      // body: {
      //   base: '',
      //   background: 'bg-gray-50/10 dark:bg-gray-900',
      //   padding: 'px-4 py-4 sm:p-4'
      // },
      // footer: {
      //   base: '',
      //   background: 'bg-gray-50/30 dark:bg-gray-800/50',
      //   padding: 'px-4 py-2 sm:px-4'
      // }
    }
  }
})