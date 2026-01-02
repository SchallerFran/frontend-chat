import { Message } from "./message";

export interface Chat {
    id: string;
    name: string;
    messages: Message[];
    lastMessage?: string;
    isOnline?: boolean;  
    lastSeen?: string;   
    unreadCount?: number; 
}