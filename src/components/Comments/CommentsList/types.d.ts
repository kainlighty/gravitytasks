import { TaskComment } from "@/types/Task";

type CommentsListProps = {
    comments: TaskComment[];
    onDelete: (id: string) => Promise<void>;
}

export default CommentsListProps;