import React, { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Heart, MessageCircle, Repeat2, Share, MoreHorizontal } from 'lucide-react';
import CommentSection from './CommentSection';

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
  const [showComments, setShowComments] = useState(false);
  const commentsRef = useRef<HTMLDivElement>(null);

  const comments = [
    {
      id: `${post.id}-c1`,
      author: 'Alex Rivera',
      handle: 'alexr',
      content: 'Love the energy here. The layout feels sharp and focused.',
      timestamp: '1h',
    },
    {
      id: `${post.id}-c2`,
      author: 'Sam Lee',
      handle: 'samlee',
      content: 'The contrast and spacing make this super readable.',
      timestamp: '30m',
    },
  ];

  useLayoutEffect(() => {
    const element = commentsRef.current;
    if (!element) return;

    if (showComments) {
      gsap.set(element, { display: 'block' });
      gsap.fromTo(
        element,
        { height: 0, opacity: 0 },
        { height: 'auto', opacity: 1, duration: 0.35, ease: 'power2.out' }
      );
    } else {
      gsap.to(element, { height: 0, opacity: 0, duration: 0.25, ease: 'power2.in' });
    }
  }, [showComments]);
  
  return (
    <article className={`border-4 ${borderColor} bg-white mb-6 p-8`} data-reveal>
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
            <button
              className={`flex items-center gap-3 uppercase text-sm font-bold ${
                showComments ? 'text-white bg-black px-3 py-1 border-2 border-black' : 'text-black'
              }`}
              aria-label="Replies"
              aria-expanded={showComments}
              onClick={() => setShowComments((prev) => !prev)}
            >
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

          <div
            ref={commentsRef}
            className="mt-4 overflow-hidden"
            style={{ height: 0, opacity: 0 }}
            aria-hidden={!showComments}
          >
            <CommentSection comments={comments} />
          </div>
        </div>
      </div>
    </article>
  );
}
