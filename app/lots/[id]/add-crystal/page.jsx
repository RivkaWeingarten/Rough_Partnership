import AddCrystalForm from "@/components/AddCrystalForm";
import { notFound } from 'next/navigation';

export default function AddCrystalPage({ params }) {
  const { id } = params;

  if (!id) {
    return notFound();
  }

  return <AddCrystalForm lotName={id} />;
}

