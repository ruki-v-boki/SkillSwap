import { selectAllUsers } from '@/services/slices/users/userSlice';
import { useSelector } from '@/services/store';
import { useParams } from 'react-router-dom';
import { CardUI } from '../../Card';


export function UserCardModal() {
  const allUsers = useSelector(selectAllUsers);
  const { id } = useParams();
  const user = allUsers.find(u => u.id === id);

  return (
    <CardUI
      user={user!}
      styleType="modal"
    />
  )
}