import { computed, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { Chat } from '../../interfaces/chat';
import { Message } from '../../interfaces/message';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private _chats: WritableSignal<Chat[]> = signal(this.createMook())
  public readonly chats: Signal<Chat[]> = this._chats
  constructor (){}

  private createMook (): Chat[]{
    const now = new Date().toISOString()
    return [
      {
        id: '1',
        name: 'Lucia',
        lastMessage: 'Nos vemos mañana',
        messages: [
          {
            id: '1',
            text: 'Hola!', 
            fromMe: false, 
            date: now
          },
          {
            id: '2',
            text: 'Que tal?', 
            fromMe: true, 
            date: now
          }
        ]
      },
      {
        id: '2',
        name: 'Marcos',
        lastMessage: 'Que sale el finde??',
        messages: [
          {
            id: '1',
            text: 'Hola!', 
            fromMe: false, 
            date: now
          },
          {
            id: '2',
            text: 'Que tal?', 
            fromMe: true, 
            date: now
          },
          {
            id: '3',
            text: 'Que sale el finde??', 
            fromMe: false, 
            date: now
          }
        ],
        isOnline: true
      }
    ]
  }

  getChatsSnapshot(): Chat[]{
    return this._chats()
  }

  getChatSignal (id:string): Signal<Chat | undefined>{
    return computed(
      () => {
        return this._chats().find(chat => chat.id === id)
      })
  }

  createChat (name: string): Chat{
    const new_chat : Chat = {
      id: Date.now().toString(),
      name: name,
      lastMessage: '',
      messages: []
    }
    this._chats.update(
      (chats_actuales) => {
        return [...chats_actuales, new_chat ]
      }
    )
    return new_chat
  }

  sendMessage(chat_id:string, text: string, fromMe = true): Message | undefined {
    const new_message : Message = {
      id: Date.now().toString(),
      text: text,
      fromMe: fromMe,
      date: new Date().toISOString()
    }

    this._chats.update (
      (chats_actuales) => {
        return chats_actuales.map(
          (chat) => {
            if(chat.id !== chat_id){
              return chat
            }
            const updated_messages = [...chat.messages, new_message]
            return {
              ...chat,
              messages: updated_messages,
              lastMessage: text
            }
          }
        )
      }
    )
    return new_message
  }

  markAsRead(chatId: string) {
    this._chats.update(chats => 
      chats.map(chat => {
        if (chat.id === chatId) {
          return {
            ...chat,
            messages: chat.messages.map(msg => 
              msg.fromMe ? msg : { ...msg, status: 'read' }
            ),
            unreadCount: 0
          };
        }
        return chat;
      })
    );
  }
}