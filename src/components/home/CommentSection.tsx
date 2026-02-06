interface Comment {
  id: string;
  author: string;
  handle: string;
  content: string;
  timestamp: string;
}

interface CommentSectionProps {
  comments: Comment[];
}

export default function CommentSection({ comments }: CommentSectionProps) {
  return (
    <div className="border-2 border-gray-300 bg-gray-50 p-4">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-bold uppercase tracking-tight text-black">Comments</h4>
        <span className="text-xs font-bold uppercase text-gray-500">{comments.length} total</span>
      </div>

      <div className="flex gap-3 mb-4">
        <div className="w-10 h-10 bg-gray-300 border-2 border-black flex-shrink-0" />
        <div className="flex-1">
          <textarea
            placeholder="Add your comment"
            className="w-full resize-none border-2 border-gray-400 bg-white px-3 py-2 text-sm font-medium focus:outline-none focus:border-black"
            rows={2}
          />
          <div className="flex justify-end mt-2">
            <button className="bg-black text-white px-4 py-2 text-xs font-bold uppercase tracking-tight border-2 border-black btn-dynamic">
              Post
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {comments.map((comment) => (
          <div key={comment.id} className="border-2 border-gray-300 bg-white p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase text-black">{comment.author}</span>
                <span className="text-xs uppercase text-gray-500">@{comment.handle}</span>
              </div>
              <span className="text-[10px] uppercase text-gray-400">{comment.timestamp}</span>
            </div>
            <p className="text-sm text-gray-800 leading-relaxed">{comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
