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
    <div>
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
      {/* Add more StatCard components for other statistics */}
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
