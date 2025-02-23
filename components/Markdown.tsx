import React, { memo } from 'react';
import { Box, type SxProps } from '@mui/material';
import { BlockNoteView } from '@blocknote/mantine';
import { useCreateBlockNote } from '@blocknote/react';

import '@blocknote/mantine/style.css';
import '@blocknote/core/fonts/inter.css';


export type MarkdownProps = {
  contentEditable?: boolean;
  initialContent?: string;
  disableEmoji?: boolean;
  transparent?: boolean;
  onChange?: (__json: string, __blk: any) => void;
  sx?: SxProps;
};

export const Markdown = (props: MarkdownProps) => {
  const editor = useCreateBlockNote({
    initialContent: props.initialContent ? JSON.parse(props.initialContent) : undefined,
  });

  return (
    <Box
      sx={{
        ...props.sx,
        
        '& .bn-editor': {
          background: props.transparent ? 'transparent !important' : undefined,
          paddingInline: '0 !important',
        },
      }}
    >
      <BlockNoteView
        {
          ...({
            editable: props.contentEditable,
            emojiPicker: !props.disableEmoji,
            spellCheck: 'false',
            theme: 'light',
            editor,
            onChange: () => {
              props.onChange?.(JSON.stringify(editor.document), editor.document);
            },
          } as any)
        }
      />
    </Box>
  );
};

export default memo(Markdown);
