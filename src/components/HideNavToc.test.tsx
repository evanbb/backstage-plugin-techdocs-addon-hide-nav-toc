/* eslint-disable jest/no-disabled-tests */
/* eslint-disable jest/no-test-prefixes */
/* eslint-disable react/self-closing-comp */
/* eslint-disable jest/expect-expect */
import React from 'react';
import { TechDocsAddonTester } from '@backstage/plugin-techdocs-addons-test-utils';
import { MakeAllImagesCatGifs } from '../plugin';

describe('MakeAllImagesCatGifs', () => {
  it('replaces img srcs with cat gif', async () => {
    const { getByTestId } = await TechDocsAddonTester.buildAddonsInTechDocs([
      <MakeAllImagesCatGifs />,
    ])
      .withDom(
        <img data-testid='fixture' src='http://example.com/dog.jpg' alt='' />,
      )
      .renderWithEffects();

    expect(getByTestId('fixture')).toHaveAttribute(
      'src',
      'https://example.com/cat.gif',
    );
  });
});
