"use client";
import { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardTitle,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

import {
  X,
  MessageCircle,
  Send,
  Loader2,
  ArrowDownCircleIcon,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";
import { useChat } from "@ai-sdk/react";

export default function Chat() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showChatIcon, setShowChatIcon] = useState(false);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    stop,
    reload,
    error,
  } = useChat({ api: "/api/gemini" });

  const scrollRef = useRef<HTMLDivElement>(null);

  const chatIconRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowChatIcon(true);
      } else {
        setShowChatIcon(false);
        setIsChatOpen(false);
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="flex font-mono flex-col">
      <AnimatePresence>
        {showChatIcon && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-4 right-4 z-50"
          >
            <Button
              ref={chatIconRef}
              onClick={toggleChat}
              className="rounded-full size-14 p-2 shadow-lg"
              size="icon"
            >
              {!isChatOpen ? (
                <MessageCircle className="size-12" />
              ) : (
                <ArrowDownCircleIcon />
              )}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="fixed md:w-[500px] bottom-4 right-4 z-50 w-[95%]"
          >
            <Card className="border-2">
              <CardHeader className="flex font-mono flex-row pb-3 space-y-0 items-center justify-between">
                <CardTitle className="text-lg font-bold">
                  Chat with SonicSeats AI
                </CardTitle>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={toggleChat}
                  className="px-2 py-0"
                >
                  <X className="size-4" />
                  <span className="sr-only">Close Chat</span>
                </Button>
              </CardHeader>
              <CardContent>
                <ScrollArea className="pr-4 h-[300px]">
                  {messages?.length == 0 && (
                    <div className="w-full items-center  justify-center flex gap-3 mt-32 text-gray-500 ">
                      No Messages Yet
                    </div>
                  )}
                  {messages?.map((message, index) => (
                    <div
                      key={index}
                      className={`mb-4 ${
                        message.role === "user" ? "text-right" : "text-left"
                      }`}
                    >
                      <div
                        className={`inline-block p-3 rounded-lg ${
                          message.role === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        }`}
                      >
                        <ReactMarkdown
                          children={message.content}
                          remarkPlugins={[remarkGfm]}
                          components={{
                            code({
                              node,
                              inline,
                              className,
                              children,
                              ...props
                            }) {
                              return inline ? (
                                <code
                                  {...props}
                                  className="bg-gray-200 px-1 rounded"
                                >
                                  {children}
                                </code>
                              ) : (
                                <pre
                                  {...props}
                                  className="bg-gray-200 px-1 rounded "
                                >
                                  <code>{children}</code>
                                </pre>
                              );
                            },
                            ul: ({ children }) => (
                              <ul className="list-disc ml-4">{children}</ul>
                            ),
                            ol: ({ children }) => (
                              <li className="list-decimal ml-4">{children}</li>
                            ),
                          }}
                        />
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="w-full itemn-center flex justify-center gap-3">
                      <Loader2 className="animate-spin h-5 w-5 text-primary" />
                      <button
                        className="underline"
                        type="button"
                        onClick={() => stop()}
                      >
                        {/* Abort */}
                      </button>
                    </div>
                  )}
                  {error && (
                    <div className="w-full items-center flex justify-center  gap-3">
                      <div>An error occured</div>
                      <button
                        className="underline"
                        type="button"
                        onClick={() => reload()}
                      >
                        Retry
                      </button>
                    </div>
                  )}
                  <div ref={scrollRef}></div>
                </ScrollArea>
              </CardContent>
              <CardFooter>
                <form
                  onSubmit={handleSubmit}
                  className="flex w-full justify-center items-center space-x-2"
                >
                  <Input
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Type a message"
                    className="w-full"
                  ></Input>
                  <Button
                    type="submit"
                    className="size-9"
                    disabled={isLoading}
                    size="icon"
                  >
                    <Send className="size-4" />
                  </Button>
                </form>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
