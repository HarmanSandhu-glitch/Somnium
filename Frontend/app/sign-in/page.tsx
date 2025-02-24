"use client";
import React from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";

const SignIn = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    router.push("/");

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full flex items-center justify-center  mx-auto mt-32"
    >
      <Card>
        <CardHeader>
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
            className="space-y-4 text-center"
          >
            <h2 className="text-4xl font-machina font-bold tracking-tight">
              Welcome back
            </h2>
            <p className="text-sm font-mono text-muted-foreground">
              Enter your credentials to sign in to your account
            </p>
          </motion.div>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={onSubmit}
            className="space-y-10 tracking-wider font-mono"
          >
            <div className="space-y-3">
              <Label htmlFor="email">Email</Label>
              <motion.div whileTap={{ scale: 0.995 }} className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="pr-8"
                />
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  @
                </motion.span>
              </motion.div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <motion.div whileTap={{ scale: 0.995 }}>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                />
              </motion.div>
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mr-2 h-4 w-4 animate-spin"
                >
                  ◌
                </motion.span>
              )}
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <div className="grid font-mono grid-cols-2 gap-4">
            <Button variant="outline" className="w-full">
              <motion.span whileHover={{ scale: 1.1 }}>Github</motion.span>
            </Button>
            <Button variant="outline" className="w-full">
              <motion.span whileHover={{ scale: 1.1 }}>Google</motion.span>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default SignIn;
