'use client'
import React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import crystals from "@/crystals.json";
import { useState } from "react";

// "_id": "1",
// "resourceNumber": "240-1",
// "Lot":"240",
// "type": "Rough",
// "originalWeight": 5.55,
// "description": "This is a beautiful diamond with many options.",
// "fluor": "NN",
// "notes": "This diamond rocks",
// "machineColor": "I",
// "roughColor":"J",
// "machineClarity": "VS1",
// "roughClarity":"VS2",
const columns = [
  {
    accessorKey: "resourceNumber",
    header: "Resource Number",
    cell: (props) => <p>{props.getValue()}</p>,
  },
  {
    accessorKey: "originalWeight",
    header: "Original Weight",
    cell: (props) => <p>{props.getValue()}</p>,
  },
  {
    accessorKey: "fluor",
    header: "Fluor",
    cell: (props) => <p>{props.getValue()}</p>,
  },
  {
    accessorKey: "roughNotes",
    header: "Notes",
    cell: (props) => <p>{props.getValue()}</p>,
  },
];
export default function CrystalTable() {
  const [data, setData] = useState(crystals);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel:getCoreRowModel()
  });
console.log(getCoreRowModel())
  return <>
<div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
    </>;
}
