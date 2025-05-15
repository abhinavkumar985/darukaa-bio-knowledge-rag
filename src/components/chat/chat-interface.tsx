"use client";

import type { FormEvent } from 'react';
import { useState, useRef, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import type { Message } from '@/types/chat';
import { User, Bot, Send, Loader2 } from 'lucide-react';
import { format } from 'date-fns';

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [suggestion, setSuggestion] = useState<string[]>([]);
  // Scroll to the bottom when messages state changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;
    submitMessage(inputValue)

  };
  // Suggested code may be subject to a license. Learn more: ~LicenseLog:1641399544.
  const submitMessage = async (inputValue: string) => {
    const userMessage: Message = {
      id: crypto.randomUUID(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputValue('');
    setIsLoading(true);



    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: userMessage.text }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Failed to get response: ${response.status}`);
      }

      const data = await response.json();
      // Assuming the backend response has a field like 'response' or 'answer' for the bot's message text.
      // Adjust this based on the actual backend response structure.
      const botText = data.answer || data.response || "Sorry, I couldn't process that.";


      const botMessage: Message = {
        id: crypto.randomUUID(),
        text: botText.answerText,
        sender: 'bot',
        timestamp: new Date(),
        relatedQuestions: botText.relatedQuestions
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setSuggestion(botText.relatedQuestions);
    } catch (error) {
      console.error('Error communicating with backend:', error);
      toast({
        title: "Error",
        description: (error as Error).message || "Failed to communicate with the chat service. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }
  const handleRelatedQuestionClick = (question: string) => {
    submitMessage(question)
    setSuggestion([])
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-2xl rounded-xl">
      <CardHeader className="border-b">
        <CardTitle className="text-2xl font-semibold text-center text-primary">Chat with Darukaa Assistant</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[50vh] p-4">
          <div className="space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-end gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
              >
                {message.sender === 'bot' && (
                  <Avatar className="h-10 w-10 border border-accent">
                    <AvatarFallback>
                      <Bot className="h-5 w-5 text-accent" />
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`max-w-[70%] p-3 rounded-xl shadow ${message.sender === 'user'
                    ? 'bg-primary text-primary-foreground rounded-br-none'
                    : 'bg-secondary text-secondary-foreground rounded-bl-none'
                    }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-primary-foreground/70 text-right' : 'text-muted-foreground text-left'}`}>
                    {format(message.timestamp, 'p')}
                  </p>
                </div>
                {message.sender === 'user' && (
                  <Avatar className="h-10 w-10 border border-primary">
                    <AvatarFallback>
                      <User className="h-5 w-5 text-primary" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            {isLoading && messages[messages.length - 1]?.sender === 'user' && (
              <div className="flex items-end gap-3 justify-start">
                <Avatar className="h-10 w-10 border border-accent">
                  <AvatarFallback>
                    <Bot className="h-5 w-5 text-accent" />
                  </AvatarFallback>
                </Avatar>
                <div className="max-w-[70%] p-3 rounded-xl shadow bg-secondary text-secondary-foreground rounded-bl-none">
                  <div className="flex items-center space-x-2">
                    <Loader2 className="h-4 w-4 animate-spin text-accent" />
                    <p className="text-sm text-muted-foreground">Darukaa is typing...</p>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} /> {/* Invisible element to scroll to */}
          </div>
          {suggestion && suggestion.length > 0 && (
            <div className="mt-3 flex flex-col gap-2">
              {suggestion.map((question, index) => (
                <Button key={index} className="text-xs text-accent-foreground hover:underline cursor-pointer" onClick={() => handleRelatedQuestionClick(question)}>
                  {question}
                </Button>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
      <CardFooter className="p-4 border-t">
        <form onSubmit={handleSubmit} className="flex w-full items-center gap-3">
          <Input
            type="text"
            placeholder="Type your message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isLoading}
            className="flex-1 rounded-lg text-base"
            aria-label="Chat message input"
          />
          <Button type="submit" disabled={isLoading || !inputValue.trim()} size="icon" className="rounded-lg w-10 h-10" aria-label="Send message">
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Send className="h-5 w-5" />
            )}
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
