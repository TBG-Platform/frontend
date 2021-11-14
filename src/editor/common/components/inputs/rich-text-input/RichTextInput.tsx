import JoditEditor from 'jodit-react';
import React from 'react';
import sanitizeHtml from 'sanitize-html';
import { observer } from 'mobx-react';

interface Props {
  value: string;
  onChange: (html: string) => void;
}

@observer
export class RichTextInput extends React.Component<Props> {
  private standardButtons = 'bold, underline, italic, strikethrough, align, brush, ol, ul';
  private config: any = {
    readonly: false,
    defaultMode: 1,
    buttons: this.standardButtons,
    buttonsMD: this.standardButtons,
    buttonsSM: this.standardButtons,
    events: {
      processPaste: (_e: ClipboardEvent, html: string) => sanitizeHtml(html),
    },
  };

  public render() {
    const { value, onChange } = this.props;

    return (
      <JoditEditor
        value={value}
        config={this.config}
        onChange={(newContent: string) => onChange(newContent)}
      />
    );
  }
}
