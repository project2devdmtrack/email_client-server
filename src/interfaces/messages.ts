export interface IMessage {
    id: number;
    author: string;
    recepient: string;
    timestamp: number;
    title: string;
    text: string;
}

export interface IGetMessagesProps {
    username: string;
    event: string;
    timestamp: number;
}
