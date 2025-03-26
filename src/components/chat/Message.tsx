import { MessageType } from "@/types/MessageType";


export default function Message(props: MessageType) {
    const { content, sentBy } = props;

    if (sentBy == "user") {
        return (
            <div className="w-full h-fit flex justify-end mt-2">
                <div className="max-w-96 w-fit h-fit bg-details-1 text-white rounded-4xl p-4">
                    <p className="whitespace-pre-wrap">{content}</p>
                </div>
            </div>
        )
    }

    if (sentBy == "bot") {
        return (
            <div className="mt-2">
                <p>{content}</p>
            </div>
        )
    }
}