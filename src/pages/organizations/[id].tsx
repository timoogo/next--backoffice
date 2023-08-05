import { API_ROUTES } from '@/constants/api.routes.constants';
import { GetServerSideProps } from 'next';
import { Organization } from '../../../types';
import parsePhoneNumberFromString from 'libphonenumber-js';

interface OrganisationPageProps {
  organisation: Organization;
}

const OrganizationPage: React.FC<OrganisationPageProps> = ({ organisation }) => {
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
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">{organisation.name}</h2>
        <p className="text-gray-600">{organisation.email}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p>
            <strong>Phone:</strong> {transformPhone(organisation.phone)}
          </p>
          <p>
            <strong>Created At:</strong> {handleDate(organisation.createdAt, true)}
          </p>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params!;
  const response = await fetch(`${API_ROUTES.ORGANIZATIONS}/${id}`);

  if (!response.ok) {
    throw new Error('Failed to fetch organisation');
  }

  const organisation = await response.json();

  return {
    props: {
      organisation,
    },
  };
};

export default OrganizationPage;
