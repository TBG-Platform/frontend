import React from 'react';
import { ItemRenderer, Select } from '@blueprintjs/select';
import { MenuItem } from '@blueprintjs/core';

import { Page } from '../../../state/Page';

const PageSelect = Select.ofType<Page>();

interface Props {
  pages: Page[];
  target: JSX.Element;
}

export class PageSelector extends React.Component<Props> {
  public render() {
    const { pages, target } = this.props;

    return (
      <PageSelect
        items={pages}
        itemRenderer={this.pageItemRenderer}
        onItemSelect={this.onPageItemSelect}
      >
        {target}
      </PageSelect>
    );
  }

  private pageItemRenderer: ItemRenderer<Page> = (
    page: Page,
    { handleClick, modifiers, query }
  ) => {
    return (
      <MenuItem
        key={'page-select-' + page.id}
        active={modifiers.active}
        disabled={modifiers.disabled}
        onClick={handleClick}
        text={page.name}
      />
    );
  };

  private onPageItemSelect = (page: Page) => {
    console.log('selected page', page.name);
  };
}
