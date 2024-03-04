"use client";

import { Companion, Message } from "@prisma/client";
import ChatHeader from "@/components/chat-header";

interface ChatClientProps {
  companion: Companion & {
    messages: Message[];
    _count: {
      messages: number;
    };
  };
}

const ChatClient = ({ companion }: ChatClientProps) => {
  return (
    <div>
      <ChatHeader companion={companion} />
    </div>
  );
};

export default ChatClient;
