import { notFound } from "next/navigation";
import getResourceNumbers from "@/app/actions/getResourceNumbers";
import CrystalAccordion from "@/components/crystals/CrystalAccordion";
import LotStats from "@/components/LotStats";
const LotDetail = async ({ params }) => {
  const { id } = params;

  if (!id) {
    return notFound();
  }

  const { resourceNumbers, error } = await getResourceNumbers(id);

  if (error) {
    return (
      <div>
        <section className="px-4 py-6">
          <div className="container mx-auto px-4 py-6">
            <p>Error: {error}</p>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div>
      <section className="px-4 py-6">
        <div className="container mx-auto px-4 py-6">
          {resourceNumbers?.length === 0 ? (
            <p>No diamonds in lot {id}</p>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              <LotStats lot={id} />
              {resourceNumbers?.map((resourceNumber) => (
                <CrystalAccordion
                  key={resourceNumber.id}
                  resourceNumber={resourceNumber}
                  lot={id}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default LotDetail;

// import getResourceNumbers from "../actions/getResourceNumbers";
// import CrystalAccordion from "@/components/CrystalAccordion";

// async function CrystalsPage() {
//   const { resourceNumbers, error } = await getResourceNumbers();
//   return (
//     <div>
//       <section className="px-4 py-6">
//         <div className="container mx-auto px-4 py-6">
//           {resourceNumbers?.length === 0 ? (
//             <p>No diamonds in this lot</p>
//           ) : (
//             <div className="grid grid-cols-1 gap-6">
//               {resourceNumbers?.map((resourceNumber) => (
//                 <CrystalAccordion
//                   key={resourceNumber.id}
//                   resourceNumber={resourceNumber}
//                 />
//                               ))}
//             </div>
//           )}
//         </div>
//       </section>
//     </div>
//   );
// }

// export default CrystalsPage;
