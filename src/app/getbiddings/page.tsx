"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";

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
import { Checkbox } from "@/Components/ui/checkbox";
import { Header } from "@/Components/Header";

/**
 * Schema rules:
 * - hasStartingBid: required boolean
 * - startingBid: always present (nullable), coerced from string/number/empty → number|null
 * - if hasStartingBid = true  => startingBid must be a number >= 0
 * - if hasStartingBid = false => startingBid must be null
 */
const formSchema = z
  .object({
    email: z.string().email({ message: "Invalid email address." }),
    itemName: z.string().min(1, { message: "Item name is required" }),
    hasStartingBid: z.boolean(),
    startingBid: z.preprocess((val) => {
      if (val === "" || val === undefined || val === null) return null;
      if (typeof val === "string") return Number(val);
      return val; // number or null
    }, z.number().nonnegative({ message: "Starting bid must be ≥ 0" }).nullable()),
  })
  .superRefine((data, ctx) => {
    // if checkbox is ON -> require a number
    if (data.hasStartingBid && data.startingBid === null) {
      ctx.addIssue({
        path: ["startingBid"],
        code: z.ZodIssueCode.custom,
        message: "Enter a starting bid",
      });
    }
    // if checkbox is OFF -> force null
    if (!data.hasStartingBid && data.startingBid !== null) {
      ctx.addIssue({
        path: ["startingBid"],
        code: z.ZodIssueCode.custom,
        message: "Starting bid should be empty when not enabled",
      });
    }
  });

type FormInput = z.input<typeof formSchema>; // what the form fields hold (strings, etc.)
type FormOutput = z.output<typeof formSchema>; // what zod gives you after parse (numbers/null)

export default function ListItems() {
  const [showStartingBid, setShowStartingBid] = useState(false);

  const form = useForm<FormInput>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      itemName: "",
      hasStartingBid: false,
      startingBid: null,
    },
    mode: "onSubmit",
  });

  const onSubmit = (values: {
    email: string;
    itemName: string;
    hasStartingBid: boolean;
    startingBid: unknown;
  }) => {
    // values.startingBid is number|null here, guaranteed by schema
    console.log("Submitted:", values);
    fetch("https://wasted-uedh.onrender.com/listitems", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
  };

  return (
    <div>
      <Header />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex max-w-[700px] flex-col items-center justify-center min-w-screen h-[80vh] bg-black gap-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-foreground">List Item</h1>
          </div>

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

          {/* Item Name */}
          <FormField
            control={form.control}
            name="itemName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Item Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter item name"
                    className="min-w-[400px] text-foreground -mb-2"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Starting Bid Toggle */}
          <FormField
            control={form.control}
            name="hasStartingBid"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={!!field.value}
                    onCheckedChange={(checked) => {
                      const v = checked === true; // cast "indeterminate" away
                      field.onChange(v);
                      setShowStartingBid(v);
                      // when switching off, clear value to null immediately
                      if (!v)
                        form.setValue("startingBid", null, {
                          shouldValidate: true,
                        });
                    }}
                  />
                </FormControl>
                <FormLabel className="font-normal">
                  Set a starting bid amount
                </FormLabel>
              </FormItem>
            )}
          />

          {/* Starting Bid */}
          {showStartingBid && (
            <FormField
              control={form.control}
              name="startingBid"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Starting Bid Amount</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter starting bid amount"
                      className="min-w-[400px] text-foreground -mb-2"
                      value={field.value ? field.value.toString() : ""} // keep controlled
                      onChange={(e) => field.onChange(e.target.value)} // keep as string for input type
                      onBlur={field.onBlur}
                      name={field.name}
                      ref={field.ref}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <Button type="submit" className="mt-3 w-[400px] active:scale-95">
            List Item
          </Button>
        </form>
      </Form>
    </div>
  );
}
