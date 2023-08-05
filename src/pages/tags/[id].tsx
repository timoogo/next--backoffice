import { API_ROUTES } from '@/constants/api.routes.constants';
import { GetServerSideProps } from 'next';

interface Tag {
  id: string;
  tagCategory: string;
  tagName: string;
  tagType: string;
  tagColor?: string;
}

interface TagPageProps {
  tag: Tag;
}

const TagPage: React.FC<TagPageProps> = ({ tag }) => {
  return (
    <div className="container mx-auto my-8">
      <div className="p-4 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-semibold mb-2">{tag.tagName}</h1>
        <p className="text-gray-600 mb-4">{tag.tagCategory}</p>
        <p className="text-gray-600 mb-4">{tag.tagType}</p>
        {tag.tagColor && (
          <p className="text-gray-600 mb-4">
            <strong>Color:</strong> {tag.tagColor}
          </p>
        )}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const { id } = params!;
    const response = await fetch(`${API_ROUTES.TAGS}/${id}`);
  
    if (!response.ok) {
      throw new Error('Failed to fetch event');
    }
  
    const tag = await response.json();
  
    return {
      props: {
        tag,
      },
    };
  };

export default TagPage;