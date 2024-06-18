import React from "react";
import InfoBox from "./InfoBox";

function InfoBoxes() {
  return (
    <section>
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
          <InfoBox
            heading="See all the Rough Diamonds"
            backgroundColor="bg-gray-100"
            buttonInfo={{
              text: "View Diamonds",
              link: "/crystals",
              backgroundColor: "bg-black",
            }}
          >
            See all the diamonds planned and marked
          </InfoBox>

          <InfoBox
            heading="Plan the rough Diamond"
            backgroundColor="bg-blue-100"
            buttonInfo={{
              text: "Plan a Diamond",
              link: "/crystals",
              backgroundColor: "bg-blue-500",
            }}
          >
            See all the the options for planning.
          </InfoBox>
        </div>
      </div>
    </section>
  );
}

export default InfoBoxes;
