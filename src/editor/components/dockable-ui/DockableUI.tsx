import React from 'react';
import { DockableUIState } from '../../state/dockable-ui/DockableUIState';

import './dockable-ui.scss';

interface Props {
  dockableUiState: DockableUIState;
}

export class DockableUI extends React.Component<Props> {
  public render() {
    return <div className={'dockable-ui-root'}></div>;
  }
}
