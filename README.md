# Frontend Repo

This contains the website, story editor and game player.

To get started, first install dependencies:

```
npm install
```

Then, to run:

```
npm run dev
```

This opens a new window in your browser, with hot-reloading enabled.

As regards browsers, it is best to use Chrome for development.

## Workflow - Jira and Git conventions

We are using a Github extension within Jira, which allows us to track branches and commits made against a particular jira ticket.

When working inside the frontend repo, follow this general workflow:

- Find a Jira ticket to work on, assign it to yourself and move it to 'In progress'
- Create a new branch for the ticket from dev, make sure to name the branch like this: `<jira-ticket-number>_<summary>` - the underscore separates the ticket number and summary text
- E.g for this ticket: https://mattn.atlassian.net/browse/FRONT-4 I made a branch named `FRONT-4_page-details`
- When making commits, start your commit message with `<jira-ticket-number>:<commit-message>`, e.g `FRONT-4: did the thing` - separate the jira ticket number with a colon
- You should now see the branch and all commits from the jira ticket!
- Write any unit tests necessary, run `npm test` to make sure you didn't break any existing tests
- When ready to pull request, first pull dev into your branch and deal with any conflicts, then raise the PR against dev
- Your PR will then be reviewed and merged; once merged, the branch will be deleted and you can move your Jira ticket to 'Done'

## Folder structure

The structure of the repo has a few conventions.

Under `src/` are the high-level folders for the apps within the repo, for the game editor, game player and website. Within these folders are sub-folders for various pages, screens, panels etc - self-contained items.

At each level under src, there should be a `common` folder which holds components and/or state common to that level (e.g the editor has a common folder which holds inputs used between various editor sub-folders).

For each sub-folder within a high-level folder, there should be `components` and `state` folders to hold .tsx & .scss and .ts files respectively. Where appropriate, there may also be a `test` folder holding any test files for that sub-folder item.

## Imports

Imports should follow the renke ordering style. VSCode has an extension called 'sort-imports' which handles this for you - just edit the default order method to 'renke' once installed in its settings.

## MobX

This repo uses MobX to handle state management and auto-re-rendering for React components. Using MobX is straightforward, consider the following component:

```
interface Props {
  compState: CompState;
}

@observer
export class MyComp extends React.Component<Props> {
  public render() {
    const { compState } = this.props;

    return <button onClick={compState.updateValue}>{compState.value}</button>
  }
}
```

This component has the 'observer' decorator, imported from 'mobx-react'. It also has a compState property passed in, let's look at CompState:

```
export class CompState {
  @observable public value = 0;

  @action public updateValue = () => {
    value++;
  };
}
```

CompState has one public property, 'value', which is rendered in the above component. It is marked with the 'observable' decorator. There is also a function in there which updates the value prop. This function is marked with the 'action' decorator. Both decorators are imported from 'mobx'.

Let's look at what these decorators mean:

- @observer means the following component will look at observable properties that are touched through its render function
- @observable means that the following property will be looked at by observers
- @action means that the following function touches observable properties. It also delays updates to observers until the function has finished

Putting it all together - whenever an observable property is changed, any observer components that reference that property in their render method (or methods called via render) will re-render automatically.

One thing to be aware of - you cannot have a component that observes an observable value which then updates that observable in its render method. This would cause an infinite loop:

- render, update observable
- oh - observable has updated, re-render
- repeat forever

Other than the above point, MobX is pretty easy to use! Their documentation is here if you want to find out more: https://mobx.js.org/README.html

Using MobX means we can keep all logic outside of our components as much as possible. You should avoid having functions inside your react components; each major component should have its own ComponentState.ts which holds the callbacks and state values for the component. A major benefit to this system is that if we choose to swap out components the business logic in unaffected; you can drop in new components or make major changes this way without having to worry about losing any logic which should remain the same.

## Blueprint and Styling

This project makes use of the UI toolkit library, Blueprintjs: https://blueprintjs.com/docs/

In general, try to use a blueprint component where possible.

In some cases, we have our own wrappers for blueprint components - always check under the 'common' folders.

With regards to styling, under `src/common` lives the `tbg-palette.scss` which holds common scss variables.

Currently, it holds a few colours. When adding new colours or sizing values that would be reused throughout the app, put them in the palette file.

## Unit Testing

This repo uses jest for its unit tests. Keep tests in their own `test` folder rather than alongside the source file they test (see the folder structure section above).

We currently only test state and business logic, though we may add in storybook later for component testing.

Please write unit tests to cover any new state or logic you have done. If you raise a PR without unit tests, it won't get merged!

# Editor

The `editor` folder holds all the code related to the game editor app.

The editor uses a panel system, called Dockable UI, where users can create split panel layouts.

All of the editor components are viewed as tabs within panels. You can add a tab to a panel via the more (...) menu on a panel, or via the top navbar under the View button.

Each sub-folder under editor relates to a major component of the editor, like the dockable-ui folder, or to a tab viewed in a panel like the story-graph folder.

Within each sub-folder for a tab or major component should be a `components` folder, holding .tsx and .scss files, and a `state` folder for the .ts state files for the component.

## Dockable UI

Dockable UI is a major piece of the editor, which dictates how the editor components and their states are structured within the editor app.

The dockable ui components and state are largely self-dependant; it handles the splitting and closing of panels itself as well as the closing and focusing of tabs within panels.

When we want to add a tab to a panel, we call DockableUIState::addPanelTab and pass in the tab. The tab itself is created outside of the dockable ui state, currently either from a button in the panel options (which are passed into the dockable ui component) or via the main app navbar 'View' menu. A tab is essentially just an id and a label for the tab name which the panel renders.

When a tab is focused within a panel, the dockable ui component calls one of its properties 'renderTabBody'. This is a function with the tab id as a parameter and expects JSX to be returned - this JSX is inserted into the tab body.

This means that the editor needs to keep track of the created tabs and which components and state to render for each tab when asked by the dockable ui. This is currently handled inside EditorRootState and TabBodyRenderer.

When creating new tab components, we should:

- make a folder for the new component under the editor folder, give it components and state sub-folders
- add the new tab type inside the exported enum within PanelTabType.ts
- create and clear any required state for the component in the approrpiate functions inside EditorRootState
- create an entry in the TabBodyRenderer to return the tab component with any necessary state received from the editor root state
