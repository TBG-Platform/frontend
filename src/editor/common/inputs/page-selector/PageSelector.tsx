import React from 'react';
import { ItemPredicate, ItemRenderer, Select } from '@blueprintjs/select';
import { MenuItem } from '@blueprintjs/core';

import { Page } from '../../state/Page';
import { observer } from 'mobx-react';

const PageSelect = Select.ofType<Page>();

interface Props {
  pages: Page[];
  target: JSX.Element;
  onSelect: (page: Page) => void;
}

@observer
export class PageSelector extends React.Component<Props> {
  public render() {
    const { pages, target } = this.props;

    console.log('page selector render');

    return (
      <PageSelect
        items={pages}
        itemRenderer={this.pageItemRenderer}
        onItemSelect={this.onPageItemSelect}
        itemPredicate={this.filterPages}
        noResults={<MenuItem text={'No matching pages!'} disabled />}
      >
        {target}
      </PageSelect>
    );
  }

  private pageItemRenderer: ItemRenderer<Page> = (page: Page, { handleClick, modifiers }) => {
    console.log('item renderer');

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
    this.props.onSelect(page);
  };

  private filterPages: ItemPredicate<Page> = (query: string, page: Page) => {
    return page.name.toLowerCase().includes(query.toLowerCase());
  };
}
