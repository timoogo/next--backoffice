import { API_ROUTES } from '@/constants/api.routes.constants';
import { GetServerSideProps } from 'next';
import { useState } from 'react';

interface Entity {
  id: string;
  entityCategory: string;
  entityName: string;
  entityType: string;
  entityColor?: string;
}

interface EntityPageProps {
  entity: Entity;
}

const EntityPage: React.FC<EntityPageProps> = ({ entity }) => {
  const [modifiedEntityName, setModifiedEntityName] = useState(entity.entityName);

  const handleModifyEntity = async () => {
    try {
      const response = await fetch(`${API_ROUTES.ENTITY_NAME}/${entity.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ entityName: modifiedEntityName }),
      });
  
      if (response.ok) {
        console.log('Entity modified successfully');
        entity.entityName = modifiedEntityName;
      } else {
        console.error('Failed to modify entity:', response.statusText);
      }
    } catch (error) {
      console.error('Error modifying entity:', error);
    }
  };

  return (
    <div className="container mx-auto my-8">
      <div className="p-4 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-semibold mb-2">{entity.entityName}</h1>
        <input
          type="text"
          value={modifiedEntityName}
          onChange={(e) => setModifiedEntityName(e.target.value)}
        />
        <button onClick={handleModifyEntity}>Modify Entity Name</button>
        <p className="text-gray-600 mb-4">{entity.entityCategory}</p>
        <p className="text-gray-600 mb-4">{entity.entityType}</p>
        {entity.entityColor && (
          <p className="text-gray-600 mb-4">
            <strong>Color:</strong> {entity.entityColor}
          </p>
        )}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params!;
  const response = await fetch(`${API_ROUTES.ENTITY_NAME}/${id}`);

  if (!response.ok) {
    throw new Error('Failed to fetch event');
  }

  const entity = await response.json();

  return {
    props: {
      entity,
    },
  };
};

export default EntityPage;