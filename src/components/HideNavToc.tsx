import { useShadowRootElements } from '@backstage/plugin-techdocs-react';
import { Theme, makeStyles, useTheme, useMediaQuery } from '@material-ui/core';
import { useEffect } from 'react';

const containerSelector = '[data-md-component="container"]';

const mainSelector = `${containerSelector} > main`;
const footerSelector = `${containerSelector} > footer`;

const navSelector = `${mainSelector} [data-md-type="navigation"]`;
const tocSelector = `${mainSelector} [data-md-type="toc"]`;
const contentSelector = `${mainSelector} [data-md-component="content"]`;

interface StyleProps {
  navHidden: boolean;
  tocHidden: boolean;
  theme: Theme;
  isSmallViewport: boolean;
}

const useStyles = makeStyles<Theme, StyleProps>({
  content: ({ navHidden, tocHidden, isSmallViewport }) => {
    /**
     * Unfortunately, Backstage is not using MUI theme to drive much of this so
     * let's just clobber what's there and hope for the best 🤷‍♂️
     *
     * Maybe we make it configurable/dynamic/intelligent in the next release 🍻
     */
    let maxWidth = '';
    let marginLeft = '16rem';

    if (!isSmallViewport) {
      if (navHidden && tocHidden) {
        maxWidth = '100%';
      } else if (navHidden) {
        maxWidth = `calc(100% - 16rem)`;
      } else if (tocHidden) {
        maxWidth = `calc(100% - 16rem)`;
      }

      if (navHidden) {
        marginLeft = '0';
      }
    } else {
      maxWidth = '100%';
      marginLeft = '0';
    }

    return {
      maxWidth,
      marginLeft,
    };

    // return { '@media screen and (min-width: 76.1875em)': rules,
    // };
  },
  footer: ({ theme, navHidden, tocHidden }) => {
    return navHidden || tocHidden
      ? {
          backgroundColor: theme.palette.background.default,
        }
      : {};
  },
});

export function HideNavToc() {
  const [nav, toc, content, footer] = useShadowRootElements([
    navSelector,
    tocSelector,
    contentSelector,
    footerSelector,
  ]);

  const theme = useTheme();

  const navHidden = nodeIsHidden(nav);
  const tocHidden = nodeIsHidden(toc);

  /**
   * Unfortunately there is a bug between the jss lib and Backstage where, when
   * navigating across plugins, conditional style rules (like media queries)
   * result in an NRE because the style rule's sheet gets nulled out.
   *
   * Checking the media query here and altering the value of the rules works,
   * though 🤷‍♂️
   */
  const isSmallViewport = useMediaQuery(
    '@media screen and (max-width: 76.1875em)',
  );

  const { content: contentClass, footer: footerClass } = useStyles({
    navHidden,
    tocHidden,
    theme,
    isSmallViewport,
  });

  useEffect(() => {
    const contentClasses = contentClass.split(' ');
    const footerClasses = footerClass.split(' ');

    content?.classList.add(...contentClasses);
    footer?.classList.add(...footerClasses);

    return () => {
      content?.classList.remove(...contentClasses);
      footer?.classList.add(...footerClasses);
    };
  }, [content, footer, contentClass, footerClass]);

  return null;
}

function nodeIsHidden(node: HTMLElement | null): boolean {
  return Boolean(node?.hasAttribute('hidden'));
}
