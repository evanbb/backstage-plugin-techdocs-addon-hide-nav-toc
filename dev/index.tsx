import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { techdocsAddonHideNavTocPlugin, TechdocsAddonHideNavTocPage } from '../src/plugin';

createDevApp()
  .registerPlugin(techdocsAddonHideNavTocPlugin)
  .addPage({
    element: <TechdocsAddonHideNavTocPage />,
    title: 'Root Page',
    path: '/techdocs-addon-hide-nav-toc'
  })
  .render();
