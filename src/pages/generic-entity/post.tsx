// import libraries
import { ChangeEvent, FormEvent, useState } from 'react';
import { useRouter } from 'next/router';
// import utils
import { randomColor } from '@/utils/Colors.utils';
// import types
import { EntityFormData } from '@/types/EntityFormData';
// import hooks
import usePostOneEntityData from '@/hooks/usePostEntityData';

const entityName: Partial<EntityFormData> = {
  entityName: "generic-entity"
};

// Options pour les sélecteurs
const ENTITY_TYPES = ['type 1', 'type 2', 'type 3', 'unset'];
const ENTITY_CATEGORIES = ['Categorie 1', 'Categorie 2'];

const PostEntity: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<Omit<EntityFormData, 'id'> & { entityCategory: string; entityType: string, entityName: string ,entityColor: string }>({
    entityCategory: ENTITY_CATEGORIES[0] as string,
    entityName: 'entity',
    entityType: ENTITY_TYPES[0] as string,
    entityColor: '',
  });
  const [isFormComplete, setIsFormComplete] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value,}));
    if (formData.entityType && formData.entityCategory && formData.entityName) { setIsFormComplete(true); }
    else { setIsFormComplete(false); }
  };

  const { mutate } = usePostOneEntityData();
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const finalData = { ...formData, entityColor: formData.entityColor || randomColor() };

    mutate({ formData, finalData, entityName });
  };

  return (
    <div>
      <div className='flex justify-center items-center w-full mt-6 mb-8'>
        <h1 className='text-3xl font-bold text-gray-900'>Create an {formData.entityName}</h1>
      </div>
      <div className='flex justify-center items-center w-full'>
        <div className='w-96 py-16 px-32 bg-gray-100 shadow-lg sm:rounded-lg'>
          <form className='flex justify-center items-center flex-col w-full' onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-900">Name:</label>
              <input type="text" name="entityName" placeholder={formData.entityName} onChange={handleChange} required className={`min-w-[16rem] px-1 py-1 mb-4 rounded-md border-2 bg-white border-red-300 shadow-md shadow-red-100`} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900">Color:</label>
              <input type="text" name="entityColor" placeholder={formData.entityColor} onChange={handleChange} required className={`min-w-[16rem] px-1 py-1 mb-4 rounded-md border-2 bg-white border-red-300 shadow-md shadow-red-100`} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900">Catégorie:</label>
              <select name="entityCategory" value={formData.entityCategory} onChange={handleChange} required className={`min-w-[16rem] px-1 py-2 mb-4  rounded-md border-2 bg-white border-red-300 shadow-md shadow-red-100`}>
                <option value="default" disabled>- Select a category -</option>
                {ENTITY_CATEGORIES.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900">Type:</label>
              <select name="entityType" value={formData.entityType} onChange={handleChange} required className={`min-w-[16rem] px-1 py-2 mb-12  rounded-md border-2 bg-white border-red-300 shadow-md shadow-red-100`}>
                <option value="default" disabled>- Select a type -</option>
                {ENTITY_TYPES.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div className="block">
              <button type="submit" disabled={!isFormComplete} className={`px-6 py-2 rounded-md text-white transition duration-200 ease-in-out ${ isFormComplete ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed' }`}>Submit</button>
            </div>
          </form>
        </div>
      </div> 
    </div>
  );
};

export default PostEntity;