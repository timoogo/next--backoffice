import { ChangeEvent, FormEvent, useState } from 'react';
import { useRouter } from 'next/router';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

export type UserFormData = {
  name: string;
  email: string;
  phone: string;
  isAdmin: boolean;
};

const UserForm: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<UserFormData>({
    name: '',
    email: '',
    phone: '',
    isAdmin: false,
  });
  const [isFormComplete, setIsFormComplete] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState<string>('');

// eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handlePhoneChange = (value: string, country: string | number ) => {
    if (value[0] !== '+') {
      value = '+' + value;
    }
    setPhoneNumber(value);
    
    checkFormCompleteness();
  };

  const checkFormCompleteness = () => {
    const isNameComplete = formData.name.trim() !== '';
    const isEmailComplete = formData.email.trim() !== '';
    const isPhoneComplete = phoneNumber.trim() !== '';
  
    if (isNameComplete && isEmailComplete && isPhoneComplete) {
      setIsFormComplete(true);
    } else {
      setIsFormComplete(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const updatedValue = type === 'checkbox' ? checked : value;
    setFormData(prevState => ({
      ...prevState,
      [name]: updatedValue,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          phone: phoneNumber 
        }),
      });

      if (!response.ok) {
        throw new Error('Error creating user');
      }

      router.push('/'); 
    } catch (error: unknown) {
      if (error instanceof Error) {
          console.error(`Error creating user: ${error.message}`);
      } else {
          console.error(`An unexpected error occurred.`);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <h1 className='ml-16 text-3xl font-bold mb-4'>Create a User</h1>
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="px-4 py-10 bg-white shadow-lg sm:rounded-lg sm:p-20">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name:</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email:</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone:</label>
              <PhoneInput
                country={'fr'}
                value={phoneNumber}
                onChange={handlePhoneChange}
                inputProps={{
                  name: 'phone',
                  required: true,
                  className: 'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                }}
              />
            </div>
            <div className="flex items-center">
              <input type="checkbox" name="isAdmin" checked={formData.isAdmin} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              <label className="ml-2 block text-sm text-gray-900">Is Admin</label>
            </div>
            <div className="flex justify-end">
              <button type="submit" disabled={!isFormComplete} className={`px-6 py-2 rounded-md text-white transition duration-200 ease-in-out ${isFormComplete ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`}>Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
