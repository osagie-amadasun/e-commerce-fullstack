"use client";
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";

const categories = [
  "T-shirts",
  "Shoes",
  "Accessories",
  "Bags",
  "Dresses",
  "Jackets",
  "Gloves",
] as const;

const colours = [
  "blue",
  "green",
  "red",
  "yellow",
  "purple",
  "orange",
  "pink",
  "brown",
  "gray",
  "black",
  "white",
] as const;

const sizes = [
  "xs",
  "s",
  "m",
  "l",
  "xl",
  "xxl",
  "34",
  "35",
  "36",
  "37",
  "38",
  "39",
  "40",
  "41",
  "42",
  "43",
  "44",
  "45",
  "46",
  "47",
  "48",
] as const;

const formSchema = z.object({
  name: z.string().min(1, { message: "Product name is required!" }),
  shortDescription: z
    .string()
    .min(1, { message: "Short description is required!" })
    .max(60, {
      message: "Short description should be less than 60 characters!",
    }),
  description: z.string().min(1, { message: "Description is required!" }),
  price: z.number().min(1, { message: "Price is required!" }),
  category: z.enum(categories),
  sizes: z.array(z.enum(sizes)),
  colors: z.array(z.enum(colours)),
  images: z.record(z.enum(colours), z.string()),
});

export default function AddProduct() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      shortDescription: "",
      description: "",
      price: 0,
      category: undefined,
      sizes: [],
      colors: [],
      images: {},
    },
  });

  return (
    <SheetContent className="overflow-y-auto">
      <SheetHeader>
        <SheetTitle className="mb-4">Add Product</SheetTitle>
        <SheetDescription asChild>
          <Form {...form}>
            <form className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>Enter product name.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="shortDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Short Description</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter product short description.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter product description.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormDescription>Enter product price.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormDescription>Select product category.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="sizes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sizes</FormLabel>
                    <FormControl>
                      <div className="grid grid-cols-3 gap-4 my-2">
                        {sizes.map((size) => (
                          <div key={size} className="flex items-center gap-2">
                            <Checkbox
                              id={size}
                              checked={field.value?.includes(size)}
                              onCheckedChange={(checked) => {
                                const currentValues = field.value || [];
                                if (checked) {
                                  field.onChange([...currentValues, size]);
                                } else {
                                  field.onChange(
                                    currentValues.filter((s) => s !== size)
                                  );
                                }
                              }}
                            />
                            <Label htmlFor={size} className="text-xs">
                              {size}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </FormControl>
                    <FormDescription>Select product size.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="colors"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Colours</FormLabel>
                    <FormControl>
                      <div className="space-y-4">
                        <div className="grid grid-cols-3 gap-4 my-2">
                          {colours.map((colour) => (
                            <div
                              key={colour}
                              className="flex items-center gap-2"
                            >
                              <Checkbox
                                id={colour}
                                checked={field.value?.includes(colour)}
                                onCheckedChange={(checked) => {
                                  const currentValues = field.value || [];
                                  if (checked) {
                                    field.onChange([...currentValues, colour]);
                                  } else {
                                    field.onChange(
                                      currentValues.filter((c) => c !== colour)
                                    );
                                  }
                                }}
                              />
                              <Label
                                htmlFor={colour}
                                className="text-xs flex items-center gap-2"
                              >
                                <div
                                  className="w-4 h-4 rounded-full"
                                  style={{ backgroundColor: colour }}
                                />
                                {colour}
                              </Label>
                            </div>
                          ))}
                        </div>
                        {field.value && field.value.length > 0 && (
                          <div className="">
                            <p>Upload images for the selected colours</p>
                            {field.value.map((colour) => (
                              <div key={colour} className="my-2">
                                <div className="flex items-center gap-2">
                                  <div
                                    className="w-4 h-4 rounded-full"
                                    style={{ backgroundColor: colour }}
                                  />
                                  <span>{colour}</span>
                                </div>
                                <Input type="file" accept="image/*" />
                              </div>
                            ))}
                            <Button
                              type="button"
                              variant="outline"
                              className="w-full"
                            >
                              Upload Images
                            </Button>
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormDescription>Select product colour.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button>Submit</Button>
            </form>
          </Form>
        </SheetDescription>
      </SheetHeader>
    </SheetContent>
  );
}
