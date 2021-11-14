import JoditEditor from 'jodit-react';
import React from 'react';
import { observer } from 'mobx-react';

interface Props {
  value: string;
}

@observer
export class RichTextInput extends React.Component<Props> {
  public render() {
    const { value } = this.props;

    const standardButtons = 'bold, underline, italic, strikethrough, align, ol, ul';

    const config: any = {
      readonly: false,
      defaultMode: 1,
      buttons: standardButtons,
      buttonsMD: standardButtons,
      buttonsSM: standardButtons,
    };

    return <JoditEditor value={value} config={config} />;
  }
}
