import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { selectUsers, selectIsLoading, selectError, fetchUsers } from "../store/users/usersSlice";

const UsersList = () => {

  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch])

  if (isLoading) {
    return <h2>Loading...</h2>
  }

  if (error) {
    return <p>Something went wrong</p>
  }

  return (
    <ul>
      {users.map((user) => (
        <li key={user.login.uuid}>
          {user.name.first} {user.name.last}
        </li>
      ))}
    </ul>
  )
}

export default UsersList;
