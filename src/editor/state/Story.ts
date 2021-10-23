import { action, observable } from 'mobx';
import React from 'react';

export class Story {
  @observable public name = 'Untitled_story';

  @action public setName = (name: string) => {
    this.name = name;
  };
}
