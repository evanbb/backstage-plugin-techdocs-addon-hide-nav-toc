import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { techdocsAddonHideNavTocPlugin, HideNavToc } from '../src/plugin';

createDevApp()
  .registerPlugin(techdocsAddonHideNavTocPlugin)
  .addPage({
    element: <HideNavToc />,
    title: 'Root Page',
    path: '/techdocs-addon-hide-nav-toc'
  })
  .render();
