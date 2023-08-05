import { ChangeEvent, FormEvent, useState } from 'react';
import { useRouter } from 'next/router';

export type EventFormData = {
  name: string;
  organizer: { id: number };
  participants: Array<{ id: number }>;
  tags: { id: number };
  description: string;
  image: string;
  location: string;
  date: string;
  duration: number;
  status: string;
};

const EVENT_STATUS = ['En cours', 'Complété', 'Annulé'];

const PostEvent: React.FC = () => {
  const router = useRouter();

  const [formData, setFormData] = useState<EventFormData>({
    name: '',
    organizer: { id: 0 },
    participants: [{ id: 0 }],
    tags: { id: 0 },
    description: '',
    image: '',
    location: '',
    date: '',
    duration: 0,
    status: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  

  const handleOrganizerChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData(prev => ({ ...prev, organizer: { id: parseInt(value) } }));
  };

  const handleParticipantChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData(prev => ({ ...prev, participants: [{ id: parseInt(value) }] }));
  };

  const handleTagChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData(prev => ({ ...prev, tags: { id: parseInt(value) } }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la création de l\'événement');
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
      <h1 className='ml-16 text-3xl font-bold mb-4'>Créer un événement</h1>
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="px-4 py-10 bg-white shadow-lg sm:rounded-lg sm:p-20">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nom de l'événement:</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full" />
            </div>
  
            <div>
              <label className="block text-sm font-medium text-gray-700">ID de l'organisateur:</label>
              <input type="number" name="organizerId" onChange={handleOrganizerChange} required className="mt-1 block w-full" />
            </div>
  
            <div>
              <label className="block text-sm font-medium text-gray-700">ID du participant:</label>
              <input type="number" name="participantId" onChange={handleParticipantChange} required className="mt-1 block w-full" />
            </div>
  
            <div>
              <label className="block text-sm font-medium text-gray-700">ID du tag:</label>
              <input type="number" name="tagId" onChange={handleTagChange} required className="mt-1 block w-full" />
            </div>
  
            <div>
              <label className="block text-sm font-medium text-gray-700">Description:</label>
              <textarea name="description" value={formData.description} onChange={handleChange} required className="mt-1 block w-full"></textarea>
            </div>
  
            <div>
              <label className="block text-sm font-medium text-gray-700">Image:</label>
              <input type="text" name="image" value={formData.image} onChange={handleChange} required className="mt-1 block w-full" />
            </div>
  
            <div>
              <label className="block text-sm font-medium text-gray-700">Lieu:</label>
              <input type="text" name="location" value={formData.location} onChange={handleChange} required className="mt-1 block w-full" />
            </div>
  
            <div>
              <label className="block text-sm font-medium text-gray-700">Date:</label>
              <input type="date" name="date" value={formData.date} onChange={handleChange} required className="mt-1 block w-full" />
            </div>
  
            <div>
              <label className="block text-sm font-medium text-gray-700">Durée (en minutes):</label>
              <input type="number" name="duration" value={formData.duration} onChange={handleChange} required className="mt-1 block w-full" />
            </div>
  
            <div>
              <label className="block text-sm font-medium text-gray-700">Statut:</label>
              <select name="status" value={formData.status} onChange={handleChange} required className="mt-1 block w-full">
                <option value="">Choisir un statut</option>
                {EVENT_STATUS.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
  
            <div className="flex justify-end">
              <button type="submit" className="px-6 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700">
                Soumettre
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
  
};

export default PostEvent;
