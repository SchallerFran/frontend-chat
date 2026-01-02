export interface Message {
    id: string,
    text: string,
    fromMe: boolean,
    date: string,
    status?: 'sent' | 'delivered' | 'read'
}