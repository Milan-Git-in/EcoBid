import { Header } from "@/Components/Header";
import { columns, Bids } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<Bids[]> {
  const res = await fetch("https://wasted-uedh.onrender.com/bids", {
    next: { revalidate: 60 },
  });
  try {
    const data: Bids[] = await res.json();
    if (data.length < 1)
      return [
        {
          id: "No bids",
          amount: 0,
          name: "Unknown",
          status: "Pending",
          email: "Nobids@gmail.com",
        },
      ];
    return data;
  } catch {
    return [
      {
        id: "No bids",
        amount: 0,
        name: "Unknown",
        status: "Pending",
        email: "Nobids@gmail.com",
      },
    ];
  }
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10 ">
      <Header />
      <DataTable columns={columns} data={data} />
    </div>
  );
}
