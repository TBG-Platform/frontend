import { observable } from 'mobx';

export class MyStoriesPageState {
  // Numbers for now, will use real types later
  @observable public stories = 0;
}
