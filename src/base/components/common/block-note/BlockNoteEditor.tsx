import "@blocknote/mantine/style.css";
import "@blocknote/core/fonts/inter.css";
import { useTheme } from "@base/layout/contexts/ThemeContext";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import { Block } from "@blocknote/core";
import React from "react";

type BlockNoteEditorProps = {
  blocks: Block[];
  setBlocks: React.Dispatch<React.SetStateAction<Block[]>>;
  imageUploadEnabled?: boolean;
};

function BlockNoteEditor({
  blocks,
  setBlocks,
  imageUploadEnabled = true,
}: Readonly<BlockNoteEditorProps>) {
  const editor = useCreateBlockNote({
    uploadFile: imageUploadEnabled
      ? async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        const response = await fetch("https://api.blocknote.net/upload", {
          method: "POST",
          body: formData,
        });
        const data = await response.json();
        return data.url;
      }
      : undefined,
    initialContent: [
      {
        type: "paragraph",
        content: "Hello, world! 🌍",
      },
    ],
  });
  const { theme } = useTheme();

  React.useEffect(() => {
    console.log(blocks);
  }, [blocks]);

  return (
    <BlockNoteView
      className="rounded-lg shadow-md p-4"
      editor={editor}
      theme={theme}
      onChange={() => {
        // Saves the document JSON to state.
        setBlocks(editor.document);
      }}
    />
  );
}

export default BlockNoteEditor;
