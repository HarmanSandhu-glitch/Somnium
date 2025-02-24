"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Activity,
  Users,
  ShoppingCart,
  DollarSign,
  Calendar,
  Bell,
  Menu,
  X,
  Search,
  ArrowUpRight,
  ArrowDownRight,
  Layers,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart as RechartsBarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Badge } from "@/components/ui/badge";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample data for charts
const revenueData = [
  { name: "Jan", value: 4000 },
  { name: "Feb", value: 3000 },
  { name: "Mar", value: 5000 },
  { name: "Apr", value: 4500 },
  { name: "May", value: 6000 },
  { name: "Jun", value: 5500 },
  { name: "Jul", value: 7000 },
];

const userActivityData = [
  { name: "Mon", active: 3200, new: 1400 },
  { name: "Tue", active: 2800, new: 1300 },
  { name: "Wed", active: 3900, new: 1800 },
  { name: "Thu", active: 4200, new: 2000 },
  { name: "Fri", active: 3800, new: 1900 },
  { name: "Sat", active: 2700, new: 1300 },
  { name: "Sun", active: 2400, new: 1100 },
];

const productPerformanceData = [
  { name: "Electronics", value: 40 },
  { name: "Clothing", value: 30 },
  { name: "Home", value: 20 },
  { name: "Books", value: 10 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const recentTransactions = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    amount: 350.0,
    status: "completed",
    date: "24 Feb 2025",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    amount: 125.5,
    status: "pending",
    date: "23 Feb 2025",
  },
  {
    id: 3,
    name: "Robert Johnson",
    email: "robert@example.com",
    amount: 780.25,
    status: "completed",
    date: "22 Feb 2025",
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily@example.com",
    amount: 47.99,
    status: "failed",
    date: "21 Feb 2025",
  },
];

const Page = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Animation variants
  const sidebarVariants = {
    open: { width: "250px", x: 0, transition: { duration: 0.3 } },
    closed: { width: "70px", x: 0, transition: { duration: 0.3 } },
  };

  const contentVariants = {
    open: { marginLeft: "250px", transition: { duration: 0.3 } },
    closed: { marginLeft: "70px", transition: { duration: 0.3 } },
  };

  const fadeInVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  const statsCardVariants = {
    hover: { y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" },
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <motion.div
        className="fixed top-0 left-0 h-full bg-white border-r border-gray-200 shadow-sm z-10"
        variants={sidebarVariants}
        animate={isSidebarOpen ? "open" : "closed"}
      >
        <div className="flex items-center justify-between p-4">
          {isSidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xl font-bold text-indigo-600 flex items-center"
            >
              <Layers className="mr-2" size={24} />
              <span>DashMaster</span>
            </motion.div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>

        <div className="mt-8">
          <div
            className={`flex items-center px-4 py-3 text-gray-600 hover:bg-indigo-50 hover:text-indigo-700 rounded-lg mx-2 cursor-pointer transition-all ${
              !isSidebarOpen ? "justify-center" : ""
            }`}
          >
            <BarChart size={20} />
            {isSidebarOpen && <span className="ml-4">Dashboard</span>}
          </div>
          <div
            className={`flex items-center px-4 py-3 text-gray-600 hover:bg-indigo-50 hover:text-indigo-700 rounded-lg mx-2 cursor-pointer transition-all ${
              !isSidebarOpen ? "justify-center" : ""
            }`}
          >
            <Users size={20} />
            {isSidebarOpen && <span className="ml-4">Customers</span>}
          </div>
          <div
            className={`flex items-center px-4 py-3 text-gray-600 hover:bg-indigo-50 hover:text-indigo-700 rounded-lg mx-2 cursor-pointer transition-all ${
              !isSidebarOpen ? "justify-center" : ""
            }`}
          >
            <ShoppingCart size={20} />
            {isSidebarOpen && <span className="ml-4">Orders</span>}
          </div>
          <div
            className={`flex items-center px-4 py-3 text-gray-600 hover:bg-indigo-50 hover:text-indigo-700 rounded-lg mx-2 cursor-pointer transition-all ${
              !isSidebarOpen ? "justify-center" : ""
            }`}
          >
            <Activity size={20} />
            {isSidebarOpen && <span className="ml-4">Analytics</span>}
          </div>
          <div
            className={`flex items-center px-4 py-3 text-gray-600 hover:bg-indigo-50 hover:text-indigo-700 rounded-lg mx-2 cursor-pointer transition-all ${
              !isSidebarOpen ? "justify-center" : ""
            }`}
          >
            <Calendar size={20} />
            {isSidebarOpen && <span className="ml-4">Calendar</span>}
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.div
        className="flex-1 overflow-auto"
        variants={contentVariants}
        animate={isSidebarOpen ? "open" : "closed"}
      >
        {/* Header */}
        <header className="bg-white border-b border-gray-200 p-4 flex justify-between items-center sticky top-0 z-10">
          <div className="flex items-center">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={16}
              />
              <Input placeholder="Search..." className="w-64 pl-10" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Button variant="ghost" size="icon">
                <Bell size={20} />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </Button>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-2 cursor-pointer">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/api/placeholder/32/32" alt="User" />
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                  {isSidebarOpen && (
                    <span className="text-sm font-medium">Admin User</span>
                  )}
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-6">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInVariants}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <motion.div whileHover="hover" variants={statsCardVariants}>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Total Revenue
                        </p>
                        <p className="text-3xl font-bold">$38,493</p>
                        <div className="flex items-center mt-1">
                          <Badge
                            variant="outline"
                            className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1"
                          >
                            <ArrowUpRight size={14} /> 12.5%
                          </Badge>
                          <span className="text-xs text-gray-500 ml-2">
                            from last month
                          </span>
                        </div>
                      </div>
                      <div className="bg-indigo-100 p-2 rounded-lg">
                        <DollarSign className="text-indigo-600" size={24} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div whileHover="hover" variants={statsCardVariants}>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Total Customers
                        </p>
                        <p className="text-3xl font-bold">3,842</p>
                        <div className="flex items-center mt-1">
                          <Badge
                            variant="outline"
                            className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1"
                          >
                            <ArrowUpRight size={14} /> 8.2%
                          </Badge>
                          <span className="text-xs text-gray-500 ml-2">
                            from last month
                          </span>
                        </div>
                      </div>
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <Users className="text-blue-600" size={24} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div whileHover="hover" variants={statsCardVariants}>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Total Orders
                        </p>
                        <p className="text-3xl font-bold">1,520</p>
                        <div className="flex items-center mt-1">
                          <Badge
                            variant="outline"
                            className="bg-red-50 text-red-700 border-red-200 flex items-center gap-1"
                          >
                            <ArrowDownRight size={14} /> 3.1%
                          </Badge>
                          <span className="text-xs text-gray-500 ml-2">
                            from last month
                          </span>
                        </div>
                      </div>
                      <div className="bg-purple-100 p-2 rounded-lg">
                        <ShoppingCart className="text-purple-600" size={24} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div whileHover="hover" variants={statsCardVariants}>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Conversion Rate
                        </p>
                        <p className="text-3xl font-bold">3.24%</p>
                        <div className="flex items-center mt-1">
                          <Badge
                            variant="outline"
                            className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1"
                          >
                            <ArrowUpRight size={14} /> 0.8%
                          </Badge>
                          <span className="text-xs text-gray-500 ml-2">
                            from last month
                          </span>
                        </div>
                      </div>
                      <div className="bg-amber-100 p-2 rounded-lg">
                        <Activity className="text-amber-600" size={24} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>Revenue Overview</CardTitle>
                    <CardDescription>
                      Monthly revenue for the current year
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={revenueData}>
                          <defs>
                            <linearGradient
                              id="colorRevenue"
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                            >
                              <stop
                                offset="5%"
                                stopColor="#4f46e5"
                                stopOpacity={0.8}
                              />
                              <stop
                                offset="95%"
                                stopColor="#4f46e5"
                                stopOpacity={0}
                              />
                            </linearGradient>
                          </defs>
                          <XAxis dataKey="name" />
                          <YAxis />
                          <CartesianGrid strokeDasharray="3 3" />
                          <Tooltip />
                          <Area
                            type="monotone"
                            dataKey="value"
                            stroke="#4f46e5"
                            fillOpacity={1}
                            fill="url(#colorRevenue)"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>User Activity</CardTitle>
                    <CardDescription>
                      Active and new users by day
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsBarChart data={userActivityData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="active" fill="#4f46e5" />
                          <Bar dataKey="new" fill="#10b981" />
                        </RechartsBarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="lg:col-span-2"
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Transactions</CardTitle>
                    <CardDescription>
                      Latest orders and payments
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="relative overflow-x-auto">
                      <table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3">
                              Customer
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Amount
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Status
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Date
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {recentTransactions.map((transaction) => (
                            <motion.tr
                              key={transaction.id}
                              className="bg-white border-b"
                              whileHover={{
                                backgroundColor: "rgba(243, 244, 246, 0.5)",
                              }}
                            >
                              <td className="px-6 py-4">
                                <div className="flex items-center">
                                  <Avatar className="h-8 w-8 mr-2">
                                    <AvatarFallback>
                                      {transaction.name.slice(0, 2)}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <div className="font-medium">
                                      {transaction.name}
                                    </div>
                                    <div className="text-gray-500">
                                      {transaction.email}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 font-medium">
                                ${transaction.amount.toFixed(2)}
                              </td>
                              <td className="px-6 py-4">
                                <Badge
                                  className={
                                    transaction.status === "completed"
                                      ? "bg-green-100 text-green-800 border-green-200"
                                      : transaction.status === "pending"
                                      ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                                      : "bg-red-100 text-red-800 border-red-200"
                                  }
                                >
                                  {transaction.status}
                                </Badge>
                              </td>
                              <td className="px-6 py-4 text-gray-500">
                                {transaction.date}
                              </td>
                            </motion.tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View All Transactions
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Product Performance</CardTitle>
                    <CardDescription>Top performing categories</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={productPerformanceData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) =>
                              `${name}: ${(percent * 100).toFixed(0)}%`
                            }
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {productPerformanceData.map((entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                              />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Page;
