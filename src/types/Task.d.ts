export type Task = {
    id: string;
    createdAt: string;
    updatedAt: string;
    completed: boolean;
    comments?: TaskComment[];
    // FormValues
    name: string;
    deadline?: string | null;
    important: boolean;
    tags?: string[];
    description: string;
};

export type TaskComment = {
    id: string;
    text: string;
};