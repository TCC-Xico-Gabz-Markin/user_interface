import { MessageType } from "./MessageType"

export type ChatType = {
    id: string,
    messages: MessageType[],
    createdAt?: Date
    updatedAt?: Date
}