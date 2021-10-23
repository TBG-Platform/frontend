import { action, observable } from 'mobx';
import React from 'react';

export class Story {
  @observable public name = 'Untitled_story';
  @observable public editingName = false;

  @action public editName = () => {
    this.editingName = true;

    document.addEventListener('click', this.onClickDocument);
  };

  @action public setName = (name: string) => {
    this.name = name;
  };

  @action private onClickDocument = (e: MouseEvent) => {
    // Used to track when to stop editing story name
    const target = e.target as HTMLDivElement;
    if (!target.closest('#story-name-input')) {
      this.editingName = false;
      document.removeEventListener('click', this.onClickDocument);
    }
  };
}
