/* eslint-disable @typescript-eslint/no-explicit-any */
import { CSSObjectWithLabel, StylesConfig } from 'react-select';
import AsyncSelect from 'react-select/async';
import { ISelectOptions } from '../../types';
import { useEffect, useState } from 'react';

const customStyles: StylesConfig = {
  control: (styles) => ({
    ...styles,
    backgroundColor: 'white',
    boxShadow: 'none',
    width: '100%',
    maxHeight: '20px',
    border: 'none',
    fontSize: '14px',
    color: 'gray.500',
    paddingLeft: '3px',
  }),
  option: (styles: CSSObjectWithLabel, { isFocused }: any) => ({
    ...styles,
    backgroundColor: isFocused && '#FF692E',
    color: isFocused ? 'white' : '#667085',
  }),
  menuList: (styles) => ({
    ...styles,
    maxHeight: '200px',
    overflow: 'auto',
  }),
  singleValue: (styles) => ({
    ...styles,
    color: 'hsl(0, 0%, 20%)',
  }),
};

interface IProps {
  value?: ISelectOptions | null;
  loadOptions?: (inputValue: string) => void;
  styles?: StylesConfig;
  loadMoreOptions?: () => void;
  options: ISelectOptions[];
  onChange: (newValue: ISelectOptions) => void;
  placeHolder?: string;
  isDisabled?: boolean;
  isMulti?: boolean;
}

/**
 * @description loadOptions - Function that returns a promise, which is the set of options to be used once the promise resolves.
 * @description defaultOptions - The default set of options to show before the user starts searching. When set to `true`, the results for loadOptions('') will be autoLoaded.
 * @description cacheOptions - If cacheOptions is truthy, then the loaded data will be cached. The cache will remain until `cacheOptions` changes value.
 */

const AsyncDropdownField: React.FC<IProps> = (props: IProps) => {
  const {
    value = null,
    styles = customStyles,
    placeHolder = 'Select Option',
    onChange,
    isMulti,
  } = props;
  const [selectedValue, setSelectedValue] = useState(value);

  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  function handleOnchange(selectedValue: unknown) {
    const selectedOption = selectedValue as ISelectOptions;
    if (selectedOption == null) {
      return;
    }
    setSelectedValue(selectedOption);
    onChange(selectedOption);
  }
  return (
    <AsyncSelect
      isMulti={isMulti}
      styles={styles}
      placeholder={placeHolder}
      components={{
        IndicatorSeparator: null,
      }}
      className='selectBox'
      onMenuScrollToBottom={props.loadMoreOptions}
      loadOptions={props.loadOptions}
      value={selectedValue}
      cacheOptions={true}
      defaultOptions={props.options}
      onChange={handleOnchange}
      isDisabled={props.isDisabled || false}
    />
  );
};

export default AsyncDropdownField;
