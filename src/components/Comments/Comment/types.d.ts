import type { TaskComment } from "@/types/Task";

export type CommentProps = {
    className?: string;
    comment: TaskComment;
    handleDeleteComment: (id: string) => void;
}