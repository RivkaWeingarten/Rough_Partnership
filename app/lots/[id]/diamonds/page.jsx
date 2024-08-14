import { notFound } from "next/navigation";
import getResourceNumbers from "@/app/actions/getResourceNumbers";
import { formatNumberCommas } from "@/lib/utils";
const LotDiamondsDetail = async ({ params }) => {
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
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2">Resource</th>
                  <th className="px-4 py-2">Est Weight</th>
                  <th className="px-4 py-2">Est Color</th>
                  <th className="px-4 py-2">Est Clarity</th>
                  <th className="px-4 py-2">Price</th>
                  <th className="px-4 py-2">Est Program</th>
                </tr>
              </thead>
              <tbody>
                {resourceNumbers.map((roughItem) =>
                  roughItem.diamonds.map((diamond) => (
                    <tr key={diamond.id}>
                      <td className="border px-4 py-2">
                        {diamond.resourceNumber}
                      </td>
                      <td className="border px-4 py-2">
                      {diamond.estimatedProgram} @ {diamond.estimatedWeight}
                      </td>
                      <td className="border px-4 py-2">
                        {diamond.estimatedColor}
                      </td>
                      <td className="border px-4 py-2">
                        {diamond.estimatedClarity}
                      </td>
                      <td className="border px-4 py-2">
                        {formatNumberCommas(diamond.estTotalPrice)}
                      </td>
                      <td className="border px-4 py-2">
                        {diamond.estShape}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </div>
  );
};

export default LotDiamondsDetail;
