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
    <div>
      <h1>{tag.tagName}</h1>
      <p>{tag.tagCategory}</p>
      <p>{tag.tagType}</p>
     {tag.tagColor && <p>{tag.tagColor}</p>}
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