import { notFound } from 'next/navigation';
import getResourceNumbers from '@/app/actions/getResourceNumbers';
import EditCrystalForm from '@/components/EditCrystalForm';


const EditCrystalPage = async ({ params }) => {
    const { resourceNumber, id } = params;
  
    // Fetch the data using your existing getResourceNumbers function
    const { resourceNumbers, error } = await getResourceNumbers(id);
  
    if (error || !resourceNumbers) {
      return notFound();
    }
  
    // Find the specific resource by resourceNumber
    const resourceData = resourceNumbers.find(
      (resource) => resource.resourceNumber === resourceNumber
    );
  
    // If the specific resourceNumber is not found
    if (!resourceData) {
      return notFound();
    }
  
    return (
      <div>
        <section className="px-4 py-6">
     
           
            <div className="grid grid-cols-1 gap-6">
              <EditCrystalForm resourceData={resourceData} />
            </div>
       
        </section>
      </div>
    );
  };
  
  export default EditCrystalPage;