import React from 'react';

interface CommentDeleteProps {
  commentId: string;
  onDelete: (commentId: string) => void;
  onCancel: () => void;
}

const CommentDelete: React.FC<CommentDeleteProps> = ({ commentId, onDelete, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-30 bg-black bg-opacity-50">
      <div className="bg-[#1c1c1c] p-4 rounded shadow-lg">
        <p>Are you sure you want to delete this comment?</p>
        <div className="flex justify-end space-x-2 mt-4">
          <button
className="text-sm max-w-max px-6 py-1 mt-2 max-h-max border rounded border-[#303030] bg-[#252525]"            onClick={onCancel}
          >
            Cancel
          </button>
          <button
className="text-sm max-w-max px-6 py-1 mt-2 max-h-max border rounded border-[#c33b3b] bg-[#bd3434]"            onClick={() => onDelete(commentId)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentDelete;