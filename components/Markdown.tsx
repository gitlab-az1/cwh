import React, { memo, useEffect } from 'react';
import { Box, type SxProps } from '@mui/material';
import { BlockNoteView } from '@blocknote/mantine';
import { useCreateBlockNote } from '@blocknote/react';

import '@blocknote/mantine/style.css';
import '@blocknote/core/fonts/inter.css';
import { delayed } from '@/utils';


export type MarkdownProps = {
  contentEditable?: boolean;
  initialContent?: string;
  disableEmoji?: boolean;
  transparent?: boolean;
  allowTranslation?: boolean;
  onChange?: (__json: string, __blk: any) => void;
  sx?: SxProps;
};

export const Markdown = (props: MarkdownProps) => {
  const editor = useCreateBlockNote({
    initialContent: props.initialContent ? JSON.parse(props.initialContent) : undefined,
  });

  useEffect(() => {
    delayed(() => {
      document.querySelector('.ProseMirror[contenteditable]')?.setAttribute('translate', props.allowTranslation ? 'yes' : 'no');
    });
  }, [props.allowTranslation]);

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
