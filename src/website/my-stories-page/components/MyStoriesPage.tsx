import './my-stories-page.scss';

import React from 'react';
import { Button, Intent, NonIdealState } from '@blueprintjs/core';
import { observer } from 'mobx-react';

import { MyStoriesPageState } from '../state/MyStoriesPageState';

interface Props {
  myStoriesState: MyStoriesPageState;
}

@observer
export class MyStoriesPage extends React.Component<Props> {
  public render() {
    return (
      <div className={'my-stories-page'}>
        <div className={'stories-toolbar-area'}>[toolbar will go here]</div>

        {this.renderStories()}
      </div>
    );
  }

  private renderStories() {
    const { myStoriesState } = this.props;

    // If user has no stories at all
    if (myStoriesState.stories === 0) {
      return this.renderNoStories();
    }

    return (
      <div className={'stories-sections'}>
        <div className={'section'}>
          <div className={'section-heading'}>Drafts {myStoriesState.stories}</div>
          <div className={'section-list'}></div>;
        </div>

        <div className={'section'}>
          <div className={'section-heading'}>Published {myStoriesState.stories}</div>
          <div className={'section-list'}></div>
        </div>
      </div>
    );
  }

  private renderNoStories() {
    return (
      <NonIdealState
        icon={'clean'}
        title={'No stories'}
        description={'You have no stories! Create a new draft to get started'}
        action={<Button text={'Create draft story'} icon={'add'} intent={Intent.PRIMARY} />}
      />
    );
  }
}
