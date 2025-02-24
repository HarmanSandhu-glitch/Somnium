"use client";
import React, { useState } from "react";
import Script from "next/script";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const EventTickets = [
  {
    title: "General Admission",
    price: 799,
    details: "Access to all general areas of the event.",
    features: ["Entry pass", "Free seating", "Event kit"],
    popular: false,
  },
  {
    title: "VIP Pass",
    price: 1499,
    details: "Exclusive VIP access with front-row seating.",
    features: [
      "Front-row seats",
      "Complimentary drinks",
      "Backstage access",
      "Priority entry",
    ],
    popular: true,
  },
  {
    title: "Premium Experience",
    price: 2499,
    details: "Complete premium experience with all perks included.",
    features: [
      "Meet & Greet with artists",
      "Unlimited refreshments",
      "Private lounge access",
      "Exclusive merchandise",
      "Premium seating",
    ],
    popular: false,
  },
];

export default function TicketPage() {
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async (amount: number, eventName: string) => {
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
        description: `${eventName} Ticket Purchase`,
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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="font-machina bg-[#ecebe7] py-12 px-4"
    >
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <h1 className="text-7xl font-bold text-gray-900 mb-4">
            Book Your Event Tickets
          </h1>
          <p className="text-lg text-gray-600">
            Secure your spot for the most exciting events today!
          </p>
        </motion.div>

        <div className="grid font-mono md:grid-cols-3 gap-8">
          {EventTickets.map((ticket, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card
                className={`relative ${
                  ticket.popular
                    ? "border-2 border-orange-500 shadow-lg"
                    : "border border-gray-200"
                }`}
              >
                {ticket.popular && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="absolute -top-4 left-1/2 transform -translate-x-1/2"
                  >
                    <span className="bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </motion.div>
                )}

                <CardHeader>
                  <CardTitle className="text-2xl font-bold">
                    {ticket.title}
                  </CardTitle>
                  <CardDescription>
                    <span className="text-3xl font-bold">₹{ticket.price}</span>
                  </CardDescription>
                  <p className="text-gray-600 mt-2">{ticket.details}</p>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-3">
                    {ticket.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center gap-2"
                      >
                        <Check className="h-5 w-5 text-green-500" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handlePayment(ticket.price, ticket.title)}
                    disabled={isProcessing}
                    className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                      ticket.popular
                        ? "bg-orange-500 hover:bg-orange-600 text-white"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {isProcessing ? "Processing..." : "Buy Ticket"}
                  </motion.button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
