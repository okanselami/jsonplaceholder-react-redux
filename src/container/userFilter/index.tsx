import React from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectUser } from '../../state/user/userSlice';

// components
import Filter from '../../components/filter';

function UserFilter() {
  const dispatch = useAppDispatch();

  // selectors
  const users = useAppSelector((state) => state.users);

  return (
    <Filter
      onChange={(value) => dispatch(selectUser(value))}
      options={users.data}
    />
  );
}

export default UserFilter;
