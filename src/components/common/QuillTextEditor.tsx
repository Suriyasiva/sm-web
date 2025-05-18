/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Box } from '@chakra-ui/react';
import PrimaryInput from './PrimaryInput';

interface TextEditorProps {
  value: string;
  onChange: (value: string) => void;
  inputValue?: string;
  setInputValue?: (value: string) => void;
  hasOnlyEditor?: boolean;
  placeHolder?: string;
  styles?: {
    height?: string;
  };
}

const TextEditor: React.FC<TextEditorProps> = ({
  value,
  onChange,
  inputValue,
  setInputValue,
  hasOnlyEditor,
  styles,
  placeHolder,
}) => {
  const modules = {
    toolbar: {
      container: '#toolbar', // Bind the toolbar to this id
    },
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
  ];

  return (
    <div className='custom-quill'>
      {/* Custom Input between toolbar and editor */}
      {!hasOnlyEditor && (
        <Box my='2'>
          <PrimaryInput
            type='text'
            value={inputValue}
            onChange={(e: any) =>
              setInputValue && setInputValue(e.target.value)
            }
          />
        </Box>
      )}

      {/* Custom Toolbar */}
      <Box id='toolbar' mb='2'>
        <button className='ql-bold' />
        <button className='ql-italic' />
        <button className='ql-header' value='1' />
        <button className='ql-header' value='2' />
        <button className='ql-blockquote' />
        <button className='ql-link' />
        <button className='ql-list' value='bullet' />
        <button className='ql-list' value='ordered' />
      </Box>

      {/* Render the editor */}
      <Box
        sx={{
          '& .quill': {
            height: 'auto',
          },
          '& .ql-container': {
            height: 'auto',
          },
          '& .ql-editor': {
            height: styles?.height ? styles.height : '140px',
          },
        }}
      >
        <ReactQuill
          placeholder={placeHolder}
          value={value}
          onChange={onChange}
          modules={modules}
          formats={formats}
          theme='snow'
        />
      </Box>
    </div>
  );
};

export default function QuillTextEditor({
  inputValue,
  setInputValue,
  editorValue,
  setEditorValue,
  hasOnlyEditor,
  styles,
}: QuillTextEditorProps) {
  return (
    <div>
      <TextEditor
        value={editorValue}
        onChange={setEditorValue}
        inputValue={inputValue}
        setInputValue={setInputValue}
        hasOnlyEditor={hasOnlyEditor}
        styles={styles}
      />
      {/* enable to saw live values */}
      {/* <Box mt='20px'>
        <strong>Editor Content:</strong>
        <Box
          mt='10px'
          p='4'
          borderWidth='1px'
          borderRadius='md'
          dangerouslySetInnerHTML={{ __html: editorValue }}
        />
      </Box> */}
    </div>
  );
}

interface QuillTextEditorProps {
  inputValue?: string;
  setInputValue?: (value: string) => void;
  editorValue: string;
  setEditorValue: (value: string) => void;
  hasOnlyEditor?: boolean;
  styles?: {
    height?: string;
  };
}
