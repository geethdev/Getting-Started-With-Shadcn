"use client";
import * as React from "react";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

export function ProfileForm2() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  // State variable to track whether the signup button is clicked
  const [isSignUpClicked, setIsSignUpClicked] = useState(false);

  const formSchema = z.object({
    startupName: z.string().min(2, {
      message: "Startup Name must be at least 2 characters.",
    }),
    email: z.string().email({
      message: "Invalid email address.",
    }),
    industry: z.string(),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
    sendOtp: z.string().min(6, {
      message: "OTP must be at least 6 characters.",
    }),
    verifyOtp: z.string().min(6, {
      message: "OTP must be at least 6 characters.",
    }),

    additionalField: z.string().optional(),
  });

  // Define your form setup and submit handler here
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      startupName: "",
      email: "",
      industry: "",
      password: "",
      sendOtp: "",
      verifyOtp: "",
      additionalField: "", // Added default value for the additional field
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // If any required field is empty, prevent form submission
    if (
      !values.startupName ||
      !values.email ||
      !values.industry ||
      !values.password
    ) {
      return;
    }

    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    setIsSignUpClicked(true);
  }

  return (
    <div className="max-w-sm p-3 mx-auto mt-20">
      <h1 className="text-2xl font-bold p-4 text-center">Sign Up</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div>
            <FormField
              control={form.control}
              name="startupName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Startup Name"
                      {...field}
                      disabled={isSignUpClicked}
                    />
                  </FormControl>
                  <FormMessage>{form.errors?.startupName?.message}</FormMessage>
                </FormItem>
              )}
            />
          </div>
          {/* <div className=" ">
            <FormField
              control={form.control}
              name="industry"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Industry"
                      {...field}
                      disabled={isSignUpClicked}
                    />
                  </FormControl>
                  <FormMessage>{form.errors?.industry?.message}</FormMessage>
                </FormItem>
              )}
            />
          </div> */}

          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full justify-between"
              >
                {value
                  ? frameworks.find((framework) => framework.value === value)
                      ?.label
                  : "Select framework..."}
                <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput
                  placeholder="Search framework..."
                  className="h-9"
                />
                <CommandEmpty>No framework found.</CommandEmpty>
                <CommandGroup>
                  {frameworks.map((framework) => (
                    <CommandItem
                      key={framework.value}
                      value={framework.value}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue);
                        setOpen(false);
                      }}
                    >
                      {framework.label}
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          value === framework.value
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          <div className=" ">
            <FormField
              control={form.control}
              name="sendOtp"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center">
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="OTP"
                        {...field}
                        disabled={isSignUpClicked}
                      />
                    </FormControl>
                    <Button
                      className=""
                      type="button"
                      onClick={() => console.log("Send OTP")}
                      disabled={isSignUpClicked}
                    >
                      Send OTP
                    </Button>
                  </div>
                  <FormMessage>{form.errors?.email?.message}</FormMessage>
                </FormItem>
              )}
            />
          </div>

          <div className=" ">
            <FormField
              control={form.control}
              name="verifyOtp"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center">
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Verify OTP"
                        {...field}
                        disabled={isSignUpClicked}
                      />
                    </FormControl>
                    <Button
                      className=""
                      type="button"
                      onClick={() => console.log("Send OTP")}
                      disabled={isSignUpClicked}
                    >
                      Verify OTP
                    </Button>
                  </div>
                  <FormMessage>{form.errors?.email?.message}</FormMessage>
                </FormItem>
              )}
            />
          </div>

          <div className=" ">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Password"
                      {...field}
                      disabled={isSignUpClicked}
                    />
                  </FormControl>
                  <FormMessage>{form.errors?.password?.message}</FormMessage>
                </FormItem>
              )}
            />
          </div>
          {isSignUpClicked && (
            <div>
              <FormField
                control={form.control}
                name="additionalField"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Additional Field" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
          {isSignUpClicked ? (
            <Button className="" type="submit">
              Submit
            </Button>
          ) : (
            <Button
              className="w-full"
              type="button"
              onClick={() => setIsSignUpClicked(true)}
            >
              Sign Up
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
}
