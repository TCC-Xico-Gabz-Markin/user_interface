import { MessageType } from "@/types/MessageType";


type Props = {
    message: MessageType,
}

export default function Message(props: Props) {
    const { message } = props;

    if (message.sentBy == "user") {
        return (
            <div className="w-full h-fit flex justify-end mt-2">
                <div className="max-w-96 w-fit h-fit bg-details-1 text-white rounded-4xl p-4">
                    <p className="whitespace-pre-wrap">{message.content}</p>
                </div>
            </div>
        )
    }

    if (message.sentBy == "bot") {
        return (
            <div className="mt-2 w-full h-fit">
                <p>{message.content}</p>
            </div>
        )
    }
}