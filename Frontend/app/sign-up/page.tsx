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

const SignUp = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const [passwordStrength, setPasswordStrength] = React.useState(0);

  const checkPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    setPasswordStrength(strength);
  };

  async function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    router.push("/sign-in");

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full mt-20 tracking-wider max-w-md mx-auto p-4"
    >
      <Card>
        <CardHeader>
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
            className="space-y-2 text-center"
          >
            <h2 className="text-4xl font-machina font-bold tracking-tight">
              Create an account
            </h2>
            <p className="text-sm font-machina text-muted-foreground">
              Enter your details to get started
            </p>
          </motion.div>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4 font-mono">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="space-y-2"
            >
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
                className="transition-all duration-200 focus:scale-[1.01]"
              />
            </motion.div>

            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="space-y-2"
            >
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="pr-8"
                />
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  @
                </motion.span>
              </div>
            </motion.div>

            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="space-y-2"
            >
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                onChange={(e) => checkPasswordStrength(e.target.value)}
              />
              <div className="flex gap-1 mt-1">
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    className={`h-1 w-full rounded-full ${
                      i < passwordStrength ? "bg-green-500" : "bg-gray-200"
                    }`}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                  />
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="space-y-2"
            >
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
              />
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
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
                {isLoading ? "Creating account..." : "Create account"}
              </Button>
            </motion.div>
          </form>
        </CardContent>
        <CardFooter className="flex font-mono flex-col space-y-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or sign up with
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
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

export default SignUp;
