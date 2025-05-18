/* eslint-disable @typescript-eslint/no-explicit-any */

import Select from 'react-select';
import { ISelectOptions } from '../../types';
import React from 'react';

interface IPrimarySelectProps {
  options: ISelectOptions[];
  onMenuScrollToBottom?: any;
  isLoading?: boolean;
  onChange?: any;
  selectedValue?: ISelectOptions | null;
  placeholder?: string;
  border?: string;
  isDisabled?: boolean;
  height?: string;
  menuIsOpen?: boolean;
  components?: any;
  isSearchable?: boolean;
}

const PrimarySelect: React.FC<IPrimarySelectProps> = (
  props: IPrimarySelectProps,
) => {
  const {
    options,
    onMenuScrollToBottom,
    isLoading,
    onChange,
    selectedValue,
    placeholder,
    border,
    isDisabled,
    height,
    menuIsOpen,
    components,
    isSearchable,
  } = props;

  const customStyles = {
    control: (styles: any) => ({
      ...styles,
      backgroundColor: 'white',
      boxShadow: 'none',
      border: border ?? 'none',
      fontSize: '14px',
      color: 'gray.500',
      paddingLeft: '3px',
      height: height ?? '40px',
    }),
    option: (styles: any, { isFocused }: any) => ({
      ...styles,
      backgroundColor: isFocused && '#FF692E',
      color: isFocused ? 'white' : '#667085',
    }),
  };

  return (
    <Select
      isDisabled={isDisabled}
      placeholder={placeholder}
      options={options}
      styles={customStyles}
      isSearchable={isSearchable}
      components={{
        IndicatorSeparator: () => null,
        ...components,
      }}
      className='selectBox'
      value={selectedValue}
      isLoading={isLoading}
      onChange={onChange}
      onMenuScrollToBottom={onMenuScrollToBottom}
      menuIsOpen={menuIsOpen}
    />
  );
};

export default PrimarySelect;
