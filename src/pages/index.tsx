// Import components
import StatCard from '@/components/Cards/StatCard';
import CrudCard from '@/components/Cards/CrudCard';
// Import hooks
import useFetchEntityData from '@/hooks/useFetchEntityData';

const IndexPage = () => {
    const totalEntities = /*useFetchEntityData().data*/ "None"

    return (
        <>
            <h1 className="text-6xl mb-4">Dashboard</h1>
            <StatCard value={`${totalEntities}`} redirection='/generic-entity' />
            <CrudCard />
        </>
    );
};

export default IndexPage;