import { createPlugin } from '@backstage/core-plugin-api';
import {
  createTechDocsAddonExtension,
  TechDocsAddonLocations,
  useShadowRootElements,
} from '@backstage/plugin-techdocs-react';
import { useEffect } from 'react';

export const techdocsAddonHideNavTocPlugin = createPlugin({
  id: 'techdocs-addon-hide-nav-toc',
});

export const MakeAllImagesCatGifs = techdocsAddonHideNavTocPlugin.provide(
  createTechDocsAddonExtension({
    name: 'CatGif',
    location: TechDocsAddonLocations.Header,
    component: CatGifComponent,
  }),
);

function CatGifComponent() {
  // This hook can be used to get references to specific elements. If you need
  // access to the whole shadow DOM, use the the underlying useShadowRoot()
  // hook instead.
  const images = useShadowRootElements<HTMLImageElement>(['img']);

  useEffect(() => {
    images.forEach((img) => {
      if (img.src !== 'https://example.com/cat.gif') {
        img.src = 'https://example.com/cat.gif';
      }
    });
  }, [images]);

  // Nothing to render directly, so we can just return null.
  return null;
}
