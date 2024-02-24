"use client";
import * as React from "react";

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

//import { signInStart, signInSuccess, signInFailure } from './actions'; // Import your action creators
//import { navigate } from 'gatsby'; // Import navigate if you're using Gatsby
//import { formSchema } from './formSchema'; // Import your form schema

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  Password: z.string().min(2, {
    message: "Password must be at least 2 characters.",
  }),
});

export function ProfileForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);

    try {
      const res = await fetch("/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      console.log(data);
      if (res.status !== 200) {
        // Dispatch sign-in failure action with error message
        // Assuming dispatch is accessible in this scope
        // Replace with actual dispatch call if this is within a Redux thunk or similar
        //dispatch(signInFailure(data.message));
        return;
      }
      // Dispatch sign-in success action with data
      // Replace with actual dispatch call if this is within a Redux thunk or similar
      //dispatch(signInSuccess(data));
      //navigate("/"); // Navigate to desired location
    } catch (error) {
      // Dispatch sign-in failure action with error message
      // Replace with actual dispatch call if this is within a Redux thunk or similar
      //dispatch(signInFailure(error.message));
    }
  }

  return (
    <div className="max-w-sm p-3 mx-auto mt-20">
      <h1 className="text-2xl font-bold p-4 text-center">Sign In</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel></FormLabel>
                  <FormControl>
                    <Input placeholder="Username" {...field} />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className=" ">
            <FormField
              control={form.control}
              name="Password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel></FormLabel>
                  <FormControl>
                    <Input placeholder="Password" {...field} />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button className="w-full" type="submit">
            Login{" "}
          </Button>
        </form>
      </Form>
    </div>
  );
}

// p-3 text-white uppercase rounded-lg cursor-pointer bg-slate-700 hover:opacity-95 disabled:opacity-80
