import { ChangeEvent, FormEvent, useState } from 'react';
import { useRouter } from 'next/router';  // Ne pas oublier d'importer ceci

export type TagFormData = {
    id: string;
    tagCategory: string;
    tagName: string;
    tagType: string;
    tagColor?: string;
};

const PostTag: React.FC = () => {
  const router = useRouter(); // Pour la redirection

  const [formData, setFormData] = useState<Omit<TagFormData, 'id'>>({
    tagCategory: '',
    tagName: '',
    tagType: '',
    tagColor: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  function randomHexColor(): string {
    let color = '#';
    for (let i = 0; i < 6; i++) {
      const random = Math.random();
      const bit = (random * 16) | 0;
      color += (bit).toString(16);
    }
    return color;
  }

  function getContrastingTextColor(tagColor: string): string {
    const r = parseInt(tagColor.substr(1, 2), 16);
    const g = parseInt(tagColor.substr(3, 2), 16);
    const b = parseInt(tagColor.substr(5, 2), 16);
  
    const luminosity = (0.299 * r + 0.587 * g + 0.114 * b);
    return luminosity > 128 ? 'text-black' : 'text-white';
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Assignation d'une couleur aléatoire si tagColor est vide
    if (!formData.tagColor) {
      let newColor = randomHexColor();
      while (getContrastingTextColor(newColor) === 'text-black') {
        newColor = randomHexColor();
      }
      formData.tagColor = newColor;
    }

    try {
      const response = await fetch("http://localhost:3001/api/tags", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la création du tag");
      }

      // Au lieu d'utiliser une alerte, redirigez vers l'index.
      router.push('/tags'); 
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Une erreur inattendue s'est produite.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Catégorie: </label>
        <input type="text" name="tagCategory" value={formData.tagCategory} onChange={handleChange} required />
      </div>
      <div>
        <label>Nom: </label>
        <input type="text" name="tagName" value={formData.tagName} onChange={handleChange} required />
      </div>
      <div>
        <label>Type: </label>
        <input type="text" name="tagType" value={formData.tagType} onChange={handleChange} required />
      </div>
      <div>
        <label>Couleur: </label>
        <input type="text" name="tagColor" value={formData.tagColor} onChange={handleChange} />
      </div>
      <button type="submit">Créer</button>
    </form>
  );
};

export default PostTag;
