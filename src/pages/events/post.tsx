import { API_ROUTES } from '@/constants/api.routes.constants';
import { useState, useEffect } from 'react';



export const getServerSideProps = async () => {
  const res = await fetch('http://localhost:3001/api/tags');
  const tags = await res.json();
  console.log({res, tags});
  
  return {
    props: {
      tags
    }
  };
}

interface Tag {
  id: number;
  tagName: string;
  tagCategory: string;
  tagType: string;
}

interface TagsPageProps {
  tags: Tag[];
}


const EventPostPage = ({tags }: TagsPageProps) => {
  return (<>
   <select name="tag" id="">
      {tags.map((tag: Tag) => {
        return (
          <option value={tag.id}>{tag.tagName}</option>
        )
      }
      )}
   </select>
  </>
  )
}


export default EventPostPage;