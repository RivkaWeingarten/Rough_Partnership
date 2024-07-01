import crystals from "@/crystals.json";
// import CrystalTable from '@/components/CrystalTable';
import CrystalAccordion from "@/components/CrystalAccordion";

function CrystalsPage() {
  return (
    <div>
   
      <section className="px-4 py-6">
      
      <div className="container mx-auto px-4 py-6">
     {crystals.length===0 ? (<p>no diamonds in this lot</p>):(<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
 
 {crystals.map((crystal)=> (
<CrystalAccordion  key= {crystal._id} crystal={crystal} />
))} 

</div>)}
      
       </div>
       </section>
      </div>
  )
}

export default CrystalsPage;
