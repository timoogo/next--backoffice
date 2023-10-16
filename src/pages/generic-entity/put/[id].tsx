import { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { API_ROUTES } from '@/constants/api.routes.constants';
import { FaCheck } from 'react-icons/fa';

export type EntityFormData = {
  id: string;
  entityCategory: string;
  entityName: string;
  entityType: string;
  entityColor?: string;
};

const ENTITY_TYPES = ['offline', 'online', 'both'];
const ENTITIES_CATEGORIES = ['GENERAL', 'SPECIFIC'];

interface PutEntityProps {
  entity: EntityFormData;
}

const PutEntity: React.FC<PutEntityProps> = ({ entity }) => {
  const router = useRouter();
  const [displayedentityName, setDisplayedentityName] = useState(entity.entityName);
  const [formData, setFormData] = useState<Omit<EntityFormData, 'id'> & {
    entityCategory: string;
    entityType: string;
  }>({
    entityCategory: entity.entityCategory,
    entityName: entity.entityName,
    entityType: entity.entityType,
    entityColor: '',
  });
  const [isFormComplete, setIsFormComplete] = useState(false);
  const [fieldModifiedStatus, setFieldModifiedStatus] = useState<{
    entityName: boolean;
    entityColor: boolean;
    entityCategory: boolean;
    entityType: boolean;
  }>({
    entityName: false,
    entityColor: false,
    entityCategory: false,
    entityType: false,
  });
  const [colorPickerOpen, setColorPickerOpen] = useState(false);

  useEffect(() => {
    setDisplayedentityName(formData.entityName);

    if (formData.entityType && formData.entityCategory && formData.entityName) {
      setIsFormComplete(true);
    } else {
      setIsFormComplete(false);
    }
  }, [formData.entityName, formData.entityType, formData.entityCategory]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    const isInputModified = value !== entity[name as keyof EntityFormData];
    setFieldModifiedStatus((prev) => ({
      ...prev,
      [name]: isInputModified,
    }));
  };

  const randomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const handleColorPickerToggle = () => {
    setColorPickerOpen(!colorPickerOpen);
  };

  const handleColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      entityColor: e.target.value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const finalData = {
      ...formData,
      entityColor: formData.entityColor || randomColor(),
    };

    try {
      const response = await fetch(`http://localhost:3001/api/tags/${entity.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(finalData),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la modification de l\'entity');
      }

      router.push('/');
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("Une erreur inattendue s'est produite.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <h1 className="ml-16 text-3xl font-bold mb-4">
        Modify the Entity {displayedentityName}
      </h1>
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="px-4 py-10 bg-white shadow-lg sm:rounded-lg sm:p-20">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nom Field */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">
                Nom:
              </label>
              <input
                type="text"
                name="entityName"
                value={formData.entityName}
                onChange={handleChange}
                required
                className={`mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${
                  fieldModifiedStatus.entityName ? 'border-yellow-500' : ''
                }`}
              />
              {fieldModifiedStatus.entityName && (
                <FaCheck className="absolute top-1/2 right-4 transform -translate-y-1/2 text-green-500" />
              )}
            </div>

            {/* Couleur Field */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">
                Couleur:
              </label>
              <div className="flex">
                <input
                  type="text"
                  name="entityColor"
                  value={formData.entityColor}
                  onChange={handleChange}
                  className={`mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${
                    fieldModifiedStatus.entityColor ? 'border-yellow-500' : ''
                  }`}
                />
                <button
                  type="button"
                  className="ml-2 p-1 bg-blue-500 text-white rounded-md"
                  onClick={handleColorPickerToggle}
                >
                  Pick Color
                </button>
              </div>
              {colorPickerOpen && (
                <input
                  type="color"
                  value={formData.entityColor}
                  onChange={handleColorChange}
                  className="mt-1 block"
                />
              )}
              {fieldModifiedStatus.entityColor && (
                <FaCheck className="absolute top-1/2 right-4 transform -translate-y-1/2 text-green-500" />
              )}
            </div>
            {/* Catégorie Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Catégorie:
              </label>
              <select
                name="entityCategory"
                value={formData.entityCategory}
                onChange={handleChange}
                required
                className={`mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md ${
                  fieldModifiedStatus.entityCategory ? 'border-yellow-500' : ''
                }`}
              >
                <option value="" disabled>
                  Select a category
                </option>
                {ENTITIES_CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {fieldModifiedStatus.entityCategory && (
                <FaCheck className="absolute top-1/2 right-4 transform -translate-y-1/2 text-green-500" />
              )}
            </div>

            {/* Type Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Type:
              </label>
              <select
                name="entityType"
                value={formData.entityType}
                onChange={handleChange}
                required
                className={`mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md ${
                  fieldModifiedStatus.entityType ? 'border-yellow-500' : ''
                }`}
              >
                <option value="" disabled>
                  Select a type
                </option>
                {ENTITY_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {fieldModifiedStatus.entityType && (
                <FaCheck className="absolute top-1/2 right-4 transform -translate-y-1/2 text-green-500" />
              )}
            </div>

            {/* Submit Button */}
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

export default PutEntity;

// Get server-side props
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params!;
  const response = await fetch(`${API_ROUTES.ENTITY_NAME}/${id}`);

  if (!response.ok) {
    throw new Error('Failed to fetch entity');
  }

  const entity = await response.json();

  return {
    props: {
      entity,
    },
  };
};
