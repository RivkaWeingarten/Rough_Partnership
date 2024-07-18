//when clicking on create new OR model, create a new model from scratch
function nextModel(currentModel) {
  currentModel = currentModel + 1;
  return currentModel;
}
//when clicking add stone part create another stone part with A, B or C
function nextStonePart(currentStonePart) {
  let currentStonePartLetter = currentStonePart[0];
  if (currentStonePartLetter === "A") {
    currentStonePart = "B";
  } else if (currentStonePartLetter === "B") currentStonePart = "C";
  else {
    currentStonePart = "Only ABC stones allowed";
  }
  return currentStonePart;
}
//when pressing Or (should be present on every div)
function addOrStone(currentStonePart) {
  let orStoneNumber = parseFloat(currentStonePart.slice(1));
  let currentStonePartLetter = currentStonePart[0];
  let newStonePartandNumber;
  //no additions yet
  if (currentStonePart.length === 1) {
    orStoneNumber = 1;
  } else {
    orStoneNumber = orStoneNumber + 1;
  }
  newStonePartandNumber = currentStonePartLetter + orStoneNumber;
  return newStonePartandNumber;
}

// Orstone = addOrStone("C2");
// stonePart = nextStonePart("B7");
// model = nextModel(1);
console.log(result);

<div className="flex flex-wrap items-center space-y-2 sm:space-y-0 sm:space-x-4">
  <input className="flex items-center w-full sm:w-auto sm:min-w-[150px]">
    {option.program}@
  </input>
  {/* <input
  type="text"
  value={option.program}
  className="border rounded w-full sm:w-24 py-2 px-3"
  readOnly
/> */}
  {/* <label className="mr-2 sm:w-[150px]">
  Est. Weight
</label> */}
  <input
    type="number"
    step="0.01"
    id={`estWeight.${stone.id}.${option.program}`}
    name={`estWeight.${stone.id}.${option.program}`}
    className="border rounded w-full py-2 px-3 sm:w-[150px]"
    placeholder="Carats"
  />
</div>;
// import { totalPriceWithDiscount } from "@/lib/utils";

// console.log(totalPriceWithDiscount(1000,10,2.25))