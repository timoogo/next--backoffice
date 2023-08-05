import { API_ROUTES } from '@/constants/api.routes.constants';
import { GetServerSideProps } from 'next';
import { User } from '../../../types';
import parsePhoneNumberFromString from 'libphonenumber-js';



interface UserPageProps {
  user: User;
}

const UserPage: React.FC<UserPageProps> = ({ user }) => {


  const handleDate = (date: string, isFull: boolean = false) => {
    // if isFull return dd//mm/yyyy hh:mm
    if (isFull) {
      const day = date.slice(8, 10);
      const month = date.slice(5, 7);
      const year = date.slice(0, 4);
      const hour = date.slice(11, 13);
      const minutes = date.slice(14, 16);
      return `${day}/${month}/${year} - ${hour}:${minutes}`;
    }
    // if not return dd/mm/yyyy
    const day = date.slice(8, 10);
    const month = date.slice(5, 7);
    const year = date.slice(0, 4);
    return `${day}/${month}/${year}`;
  };

  const transformPhone = (phone: string) => {
    // +33 6 12 34 56 78
    const phoneNumber = parsePhoneNumberFromString(phone, 'FR');
    if (phoneNumber) {
      return phoneNumber.formatInternational();
    }
    return phone;

  }

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
    <div className="mb-4">
      <h2 className="text-xl font-semibold mb-2">{user.name}</h2>
      <p className="text-gray-600">{user.email}</p>
    </div>

    <div className="grid grid-cols-2 gap-4 mb-4">
      <div>
        <p>
          <strong>Phone:</strong> {transformPhone(user.phone)}
        </p>
        <p>
          <strong>Created At:</strong> { handleDate(user.createdAt, true) }
        </p>
      </div>
    </div>
  </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const { id } = params!;
    const response = await fetch(`${API_ROUTES.USERS}/${id}`);
  
    if (!response.ok) {
      throw new Error('Failed to fetch user');
    }
  
    const user = await response.json();
  
    return {
      props: {
        user,
      },
    };
  };

export default UserPage;