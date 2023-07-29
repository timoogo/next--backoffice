import { useState } from 'react';
import { API_ROUTES } from '@/constants/api.routes.constants';
import { Tag } from '../../../types';

interface Option {
  value: string; // Convertir en chaîne de caractères
  label: string;
}

interface TagsPageProps {
  tags: Tag[];
}

interface FormData {
  name: string;
  organizerId: number;
  participantId: number;
  tags: string[]; // Utiliser le type string[] pour les tags
  description: string;
  image: string;
  location: string;
  date: string;
  duration: number;
  status: string;
}

const EventPostPage = ({ tags }: TagsPageProps) => {
  // State pour les champs du formulaire
  const [formData, setFormData] = useState<FormData>({
    name: '',
    organizerId: 1,
    participantId: 1,
    tags: [], // Utiliser le type string[] pour les tags
    description: '',
    image: '',
    location: '',
    date: '2023-07-01',
    duration: 120,
    status: 'En cours',
  });

  const tagsToOptions = (tags: Tag[]): Option[] => {
    return tags.map((tag: Tag) => {
      return {
        value: tag.id.toString(), // Convertir en chaîne de caractères
        label: tag.tagName,
      };
    });
  };

  const options = tagsToOptions(tags);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Envoi des données à l'API
    fetch('http://localhost:3001/api/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Faire quelque chose avec la réponse de l'API si nécessaire
        console.log('Événement créé avec succès :', data);
      })
      .catch((error) => {
        console.error('Erreur lors de la création de l\'événement :', error);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom de l'événement :</label>
          <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
        </div>

        {/* Ajoute d'autres champs du formulaire ici */}

        <div>
          <label>Tags :</label>
          <select
            name="tags"
            multiple
            value={formData.tags} // Utiliser le type string[] pour les tags
            onChange={(e) => {
              const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
              setFormData({ ...formData, tags: selectedOptions });
            }}
            required
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Ajoute d'autres champs du formulaire ici */}

        <button type="submit">Créer l'événement</button>
      </form>
    </>
  );
};

export default EventPostPage;
