import { createPlugin, createRoutableExtension } from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const techdocsAddonHideNavTocPlugin = createPlugin({
  id: 'techdocs-addon-hide-nav-toc',
  routes: {
    root: rootRouteRef,
  },
});

export const TechdocsAddonHideNavTocPage = techdocsAddonHideNavTocPlugin.provide(
  createRoutableExtension({
    name: 'TechdocsAddonHideNavTocPage',
    component: () =>
      import('./components/ExampleComponent').then(m => m.ExampleComponent),
    mountPoint: rootRouteRef,
  }),
);
