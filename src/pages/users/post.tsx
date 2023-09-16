import { ChangeEvent, FormEvent, useState } from 'react';
import { useRouter } from 'next/router';
import { parsePhoneNumberFromString, AsYouType } from 'libphonenumber-js';
import { CountryOption, countries } from '@/constants/country.options.constants';

import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

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
  const [countryCode, setCountryCode] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const handlePhoneChange = (value: string, country: any) => {
    // si ça commence par un country code, on ajoute le + devant
    if (value[0] !== '+') {
      value = '+' + value;
    }
    setPhoneNumber(value);
    setCountryCode(country.iso2); // Si vous voulez aussi garder le code du pays
    console.log(countryCode, phoneNumber);
    
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
          phone: phoneNumber // Send the full phone number (with country code) to the server
        }),
      });

      if (!response.ok) {
        throw new Error('Error creating user');
      }

      router.push('/'); // Redirect to home page after successful creation
    } catch (error: any) {
      console.error('An error occurred while creating the user:', error.message);
    }
  };


  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <h1 className='ml-16 text-3xl font-bold mb-4'>Create a User</h1>
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="px-4 py-10 bg-white shadow-lg sm:rounded-lg sm:p-20">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name:
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email:
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div>
  <label className="block text-sm font-medium text-gray-700">
    Téléphone:
  </label>
  <div className="flex space-x-2 items-center">
  <PhoneInput
  country={'fr'}
  value={(phoneNumber)}
  onChange={handlePhoneChange}
  
/>

  </div>
</div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="isAdmin"
                checked={formData.isAdmin}
                onChange={handleChange}
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-900">
                Is Admin
              </label>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={!isFormComplete}
                className={`px-6 py-2 rounded-md text-white transition duration-200 ease-in-out ${
                  isFormComplete
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
