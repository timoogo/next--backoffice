import StatCard from '@/components/Card/StatCard';
import React from 'react';
import { FaUser, FaTags, FaCalendar, FaBuilding } from 'react-icons/fa';
import { StatData } from '@/interfaces/StatData.interface';

const IndexPage = ({ statData }: { statData: StatData }) => {
  return (
<div className="bg-gray-200 p-4 min-h-screen">
  <div className="flex flex-col py-2">
    <h1 className="text-6xl py-2 ">Dashboard</h1>
    <div className="flex flex-row flex-wrap">
      <StatCard
        title="Total Entity"
        value={`${statData.totalEntities}`}
        description="Total Entity"
        icon={<FaTags />}
        redirection='/generic-entity'
        accessibilityLabel='Total Entities'
      />
    </div>
  </div>
</div>

  );
};

export async function getStaticProps() {
  const apiUrlEntities = 'http://localhost:3001/api/tags';

  try {
    const [responseEntities] =
      await Promise.all([
        fetch(apiUrlEntities),
      ]);

    const entities = await responseEntities.json();

    const data: StatData = {
      totalEntities: entities.length,
    };

    return {
      props: {
        statData: data,
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);

    return {
      props: {
        statData: {
          totalEntities: 0,
        },
      },
    };
  }
}

export default IndexPage;
