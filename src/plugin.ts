import { createPlugin } from '@backstage/core-plugin-api';
import {
  createTechDocsAddonExtension,
  TechDocsAddonLocations,
} from '@backstage/plugin-techdocs-react';
import { HideNavToc as HideNavTocComponent } from './components/HideNavToc';

export const techdocsAddonHideNavTocPlugin = createPlugin({
  id: 'techdocs-addon-hide-nav-toc',
});

export const HideNavToc = techdocsAddonHideNavTocPlugin.provide(
  createTechDocsAddonExtension({
    name: 'techdocs-addon-hide-nav-toc',
    component: HideNavTocComponent,
    location: TechDocsAddonLocations.Content,
  }),
);
