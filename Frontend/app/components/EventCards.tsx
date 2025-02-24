"use client";
import { useState, useEffect } from "react";
import React from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Users, MapPin, Tag, Search } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
  CardHeader,
} from "@/components/ui/card";
import eventData from "@/lib/data";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import EventDialog from "./EventDialog";

const EventCards = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEvents, setFilteredEvents] = useState(eventData);
  const [sorted, isSorted] = useState(false);
  const [selectedType, setSelectedType] = useState("All");

  // Get unique event types for the filter dropdown
  const eventTypes = [
    "All",
    ...new Set(eventData.map((event) => event.eventType)),
  ];

  useEffect(() => {
    filterEvents(searchTerm, selectedType);
  }, [searchTerm, selectedType]);

  const filterEvents = (search, type) => {
    let results = eventData;

    // Apply search filter
    if (search) {
      results = results.filter((event) =>
        `${event.eventName} ${event.eventType} ${event.eventLocation} ${event.eventOrganizer}`
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    // Apply type filter
    if (type && type !== "All") {
      results = results.filter(
        (event) => event.eventType.toLowerCase() === type.toLowerCase()
      );
    }

    setFilteredEvents(results);
  };

  const handleSearch = () => {
    filterEvents(searchTerm, selectedType);
  };

  const handleSort = () => {
    const results = [...filteredEvents].sort((a, b) => {
      return sorted
        ? a.eventName.localeCompare(b.eventName)
        : b.eventName.localeCompare(a.eventName);
    });
    setFilteredEvents(results);
    isSorted(!sorted);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 15px 30px rgba(0, 0, 0, 0.15)",
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };

  return (
    <>
      <div className="flex font-visage tracking-wide gap-4 items-center justify-center">
        <div className="relative w-[500px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="w-full text-xl pl-12 py-8 rounded-[30px] bg-white text-black shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            placeholder="Search for events, topics, or organizers..."
          />
        </div>
        <Button
          onClick={handleSearch}
          className="px-10 py-8 font-bold rounded-[30px] text-white shadow-lg transition duration-300"
        >
          Search
        </Button>
        <Button
          onClick={handleSort}
          className="px-10 py-8 font-bold rounded-[30px] text-white shadow-lg transition duration-300"
        >
          Sort {sorted ? "A-Z" : "Z-A"}
        </Button>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="px-8 py-3 font-bold rounded-[20px] text-black shadow-lg transition duration-300"
        >
          {eventTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {filteredEvents.length === 0 ? (
        <p className="text-center text-xl text-gray-500 mt-10">
          No events found matching your criteria.
        </p>
      ) : (
        <motion.div
          className="grid cursor-pointer grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredEvents.map((event, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover="hover"
              layout
            >
              <Card className="h-full font-akrobat bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
                <Image
                  src={event.eventImage}
                  alt={event.eventName}
                  width={500}
                  height={300}
                  className="w-full h-60 object-cover rounded-t-2xl"
                />
                <CardHeader className="p-6 font-mono space-y-2">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <CardTitle className="text-2xl tracking-wider font-semibold text-gray-900 dark:text-white">
                      {event.eventName}
                    </CardTitle>
                  </motion.div>
                  <CardDescription className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                    <Tag size={18} />
                    <span className="uppercase font-medium tracking-wide">
                      {event.eventType}
                    </span>
                    <span>•</span>
                    <MapPin size={18} />
                    <span>{event.eventLocation}</span>
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-1 flex items-end justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Calendar size={18} className="text-indigo-500" />
                      <span>{event.eventDate}</span>
                      <span className="mx-2">|</span>
                      <Clock size={18} className="text-indigo-500" />
                      <span>{event.eventTime}</span>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <Users size={18} className="text-indigo-500" />
                      <span>Organized by:</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {event.eventOrganizer}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <motion.div
                        className="inline-flex items-center px-3 py-3 rounded-full text-sm font-medium"
                        style={{
                          backgroundColor: `hsla(${index * 60}, 70%, 95%, 1)`,
                          color: `hsla(${index * 60}, 70%, 35%, 1)`,
                        }}
                        whileHover={{ scale: 1.05 }}
                      >
                        {event.eventType.charAt(0).toUpperCase() +
                          event.eventType.slice(1)}
                      </motion.div>
                    </div>
                    <EventDialog event={event} />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}
    </>
  );
};

export default EventCards;
