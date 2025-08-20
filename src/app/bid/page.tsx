"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/Components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/Components/ui/form";
import { Input } from "@/Components/ui/input";
import { Header } from "@/Components/Header";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";

// ---------------- SCHEMA ----------------
const formSchema = z.object({
  amount: z.number().min(1, { message: "Bid must be greater than 0" }),
  email: z.string().email({ message: "Invalid email address." }),
  item: z.string().min(1, { message: "Please select an item" }),
});

type FormValues = z.infer<typeof formSchema>;

type ItemData = {
  itemName: string;
  hasStartingBid: boolean;
  startingBid: number | null;
};

export default function PlaceBids() {
  const [availableLists, setAvailableLists] = useState<ItemData[]>([]);
  const [loading, setLoading] = useState(true);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 10000,
      email: "",
      item: "",
    },
  });

  // ---------------- FETCH ----------------
  useEffect(() => {
    fetch("https://wasted-uedh.onrender.com/availablelists")
      .then((res) => res.json())
      .then((data: ItemData[]) => {
        if (!data || data.length === 0) {
          // dummy item when backend is empty
          setAvailableLists([
            {
              itemName: "No available products",
              hasStartingBid: true,
              startingBid: 100000,
            },
          ]);
        } else {
          setAvailableLists(data);
        }
        setLoading(false);
      })
      .catch(() => {
        setAvailableLists([
          {
            itemName: "No available products",
            hasStartingBid: true,
            startingBid: 100000,
          },
        ]);
        setLoading(false);
      });
  }, []);

  // ---------------- SUBMIT ----------------
  function onSubmit(values: FormValues) {
    const selected = availableLists.find((i) => i.itemName === values.item);

    if (!selected) {
      form.setError("item", { message: "Invalid item selected" });
      return;
    }

    // ✅ Check against startingBid
    if (selected.hasStartingBid && selected.startingBid !== null) {
      if (values.amount < selected.startingBid) {
        form.setError("amount", {
          message: `Bid must be at least ${selected.startingBid}`,
        });
        return;
      }
    }

    console.log("Submitting:", values);

    fetch("https://wasted-uedh.onrender.com/placebids", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
  }

  // ---------------- RENDER ----------------
  return (
    <div>
      <Header />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex max-w-[700px] flex-col items-center justify-center min-w-screen h-[80vh] bg-black gap-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-foreground">Place Bids</h1>
          </div>

          {/* Amount */}
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter bid amount"
                    className="min-w-[400px] text-foreground -mb-2"
                    value={field.value ?? ""}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Email"
                    className="min-w-[400px] text-foreground -mb-2"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Item Dropdown */}
          <FormField
            control={form.control}
            name="item"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Item</FormLabel>
                <FormControl>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">
                        {field.value || "Select an Item"}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuLabel>Available Items</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuRadioGroup
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        {loading ? (
                          <DropdownMenuRadioItem value="loading">
                            Loading...
                          </DropdownMenuRadioItem>
                        ) : (
                          availableLists.map((item) => (
                            <DropdownMenuRadioItem
                              key={item.itemName}
                              value={item.itemName}
                            >
                              {item.itemName}{" "}
                              {item.hasStartingBid && item.startingBid
                                ? `(Min: ${item.startingBid})`
                                : ""}
                            </DropdownMenuRadioItem>
                          ))
                        )}
                      </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="mt-3 w-[400px] active:scale-95">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
