// Desc: This component is used to display the information boxes on the home page.
import React from "react";
import InfoBox from "./InfoBox";
import getLots from "@/app/actions/getLots";
import { formatNumberCommas } from "@/lib/utils";
import LotStats from "./LotStats";

async function InfoBoxes() {
  const { lots, error } = await getLots();

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <section>
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
          {lots && lots.length > 0 ? (
            lots.map((lot) => (
              <div key={lot.id} lot={lot}>
                <InfoBox
                  heading={lot.lotName}
                  backgroundColor="bg-gray-100"
                  lot={lot}
                  buttonInfo={{
                    link: `/lots/${lot.lotName}`,
                    backgroundColor: "bg-black",
                  }}
                  buttonInfo2={{
                    link: `/lots/${lot.lotName}/edit-lot`,
                    backgroundColor: "bg-green-400",
                  }}
                  buttonInfo3={{
                    link: `/lots/${lot.lotName}/diamonds`,
                    backgroundColor: "bg-purple-400",
                  }}
                >
                  <LotStats lot={lot.lotName} />
                </InfoBox>
              </div>
            ))
          ) : (
            <div>No lots available</div>
          )}
        </div>
      </div>
    </section>
  );
}
export default InfoBoxes;
