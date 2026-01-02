import { Component, Signal, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ChatService } from '../services/chat';
import { Chat } from '../../interfaces/chat';

@Component({
  selector: 'app-chats-component',
  imports: [CommonModule],
  templateUrl: './chats-component.html',
  styleUrl: './chats-component.css',
  standalone: true
})
export class ChatsComponent {
  searchTerm = signal('');
  filteredChats: Signal<Chat[]>;
  
  constructor (
    public chatService: ChatService, 
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.filteredChats = computed(() => {
      const chats = this.chatService.chats();
      const term = this.searchTerm().toLowerCase().trim();

      if (!term) {
        return chats;
      }

      return chats.filter((chat: Chat) =>
        chat.name.toLowerCase().includes(term) ||
        chat.lastMessage?.toLowerCase().includes(term)
      );
    });

  }

  open(id: string) {
    this.router.navigate([], { 
      queryParams: { chat: id },
      relativeTo: this.route 
    });
  }

  nuevo() {
    this.router.navigate(['/nuevo']);
  }

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchTerm.set(input.value);
  }

  getLastMessageTime(chat: Chat): string {
    if (!chat.messages || chat.messages.length === 0) {
      return '';
    }
    const lastMessage = chat.messages[chat.messages.length - 1];
    return new Date(lastMessage.date).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  }

  formatTime(dateString?: string): string {
    if (!dateString) return '';
    return new Date(dateString).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  }

  isActiveChat(id: string): boolean {
  return this.route.snapshot.queryParams['chat'] === id;
  }
}