export enum SentByEnum {
    USER = "user",
    BOT = "bot"
}

export type MessageType = {
    id: string,
    content: string,
    sentBy: SentByEnum
}
