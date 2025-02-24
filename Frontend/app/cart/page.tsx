"use client";
import React, { useState, useEffect } from "react";
import Script from "next/script";
import { motion } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ShoppingBag, Tag } from "lucide-react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "../store";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.5, ease: "easeOut" },
  }),
};

const buttonVariants = {
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
};

import { useRouter } from "next/navigation";
const Page = () => {
  const router = useRouter();
  const cartItems = useSelector((state: RootState) => state.cart.events);
  const items = useSelector((state: RootState) => state.cart.items);
  const price = useSelector((state: RootState) => state.cart.price);
  const [isProcessing, setIsProcessing] = useState(false);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [debug, setDebug] = useState({ items: 0, price: 0, cartItems: [] });

  useEffect(() => {
    console.log("Cart State:", { items, price, cartItems });
    setDebug({ items, price, cartItems: cartItems || [] });
  }, [items, price, cartItems]);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCode === "SAVE10") {
      setDiscount(price * 0.1);
    }
  };

  const handleShippingUpdate = (e) => {
    e.preventDefault();
    console.log("Shipping updated", { country, city, zipCode });
  };

  const handlePayment = async (amount: number) => {
    setIsProcessing(true);

    try {
      const response = await fetch("/api/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount }),
      });
      const data = await response.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: amount * 100,
        currency: "INR",
        name: "Eventify",
        description: `Checkout`,
        order_id: data.orderId,
        handler: function (response: any) {
          console.log("PAYMENT SUCCESSFUL", response);
        },
        prefill: {
          name: "Harsh",
          email: "singlaharsh943@gmail.com",
          contact: "9646766209",
        },
        theme: {
          color: "#f97316",
        },
      };

      const rzpl = new window.Razorpay(options);
      rzpl.open();
    } catch (e) {
      console.error(e);
    } finally {
      setIsProcessing(false);
    }
  };
  return (
    <motion.div
      className="pr-10 bg-gray-200 pl-10 py-10"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        onLoad={() => console.log("Razorpay script loaded successfully")}
      />

      <motion.h1
        className="text-4xl items-center font-machina mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-2">
          <Button className="" onClick={() => router.push("/")}>
            Back
          </Button>
          Your Shopping Bag
        </div>
      </motion.h1>

      <div className="grid font-akrobat tracking-widest grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            custom={0}
            whileHover={{ scale: 1.02 }}
          >
            <Card className="shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <ShoppingBag className="mr-2" size={20} />
                    <span className="text-2xl">
                      Items in Your Bag [{items}]
                    </span>
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                {Array.isArray(cartItems) && cartItems.length > 0 ? (
                  cartItems.map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center py-4 border-b"
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.2, duration: 0.5 }}
                    >
                      {item.eventImage && (
                        <Image
                          src={item.eventImage}
                          alt={item.eventName || "Event"}
                          width={100}
                          height={100}
                          className="w-20 h-20 object-cover rounded"
                        />
                      )}
                      <div className="ml-4 flex-1">
                        <h3 className="font-medium">
                          {item.eventName || "Event"}
                        </h3>
                        <p className="text-gray-500">Quantity: 1</p>
                      </div>
                      <div className="font-semibold">
                        ${(item.eventPrice || 0).toFixed(2)}
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="py-8 text-center text-gray-500">
                    Your shopping bag is empty
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="lg:col-span-1">
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            custom={1}
            whileHover={{ scale: 1.02 }}
          >
            <Card className="font-mono tracking-normal shadow-lg">
              <CardHeader>
                <CardTitle className="text-4xl">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <form onSubmit={handleShippingUpdate} className="space-y-4">
                  <h3 className="font-medium mb-4">Calculate Shipping</h3>
                  <Select value={country} onValueChange={setCountry}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="india">India</SelectItem>
                      <SelectItem value="usa">USA</SelectItem>
                      <SelectItem value="uk">UK</SelectItem>
                      <SelectItem value="canada">Canada</SelectItem>
                      <SelectItem value="australia">Australia</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      placeholder="City"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                    <Input
                      placeholder="Zip Code"
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                    />
                  </div>
                  <motion.div
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <Button type="submit" className="w-full">
                      Update Shipping
                    </Button>
                  </motion.div>
                </form>

                <Separator className="my-6" />

                <h3 className="font-medium font-mono tracking-normal mb-4">
                  Apply Coupon
                </h3>
                <form onSubmit={handleApplyCoupon} className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Coupon Code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-1"
                    />
                    <motion.div
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      <Button type="submit" variant="outline">
                        Apply
                      </Button>
                    </motion.div>
                  </div>
                  {discount > 0 && (
                    <motion.div
                      className="text-green-600 flex items-center text-sm"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Tag size={14} className="mr-1" />
                      Coupon applied successfully!
                    </motion.div>
                  )}
                </form>

                <Separator className="my-6" />

                <div className="space-y-2 tracking-normal font-mono">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Subtotal</span>
                    <span>${price.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Discount</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Shipping</span>
                    <span>{country ? "$5.99" : "Calculate above"}</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>
                      ${(price - discount + (country ? 5.99 : 0)).toFixed(2)}
                    </span>
                  </div>
                </div>
                <Button
                  className="w-full mt-6 flex items-center justify-between"
                  size="lg"
                  disabled={isProcessing || items === 0}
                  onClick={() =>
                    handlePayment(price - discount + (country ? 5.99 : 0))
                  }
                >
                  <span>{isProcessing ? "Processing..." : "Buy Ticket"}</span>
                  <span>
                    ${(price - discount + (country ? 5.99 : 0)).toFixed(2)}
                  </span>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Page;
