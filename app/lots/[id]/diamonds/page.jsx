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
  const diamondsFlat = resourceNumbers.flatMap(roughItem => roughItem.diamonds);

  // Calculate the total actTotalList and estTotalPrice for all diamonds
  const totalList = diamondsFlat.reduce(
    (sum, diamond) => sum + diamond.actTotalList,
    0
  );

  const totalEstPrice = diamondsFlat.reduce(
    (sum, diamond) => sum + diamond.estTotalPrice,
    0
  );

  return (
    <div>
      <section className="px-4 py-6">
        <div className="container mx-auto px-4 py-6">
          {resourceNumbers?.length === 0 ? (
            <p>No diamonds in lot {id}</p>
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-4">
                Lot {id} Value: ${formatNumberCommas(totalEstPrice)}
                 {" "} List: ${formatNumberCommas(totalList)}
                 {" "} {formatNumberCommas(100-(totalEstPrice/totalList)*100)}%

              </h2>
              <table className="table-auto w-full">
                <thead>
                  <tr>
                    <th className="px-4 py-2">Resource</th>
                    <th className="px-4 py-2">Est Weight</th>
                    <th className="px-4 py-2">Est Color</th>
                    <th className="px-4 py-2">Est Clarity</th>
                    <th className="px-4 py-2">Price</th>
                    <th className="px-4 py-2">Location</th>
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
                        <td className="border px-4 py-2">{diamond.location}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default LotDiamondsDetail;
