import GenericSelect from '@/components/GenericSelect/GenericSelect';
import { API_ROUTES } from '@/constants/api.routes.constants';
import { useState, useEffect } from 'react';
import { Tag } from '../../../types';

export const getServerSideProps = async () => {
  const res = await fetch('http://localhost:3001/api/tags');
  const tags = await res.json();
  console.log({ res, tags });

  return {
    props: {
      tags,
    },
  };
};



interface Option {
  value: number;
  label: string;
}

interface TagsPageProps {
  tags: Tag[];
}

const EventPostPage = ({ tags }: TagsPageProps) => {
  const tagsToOptions = (tags: Tag[]): Option[] => {
    return tags.map((tag: Tag) => {
      return {
        value: tag.id,
        label: tag.tagName,
      };
    });
  };

  const options = tagsToOptions(tags);

  return (
    <>
      <GenericSelect<Option> name="tags" options={options} />
    </>
  );
};

export default EventPostPage;
