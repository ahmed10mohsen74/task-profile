import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { X, Send, Bot, User, HelpCircle } from "lucide-react";

interface ChatBotProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const faqs = [
  {
    question: "How do I change my password?",
    answer:
      "You can change your password in the Profile Management section. Enter your current password and set a new one with at least 8 characters including uppercase, lowercase, number, and special character.",
  },
  {
    question: "How do I view my purchased products?",
    answer:
      "Your purchased products are displayed in the main dashboard. You can see their status (Active, Pending, or Expired) and take appropriate actions.",
  },
  {
    question: "What should I do if my product status is 'Pending'?",
    answer:
      "If your product status shows as 'Pending', it means the activation is in progress. This usually takes 24-48 hours. You can click 'Check Status' for updates.",
  },
  {
    question: "How can I contact support?",
    answer:
      "You can use this chatbot for immediate help, or click 'Request Support' on any expired product. For complex issues, I can escalate you to a human agent.",
  },
  {
    question: "Can I get a refund for my purchase?",
    answer:
      "Refund policies vary by product. Please provide your product details and I'll help you understand the refund options available.",
  },
  {
    question: "hi",
    answer: "hello how can I help you?",
  },
];

export const ChatBot = ({ isOpen, onClose }: ChatBotProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your support assistant. How can I help you today? You can ask questions or browse our FAQs below.",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [showFAQs, setShowFAQs] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (!currentMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: currentMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setCurrentMessage("");
    setShowFAQs(false);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = generateBotResponse(currentMessage);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  const generateBotResponse = (userText: string): string => {
    const lowerText = userText.toLowerCase();

    if (lowerText.includes("password") || lowerText.includes("change")) {
      return "To change your password, go to the Profile Management section. Enter your current password and create a new one with at least 8 characters including uppercase, lowercase, number, and special character. Need more help with this?";
    }

    if (lowerText.includes("product") || lowerText.includes("purchase")) {
      return "Your purchased products are shown in the dashboard with their current status. Active products are ready to use, Pending products are being activated, and Expired products may need renewal. Which product do you need help with?";
    }

    if (lowerText.includes("refund") || lowerText.includes("return")) {
      return "I can help you with refund inquiries. Could you please tell me which product you'd like to return and the reason? I'll check the refund policy for that specific item.";
    }

    if (
      lowerText.includes("human") ||
      lowerText.includes("agent") ||
      lowerText.includes("support")
    ) {
      return "I'll connect you with a human support agent. Please hold on while I transfer your chat. In the meantime, could you briefly describe your issue so I can provide context to the agent?";
    }

    return "I understand your question. Let me help you with that. Could you provide a bit more detail so I can give you the most accurate assistance? You can also check our FAQs for common questions.";
  };

  const handleFAQClick = (faq: (typeof faqs)[0]) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text: faq.question,
      sender: "user",
      timestamp: new Date(),
    };

    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: faq.answer,
      sender: "bot",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage, botMessage]);
    setShowFAQs(false);
  };

  const escalateToHuman = () => {
    const botMessage: Message = {
      id: Date.now().toString(),
      text: "I'm connecting you with a human support agent. Please wait a moment while I transfer your conversation. Average wait time is 2-3 minutes.",
      sender: "bot",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, botMessage]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50 ">
      <Card className="w-full max-w-md h-[600px] flex flex-col shadow-hover overflow-scroll scr">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 bg-gradient-primary text-white rounded-t-lg">
          <div className="flex items-center space-x-2">
            <Bot className="w-5 h-5" />
            <CardTitle className="text-lg">Support Assistant</CardTitle>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-white hover:bg-white/20"
          >
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0">
          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.sender === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    <div className="flex items-start space-x-2">
                      {message.sender === "bot" && (
                        <Bot className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      )}
                      {message.sender === "user" && (
                        <User className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      )}
                      <div>
                        <p className="text-sm">{message.text}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* FAQ Section */}
              {showFAQs && (
                <div className="mt-4 p-4 bg-muted rounded-lg">
                  <div className="flex items-center space-x-2 mb-3">
                    <HelpCircle className="w-4 h-4 text-primary" />
                    <h3 className="font-medium">Frequently Asked Questions</h3>
                  </div>
                  <div className="space-y-2">
                    {faqs.slice(0, 3).map((faq, index) => (
                      <Button
                        key={index}
                        variant="ghost"
                        size="sm"
                        onClick={() => handleFAQClick(faq)}
                        className="w-full text-left h-auto p-2 justify-start whitespace-normal"
                      >
                        <span className="text-xs">{faq.question}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="border-t p-4">
            <div className="flex space-x-2 mb-2">
              <Input
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                placeholder="Type your message..."
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                className="flex-1"
              />
              <Button onClick={sendMessage} size="icon">
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFAQs(!showFAQs)}
                className="text-xs"
              >
                {showFAQs ? "Hide" : "Show"} FAQs
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={escalateToHuman}
                className="text-xs"
              >
                Human Agent
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
