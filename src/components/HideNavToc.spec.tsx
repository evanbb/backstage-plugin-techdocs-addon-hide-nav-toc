// eslint-disable-next-line @backstage/no-undeclared-imports
import { TechDocsAddonTester } from '@backstage/plugin-techdocs-addons-test-utils';
import React from 'react';
import { HideNavToc } from '../plugin';

describe('MakeAllImagesCatGifs', () => {
  it('replaces img srcs with cat gif', async () => {
    const { getByTestId } = await TechDocsAddonTester.buildAddonsInTechDocs([
      <HideNavToc />,
    ])
      .withDom(
        <img
          data-testid='fixture'
          src='http://example.com/dog.jpg'
          alt='foobar'
        />,
      )
      .renderWithEffects();

    expect(getByTestId('fixture')).toHaveAttribute(
      'src',
      'https://example.com/cat.gif',
    );
  });
});
