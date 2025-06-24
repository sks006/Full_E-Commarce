/** @format */

// src/components/AuthForm.tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import {
     Form,
     FormField,
     FormItem,
     FormLabel,
     FormControl,
     FormMessage,
} from "@/components/ui/form";
import { useAppDispatch } from "@/store/hooks";
import { useNavigate } from "react-router-dom"; // Adjust the import based on your navigation setup

import { loginUser, setAccessToken, setUser } from "@/Slicer/auth/authSlice";
import { toast } from "@/hooks/use-toast";

const loginSchema = z.object({
     email: z.string().email("Invalid email address"),
     password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginSchema = z.infer<typeof loginSchema>;

export function Login() {
     const navigate = useNavigate(); // Adjust this based on your navigation setup
     // Adjust this based on your navigation setup
     const dispatch = useAppDispatch();
     const form = useForm<LoginSchema>({
          resolver: zodResolver(loginSchema),
          defaultValues: {
               email: "",
               password: "",
          },
     });

     const onSubmit = async (data: LoginSchema) => {
          const result = await dispatch(loginUser(data));

          if (loginUser.fulfilled.match(result)) {
               const { user, accessToken } = result.payload;

               // Store access token (session or Redux)
               sessionStorage.setItem("accessToken", accessToken);
               dispatch(setAccessToken(accessToken));
               dispatch(setUser(user)); // if you want a `setUser` reducer

               // Navigate to dashboard
               navigate("/dashboard");
          } else {
               toast({
                    variant: "destructive",
                    description: result.payload as string,
               });
          }
     };
        
     return (
          <div className='flex items-center justify-center min-h-screen bg-gray-100'>
               <Card className='max-w-md w-full mx-auto  shadow-xl rounded-2xl border '>
                    <CardHeader>
                         <CardTitle className='text-2xl text-center'>
                              Login
                         </CardTitle>
                    </CardHeader>
                    <CardContent>
                         <Form {...form}>
                              <form
                                   onSubmit={form.handleSubmit(onSubmit)}
                                   className='space-y-6'>
                                   <FormField
                                        control={form.control}
                                        name='email'
                                        render={({ field }) => (
                                             <FormItem>
                                                  <FormLabel>Email</FormLabel>
                                                  <FormControl>
                                                       <Input
                                                            type='email'
                                                            placeholder='your@email.com'
                                                            {...field}
                                                       />
                                                  </FormControl>
                                                  <FormMessage />
                                             </FormItem>
                                        )}
                                   />
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
                                                            placeholder='********'
                                                            {...field}
                                                       />
                                                  </FormControl>
                                                  <FormMessage />
                                             </FormItem>
                                        )}
                                   />
                                   <Button type='submit' className='w-full'>
                                        Login
                                   </Button>
                              </form>
                         </Form>
                         <div className='text-center mt-4 text-sm text-gray-600'>
                              Create an account?
                              {navigator.onLine ? (
                                   <a
                                        href='/register'
                                        className='text-blue-600 hover:underline'>
                                        Register here
                                   </a>
                              ) : (
                                   <span className='text-gray-400'>
                                        Offline
                                   </span>
                              )}
                         </div>
                    </CardContent>
               </Card>
          </div>
     );
}
