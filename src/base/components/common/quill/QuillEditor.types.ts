export type QuillEditorProps = {
    setEditorHtml: (event: any, name: string, value: string) => void;
    editorHtml?: string;
    name?: string;
    placeholder?: string;
    readOnly?: boolean;
  };