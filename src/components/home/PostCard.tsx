import { Heart, MessageCircle, Repeat2, Share, MoreHorizontal } from 'lucide-react';

export interface Post {
  id: string;
  author: {
    name: string;
    username: string;
    avatar?: string;
    verified?: boolean;
  };
  content: string;
  timestamp: string;
  likes: number;
  retweets: number;
  replies: number;
  image?: string;
  borderColor?: string;
}

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const borderColor = post.borderColor || 'border-gray-400';

  return (
    <article className={`border-4 ${borderColor} bg-white mb-6 p-8`}>
      <div className="flex gap-6">
        <div className="w-16 h-16 bg-gray-300 border-2 border-black flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex items-center gap-2">
              <span className="font-bold text-black uppercase tracking-tight">{post.author.name}</span>
              <span className="text-gray-500 uppercase text-sm">@{post.author.username}</span>
            </div>
            <button className="text-black" aria-label="More options">
              <MoreHorizontal className="w-6 h-6" />
            </button>
          </div>

          <p className="text-black text-lg leading-relaxed mb-6 whitespace-pre-line">{post.content}</p>

          {post.image && (
            <div className="mb-6 border-4 border-black overflow-hidden">
              <img src={post.image} alt="Post attachment" className="w-full max-h-96 object-cover" />
            </div>
          )}

          <div className="flex gap-8 pt-4 border-t-2 border-gray-300">
            <button className="flex items-center gap-3 text-black uppercase text-sm font-bold" aria-label="Replies">
              <MessageCircle className="w-5 h-5" />
              <span>{post.replies}</span>
            </button>

            <button className="flex items-center gap-3 text-black uppercase text-sm font-bold" aria-label="Reposts">
              <Repeat2 className="w-5 h-5" />
              <span>{post.retweets}</span>
            </button>

            <button className="flex items-center gap-3 text-black uppercase text-sm font-bold" aria-label="Likes">
              <Heart className="w-5 h-5" />
              <span>{post.likes}</span>
            </button>

            <button className="text-black ml-auto" aria-label="Share">
              <Share className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
