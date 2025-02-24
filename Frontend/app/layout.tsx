"use client";
import "./globals.css";
import { store } from "./store";
import { Provider } from "react-redux";
import { Toaster } from "@/components/ui/sonner";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      <html lang="en">
        <body>
          {children}
          <Toaster />
        </body>
      </html>
    </Provider>
  );
}
