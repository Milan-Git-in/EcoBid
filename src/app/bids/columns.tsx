"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Bids = {
  id: string;
  amount: number;
  name: string;
  status: "Bidding" | "Success" | "Failed" | "Pending";
  email: string;
};

export const columns: ColumnDef<Bids>[] = [
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "name",
    header: "name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
];
