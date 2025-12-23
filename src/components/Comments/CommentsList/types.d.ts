import { TaskComment } from "@/types/Task";

export type CommentsListProps = {
    comments: TaskComment[];
    onDelete: (id: string) => Promise<void>;
}