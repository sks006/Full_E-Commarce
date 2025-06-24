/** @format */

// src/components/RegisterForm.tsx
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
     Form,
     FormField,
     FormItem,
     FormLabel,
     FormControl,
     FormMessage,
} from "@/components/ui/form";

import { useAppDispatch } from "@/store/hooks";
import { registerUser } from "@/Slicer/auth/authSlice";
import { useNavigate } from "react-router-dom";  // Adjust the import based on your navigation setup
const registerSchema = z
     .object({
          name: z.string().min(2, "Name is required"),
          email: z.string().email("Invalid email"),
          password: z.string().min(6, "Password must be at least 6 characters"),
          confirmPassword: z.string(),
     })
     .refine((data) => data.password === data.confirmPassword, {
          message: "Passwords do not match",
          path: ["confirmPassword"],
     });

type RegisterSchema = z.infer<typeof registerSchema>;

export function Register() {
     const dispatch = useAppDispatch();
     const navigate = useNavigate(); // Adjust this based on your navigation setup
     const form = useForm<RegisterSchema>({
          resolver: zodResolver(registerSchema),
          defaultValues: {
               name: "",
               email: "",
               password: "",
               confirmPassword: "",
          },
     });

     function onSubmit(data: RegisterSchema) {
          console.log("Registration Data:", data);

          dispatch(
               registerUser({
                    name: data.name,
                    email: data.email,
                    password: data.password,
               }),
          );
          navigate("/login");
     }

     return (
          <div className='flex items-center justify-center min-h-screen bg-gray-100'>
               <Card className='max-w-md w-full mx-auto mt-20 shadow-xl rounded-2xl border'>
                    <CardHeader>
                         <CardTitle className='text-2xl text-center'>
                              Create Account
                         </CardTitle>
                    </CardHeader>
                    <CardContent>
                         <Form {...form}>
                              <form
                                   onSubmit={form.handleSubmit(onSubmit)}
                                   className='space-y-5'>
                                   {/* Name */}
                                   <FormField
                                        control={form.control}
                                        name='name'
                                        render={({ field }) => (
                                             <FormItem>
                                                  <FormLabel>
                                                       Full Name
                                                  </FormLabel>
                                                  <FormControl>
                                                       <Input
                                                            placeholder='John Doe'
                                                            {...field}
                                                       />
                                                  </FormControl>
                                                  <FormMessage />
                                             </FormItem>
                                        )}
                                   />
                                   {/* Email */}
                                   <FormField
                                        control={form.control}
                                        name='email'
                                        render={({ field }) => (
                                             <FormItem>
                                                  <FormLabel>Email</FormLabel>
                                                  <FormControl>
                                                       <Input
                                                            type='email'
                                                            placeholder='email@example.com'
                                                            {...field}
                                                       />
                                                  </FormControl>
                                                  <FormMessage />
                                             </FormItem>
                                        )}
                                   />
                                   {/* Password */}
                                   <FormField
                                        control={form.control}
                                        name='password'
                                        render={({ field }) => (
                                             <FormItem>
                                                  <FormLabel>
                                                       Password
                                                  </FormLabel>
                                                  <FormControl>
                                                       <Input
                                                            type='password'
                                                            placeholder='••••••••'
                                                            {...field}
                                                       />
                                                  </FormControl>
                                                  <FormMessage />
                                             </FormItem>
                                        )}
                                   />
                                   {/* Confirm Password */}
                                   <FormField
                                        control={form.control}
                                        name='confirmPassword'
                                        render={({ field }) => (
                                             <FormItem>
                                                  <FormLabel>
                                                       Confirm Password
                                                  </FormLabel>
                                                  <FormControl>
                                                       <Input
                                                            type='password'
                                                            placeholder='••••••••'
                                                            {...field}
                                                       />
                                                  </FormControl>
                                                  <FormMessage />
                                             </FormItem>
                                        )}
                                   />
                                   {/* Submit */}
                                   <Button type='submit' className='w-full'>
                                        Sign Up
                                   </Button>
                              </form>
                         </Form>
                    </CardContent>
               </Card>
          </div>
     );
}
