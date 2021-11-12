import { GamePage, GamePageProps } from '../state/GamePage';
import { GamePageItem, GamePageItemProps } from '../state/GamePageItem';
import { GameStory, GameStoryProps } from '../state/GameStory';
import { PageItemModel, PageModel, StoryModel } from '../../editor/common/model/StoryModel';

export class GameStoryFactory {
  public static createGameStory(storyModel: StoryModel) {
    // Note - this looks excessive (props match despite diff types), but later on the
    // props may differ between itemModel and gameItemProps so better to be explicit!

    const gamePages: GamePage[] = storyModel.pages.map((pageModel: PageModel) => {
      // Setup items for this page
      const pageItems: GamePageItem[] = pageModel.items.map((itemModel: PageItemModel) => {
        // Item props

        const itemProps: GamePageItemProps = {
          id: itemModel.id,
          settings: itemModel.settings,
          textSettings: itemModel.textSettings,
          text: itemModel.text,
          linkedPageId: itemModel.linkedPageId,
        };

        return new GamePageItem(itemProps);
      });

      // Page props
      const pageProps: GamePageProps = {
        id: pageModel.id,
        name: pageModel.name,
        items: pageItems,
      };

      return new GamePage(pageProps);
    });

    const storyProps: GameStoryProps = {
      id: storyModel.id,
      name: storyModel.name,
      pages: gamePages,
    };

    return new GameStory(storyProps);
  }
}
