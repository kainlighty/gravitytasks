type CommentEditorProps = {
    onSend: (text: string) => Promise<void>;
    onClearAll: () => Promise<void>;
    hasComments: boolean;
}

export default CommentEditorProps;