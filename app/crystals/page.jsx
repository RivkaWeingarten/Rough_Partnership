
import crystals from '@/crystals.json';
import CrystalTable from '@/components/CrystalTable';

function CrystalsPage() {
  return (
    <div>  
      <section className="px-4 py-6">
    <div className="container-xl lg:container m-auto px-4 py-6">
     {crystals.length===0 ? (<p>no diamonds in this lot</p>):(<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
{/* 
{crystals.map((crystal)=> (
  <div>{crystal.resourceNumber}</div>
))} */}
<CrystalTable />
</div>)}
      
       </div>
       </section>
      </div>
  )
}

export default CrystalsPage