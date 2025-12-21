import { TaskComment } from "@/types/Task";

type CommentProps = {
    className?: string;
    comment: TaskComment;
    handleDeleteComment: (id: string) => void;
}

export default CommentProps;