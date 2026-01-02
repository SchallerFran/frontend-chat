import { CommonModule } from '@angular/common';
import { Component, Signal, computed, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatService } from '../services/chat';
import { Chat } from '../../interfaces/chat';

@Component({
  selector: 'app-chat-detail-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-detail-component.html',
  styleUrl: './chat-detail-component.css',
})
export class ChatDetailComponent implements OnInit, OnDestroy {
  chatSignal!: Signal<Chat | undefined>
  newText = ''
  private id?: string

  constructor(
    private route: ActivatedRoute,
    private chatService: ChatService,
    private router: Router
  ){}

  ngOnInit():void{
    this.route.queryParams.subscribe(params => {
      this.id = params['chat'];
      if(this.id){
        this.chatSignal = this.chatService.getChatSignal(this.id);
        this.chatService.markAsRead(this.id);
      }
      else{
        this.chatSignal = computed(() => undefined);
      }
    });
  }

  ngOnDestroy(): void {
  }

  send(){
    if(!this.id || !this.newText.trim()){
      return 
    }
    this.chatService.sendMessage(this.id, this.newText.trim(), true)
    this.newText = ''
  }

  formatDate (date: string){
    if(!date){
      return ''
    }
    const datetime = new Date(date)
    return datetime.toLocaleString()
  }

  formatTime (dateString?: string){
    if(!dateString){
      return ''
    }
    const date = new Date(dateString)
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    return `${hours}:${minutes}`
  }

  goBack() {
    this.router.navigate(['/chats']);
  }
}