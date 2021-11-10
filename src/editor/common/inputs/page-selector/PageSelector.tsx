import React from 'react';
import { ItemPredicate, ItemRenderer, Select } from '@blueprintjs/select';
import { MenuItem } from '@blueprintjs/core';
import { observer } from 'mobx-react';

import { Page } from '../../state/Page';

const PageSelect = Select.ofType<Page>();

interface Props {
  pages: Page[];
  target: JSX.Element;
  onSelect: (page: Page) => void;
  noResultsText?: string;
}

@observer
export class PageSelector extends React.Component<Props> {
  public render() {
    const { pages, target, noResultsText } = this.props;

    return (
      <PageSelect
        items={pages}
        itemRenderer={this.pageItemRenderer}
        onItemSelect={this.onPageItemSelect}
        itemPredicate={this.filterPages}
        noResults={<MenuItem text={noResultsText ?? 'No matching pages!'} disabled />}
      >
        {target}
      </PageSelect>
    );
  }

  private pageItemRenderer: ItemRenderer<Page> = (page: Page, { handleClick, modifiers }) => {
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
