"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Search,
  Send,
  Paperclip,
  MoreVertical,
  Phone,
  Video,
  Star,
  Archive,
  CheckCheck,
  Clock,
  FileText,
  DollarSign,
  Users,
  CheckCircle2,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const conversations = [
  {
    id: 1,
    name: "TechCreator Pro",
    avatar: "TC",
    lastMessage: "Got it! Just signed the contract. I'll start working on the script.",
    time: "5m ago",
    unread: 1,
    online: true,
    verified: true,
    subscribers: "245K",
    campaign: "Product Launch Q1",
    dealValue: 4500,
    dealStatus: "active",
  },
  {
    id: 2,
    name: "DevLife Daily",
    avatar: "DD",
    lastMessage: "The script is ready for your review. Let me know if any changes needed.",
    time: "30m ago",
    unread: 2,
    online: true,
    verified: true,
    subscribers: "180K",
    campaign: "Product Launch Q1",
    dealValue: 2800,
    dealStatus: "review",
  },
  {
    id: 3,
    name: "CloudMaster",
    avatar: "CM",
    lastMessage: "Thanks for the feedback! I'll make those adjustments.",
    time: "2h ago",
    unread: 0,
    online: false,
    verified: true,
    subscribers: "156K",
    campaign: "Brand Awareness",
    dealValue: 2500,
    dealStatus: "active",
  },
  {
    id: 4,
    name: "AI Insights",
    avatar: "AI",
    lastMessage: "Would love to discuss the campaign details further.",
    time: "4h ago",
    unread: 0,
    online: true,
    verified: true,
    subscribers: "420K",
    campaign: "Product Launch Q1",
    dealValue: 5500,
    dealStatus: "negotiation",
  },
  {
    id: 5,
    name: "StartupStories",
    avatar: "SS",
    lastMessage: "The video is now live! Here's the link...",
    time: "1d ago",
    unread: 0,
    online: false,
    verified: true,
    subscribers: "320K",
    campaign: "Tutorial Series",
    dealValue: 4200,
    dealStatus: "completed",
  },
]

const messages = [
  {
    id: 1,
    sender: "me",
    content: "Hi! We loved your recent video on productivity tools. Would you be interested in a sponsored integration for our AI workflow platform?",
    time: "10:30 AM",
    read: true,
  },
  {
    id: 2,
    sender: "them",
    content: "Thanks for reaching out! I'd definitely be interested in learning more about TechFlow AI. Could you share more details about what you're looking for?",
    time: "10:45 AM",
    read: true,
  },
  {
    id: 3,
    sender: "me",
    content: "Absolutely! We're looking for a 60-second product integration where you demonstrate how TechFlow AI can automate repetitive tasks. We have a budget of $4,500 for this collaboration.",
    time: "11:00 AM",
    read: true,
  },
  {
    id: 4,
    sender: "me",
    content: "Here are the campaign details:",
    time: "11:01 AM",
    read: true,
    attachment: {
      type: "document",
      name: "TechFlow_Campaign_Brief.pdf",
      size: "2.4 MB",
    },
  },
  {
    id: 5,
    sender: "them",
    content: "This looks great! I've reviewed the brief and I think this would be a perfect fit for my audience. The budget works for me. Should we proceed with the contract?",
    time: "2:30 PM",
    read: true,
  },
  {
    id: 6,
    sender: "me",
    content: "Perfect! I'll send over the contract through SponsorBridge. Once you sign, the funds will be held in escrow until content delivery.",
    time: "2:45 PM",
    read: true,
  },
  {
    id: 7,
    sender: "me",
    content: "Contract sent! You should see it in your deals section.",
    time: "2:50 PM",
    read: true,
  },
  {
    id: 8,
    sender: "them",
    content: "Got it! Just signed the contract. I'll start working on the script and send it over for review by Friday.",
    time: "3:15 PM",
    read: false,
  },
]

const dealStatusConfig = {
  active: { label: "Active Deal", color: "bg-[#1A7A4A]/10 text-[#1A7A4A] border-[#1A7A4A]/20" },
  negotiation: { label: "Negotiating", color: "bg-[#C9943A]/10 text-[#C9943A] border-[#C9943A]/20" },
  review: { label: "In Review", color: "bg-[#C9943A]/10 text-[#C9943A] border-[#C9943A]/20" },
  completed: { label: "Completed", color: "bg-muted text-muted-foreground" },
}

export default function CompanyMessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0])
  const [message, setMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredConversations = conversations.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.campaign.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-4">
      {/* Conversations List */}
      <Card className="w-80 flex-shrink-0 overflow-hidden">
        <div className="border-b border-border p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search creators or campaigns..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
        <ScrollArea className="h-[calc(100%-4.5rem)]">
          <div className="p-2">
            {filteredConversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setSelectedConversation(conv)}
                className={`w-full rounded-lg p-3 text-left transition-colors ${
                  selectedConversation.id === conv.id
                    ? "bg-muted"
                    : "hover:bg-muted/50"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-gradient-to-br from-[#C9943A] to-[#C9943A]/60 text-background font-semibold">
                        {conv.avatar}
                      </AvatarFallback>
                    </Avatar>
                    {conv.online && (
                      <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background bg-[#1A7A4A]" />
                    )}
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <p className="font-medium text-foreground">{conv.name}</p>
                        {conv.verified && (
                          <CheckCircle2 className="h-3.5 w-3.5 text-[#1A7A4A]" />
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground">{conv.time}</span>
                    </div>
                    <p className="mt-0.5 truncate text-sm text-muted-foreground">
                      {conv.lastMessage}
                    </p>
                    <div className="mt-1.5 flex items-center justify-between">
                      <Badge
                        variant="outline"
                        className={`text-xs ${dealStatusConfig[conv.dealStatus as keyof typeof dealStatusConfig].color}`}
                      >
                        {dealStatusConfig[conv.dealStatus as keyof typeof dealStatusConfig].label}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{conv.campaign}</span>
                    </div>
                  </div>
                  {conv.unread > 0 && (
                    <Badge className="bg-[#C9943A] text-foreground">{conv.unread}</Badge>
                  )}
                </div>
              </button>
            ))}
          </div>
        </ScrollArea>
      </Card>

      {/* Chat Area */}
      <Card className="flex flex-1 flex-col overflow-hidden">
        {/* Chat Header */}
        <div className="flex items-center justify-between border-b border-border p-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-gradient-to-br from-[#C9943A] to-[#C9943A]/60 text-background font-semibold">
                {selectedConversation.avatar}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <p className="font-medium text-foreground">{selectedConversation.name}</p>
                {selectedConversation.verified && (
                  <CheckCircle2 className="h-4 w-4 text-[#1A7A4A]" />
                )}
                {selectedConversation.online && (
                  <span className="text-xs text-[#1A7A4A]">Online</span>
                )}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-3 w-3" />
                <span>{selectedConversation.subscribers} subscribers</span>
                <span>-</span>
                <span>{selectedConversation.campaign}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className={dealStatusConfig[selectedConversation.dealStatus as keyof typeof dealStatusConfig].color}
            >
              ${selectedConversation.dealValue.toLocaleString()}
            </Badge>
            <Button variant="ghost" size="icon">
              <Phone className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Video className="h-4 w-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <FileText className="mr-2 h-4 w-4" />
                  View Deal
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Users className="mr-2 h-4 w-4" />
                  View Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Star className="mr-2 h-4 w-4" />
                  Star Conversation
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Archive className="mr-2 h-4 w-4" />
                  Archive
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[70%] rounded-2xl px-4 py-2.5 ${
                    msg.sender === "me"
                      ? "bg-foreground text-background"
                      : "bg-muted text-foreground"
                  }`}
                >
                  <p className="text-sm">{msg.content}</p>
                  {msg.attachment && (
                    <div
                      className={`mt-2 flex items-center gap-2 rounded-lg p-2 ${
                        msg.sender === "me" ? "bg-background/10" : "bg-background"
                      }`}
                    >
                      <FileText className="h-8 w-8 text-[#C9943A]" />
                      <div>
                        <p className={`text-sm font-medium ${msg.sender === "me" ? "text-background" : "text-foreground"}`}>
                          {msg.attachment.name}
                        </p>
                        <p className={`text-xs ${msg.sender === "me" ? "text-background/70" : "text-muted-foreground"}`}>
                          {msg.attachment.size}
                        </p>
                      </div>
                    </div>
                  )}
                  <div className={`mt-1 flex items-center justify-end gap-1 ${
                    msg.sender === "me" ? "text-background/70" : "text-muted-foreground"
                  }`}>
                    <span className="text-xs">{msg.time}</span>
                    {msg.sender === "me" && (
                      msg.read ? (
                        <CheckCheck className="h-3 w-3" />
                      ) : (
                        <Clock className="h-3 w-3" />
                      )
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Message Input */}
        <div className="border-t border-border p-4">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Paperclip className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <DollarSign className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <FileText className="h-4 w-4" />
            </Button>
            <Input
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1"
              onKeyDown={(e) => {
                if (e.key === "Enter" && message.trim()) {
                  setMessage("")
                }
              }}
            />
            <Button
              size="icon"
              className="bg-foreground text-background hover:bg-foreground/90"
              disabled={!message.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
