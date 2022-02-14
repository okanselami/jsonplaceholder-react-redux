import React from 'react';

import { Select } from 'antd';

import { User } from '../../service/json-placeholder';

type FilterProps = {
  onChange: (value: number) => void;
  options: User[];
};

const Filter: React.FC<FilterProps> = (props) => {
  const { onChange, options } = props;
  return (
    <Select
      allowClear
      placeholder='Select a user'
      optionFilterProp='children'
      onChange={onChange}
    >
      {options.map((option: any) => (
        <Select.Option key={option.id} value={option.id}>
          {option.name}
        </Select.Option>
      ))}
    </Select>
  );
};

export default Filter;
