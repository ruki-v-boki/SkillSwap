import { useParams } from 'react-router-dom';
import { MOCK_USERS } from '@/mock/users';
import { CardUI } from '../../Card';

export function UserCardModal() {
  const { id } = useParams();
  const user = MOCK_USERS.find(u => u.id === id);

  return <CardUI user={user!} type="modal" />; // user! здесь точно должен быть
}