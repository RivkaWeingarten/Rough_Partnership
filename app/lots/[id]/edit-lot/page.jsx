import React from "react";
import EditLotForm from "@/components/lots/EditLotForm";
import { notFound } from "next/navigation";

export default function EditLotPage({ params }) {
  const { id } = params;

  if (!id) {
    return notFound();
  }

  return <EditLotForm lotName={id} />;
}
