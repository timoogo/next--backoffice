import StatCard from '@/components/Card/StatCard';
import React from 'react';
import { FaUser, FaTags, FaCalendar, FaBuilding } from 'react-icons/fa';

interface StatData {
  totalUsers: number;
  totalTags: number;
  totalEvents: number;
  totalOrganizations: number;
  // Add other statistics as needed
}

const IndexPage = ({ statData }: { statData: StatData }) => {
  return (
<div className="bg-gray-200 p-4 min-h-screen">
  <div className="flex flex-col py-2">
    <h1 className="text-6xl py-2 ">Dashboard</h1>
    <div className="flex flex-row flex-wrap">
      <StatCard
        title="Total Users"
        value={`${statData.totalUsers}`}
        description="Total Users"
        icon={<FaUser />}
      />
      <StatCard
        title="Total Tags"
        value={`${statData.totalTags}`}
        description="Total Tags"
        icon={<FaTags />}
      />
      <StatCard
        title="Total Events"
        value={`${statData.totalEvents}`}
        description="Total Events"
        icon={<FaCalendar />}
      />
      <StatCard
        title="Total Organizations"
        value={`${statData.totalOrganizations}`}
        description="Total Organizations"
        icon={<FaBuilding />}
      />
      {/* Ajoutez plus de composants StatCard pour d'autres statistiques */}
    </div>
  </div>
</div>

  );
};

export async function getStaticProps() {
  const apiUrlUsers = 'http://localhost:3001/api/users';
  const apiUrlTags = 'http://localhost:3001/api/tags';
  const apiUrlEvents = 'http://localhost:3001/api/events';
  const apiUrlOrganizations = 'http://localhost:3001/api/organizations';

  try {
    const [responseUsers, responseTags, responseEvents, responseOrganizations] =
      await Promise.all([
        fetch(apiUrlUsers),
        fetch(apiUrlTags),
        fetch(apiUrlEvents),
        fetch(apiUrlOrganizations),
      ]);

    const users = await responseUsers.json();
    const tags = await responseTags.json();
    const events = await responseEvents.json();
    const organizations = await responseOrganizations.json();

    const data: StatData = {
      totalUsers: users.length,
      totalTags: tags.length,
      totalEvents: events.length,
      totalOrganizations: organizations.length,
      // Add other statistics as needed
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
          totalUsers: 0,
          totalTags: 0,
          totalEvents: 0,
          totalOrganizations: 0,
          // Add other statistics as needed with default values
        },
      },
    };
  }
}

export default IndexPage;
