import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  ShoppingCart,
  X,
  Router,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  incrementCartItems,
  incrementPriceByAmount,
  addEvent,
} from "../_features/cart/cartSlice";
import { RootState } from "../store";

interface Event {
  eventType: string;
  eventImage: string;
  eventName: string;
  eventPrice: number;
  eventDate: string;
  eventTime: string;
  eventLocation: string;
  eventDescription: string;
  eventOrganizer: string;
}
const CartNotification: FC<{
  show: boolean;
  onClose: () => void;
  eventName: string;
  eventImage: string;
  eventPrice: number;
  handleOnclick: any;
}> = ({ show, onClose, eventName, eventImage, eventPrice, handleOnclick }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 1, y: -20, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="fixed top-4 right-4 z-50 max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5"
        >
          <div className="w-full p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                  <ShoppingCart className="h-6 w-6 text-indigo-600" />
                </div>
              </div>
              <div className="ml-3 w-0 flex-1">
                <p className="text-sm font-medium text-gray-900">
                  Item Added to Cart
                </p>
                <div className="mt-2 flex items-center">
                  <div className="relative h-12 w-12 rounded overflow-hidden">
                    <Image
                      src={eventImage}
                      alt={eventName}
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-gray-500">{eventName}</p>
                    <p className="mt-1 text-sm font-medium text-gray-900">
                      ${eventPrice}
                    </p>
                  </div>
                </div>
              </div>
              <div className="ml-4 flex-shrink-0 flex">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="mt-4">
              <Button
                onClick={handleOnclick}
                variant="outline"
                size="sm"
                className="w-full text-indigo-600 border-indigo-600 hover:bg-indigo-50"
              >
                View Cart
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const EventDialog: FC<{ event: Event }> = ({ event }) => {
  const router = useRouter();
  const handleOnclick = () => {
    router.push("/cart");
  };
  const dispatch = useDispatch();
  const price = useSelector((state: RootState) => state.cart.price);
  const [open, setOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const handleAddToCart = () => {
    console.log(`${event.eventName} added to cart!`);
    dispatch(incrementPriceByAmount(event.eventPrice));
    dispatch(incrementCartItems());
    console.log("Price incremented by", event.eventPrice);
    console.log(price); // undefined
    dispatch(addEvent(event));
    // Show notification
    setShowNotification(true);

    // Automatically hide notification after 4 seconds
    setTimeout(() => {
      setShowNotification(false);
    }, 4000);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-semibold transition-all duration-300 flex items-center gap-2">
            View Details
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <div className="flex justify-between items-start">
              <Badge
                variant="outline"
                className="bg-indigo-50 text-indigo-700 border-indigo-200"
              >
                {event.eventType}
              </Badge>
              <DialogTitle className="sr-only">Event Details</DialogTitle>
            </div>
          </DialogHeader>
          <Card className="border-none shadow-none">
            <div className="relative">
              <Image
                width={800}
                height={500}
                src={event.eventImage}
                alt={event.eventName}
                className="w-full h-64 object-cover rounded-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-xl" />
            </div>
            <CardHeader className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <CardTitle className="text-3xl font-bold">
                  {event.eventName}
                </CardTitle>
              </motion.div>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-4 h-4 text-indigo-500" />
                  <span>{event.eventDate}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="w-4 h-4 text-indigo-500" />
                  <span>{event.eventTime}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-4 h-4 text-indigo-500" />
                  <span>{event.eventLocation}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-600 leading-relaxed">
                  {event.eventDescription}
                </p>
              </div>
              <div className="flex justify-between items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <div className="flex gap-4 items-center">
                  <Users className="w-5 h-5 text-indigo-500" />
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">Organized by</span>
                    <span className="font-medium text-gray-900">
                      {event.eventOrganizer}
                    </span>
                  </div>
                </div>
                <div className="flex gap-7 items-center">
                  <div className="text-lg font-semibold text-gray-900">
                    $ {event.eventPrice}
                  </div>
                  <Button
                    onClick={handleAddToCart}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white"
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </DialogContent>
      </Dialog>

      <CartNotification
        show={showNotification}
        onClose={() => setShowNotification(false)}
        eventName={event.eventName}
        eventImage={event.eventImage}
        eventPrice={event.eventPrice}
        handleOnclick={handleOnclick}
      />
    </>
  );
};

export default EventDialog;
