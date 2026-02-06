import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { NavigationSidebar } from './NavigationSidebar';
import { TrendingSidebar } from './TrendingSidebar';
import { ComposePost } from './ComposePost';
import { PostCard, Post } from './PostCard';

gsap.registerPlugin(ScrollTrigger);

const basePosts: Post[] = [
  {
    id: '1',
    author: {
      name: 'Tech News',
      username: 'technews',
      verified: true,
    },
    content:
      'Breaking: New developments in AI technology are reshaping how we work and interact with computers. The future is here!',
    timestamp: '2h',
    likes: 1243,
    retweets: 456,
    replies: 89,
    image:
      'https://images.unsplash.com/photo-1683701251422-912fe98f2b5e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    borderColor: 'border-red-600',
  },
  {
    id: '2',
    author: {
      name: 'Nature Photography',
      username: 'naturepics',
      verified: false,
    },
    content: 'Captured this stunning view during my morning hike. Nature never fails to amaze!',
    timestamp: '4h',
    likes: 2891,
    retweets: 678,
    replies: 145,
    image:
      'https://images.unsplash.com/photo-1600257729950-13a634d32697?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    borderColor: 'border-blue-600',
  },
  {
    id: '3',
    author: {
      name: 'Urban Explorer',
      username: 'cityvibes',
      verified: true,
    },
    content: 'The city at night hits different. Sometimes you just need to stop and appreciate the view.',
    timestamp: '6h',
    likes: 1567,
    retweets: 289,
    replies: 67,
    image:
      'https://images.unsplash.com/photo-1595273647789-54432cefc8e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    borderColor: 'border-gray-400',
  },
  {
    id: '4',
    author: {
      name: 'Coffee Culture',
      username: 'coffeelovers',
      verified: false,
    },
    content: "Monday mornings call for extra caffeine.\n\nWhat's your go-to coffee order?",
    timestamp: '8h',
    likes: 3421,
    retweets: 892,
    replies: 234,
    image:
      'https://images.unsplash.com/photo-1543256840-0709ad5d3726?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    borderColor: 'border-green-600',
  },
  {
    id: '5',
    author: {
      name: 'Design Studio',
      username: 'designstudio',
      verified: true,
    },
    content:
      "Just shipped our biggest project of the year! Couldn't have done it without this amazing team. Here's to pushing boundaries and creating something special.",
    timestamp: '12h',
    likes: 987,
    retweets: 234,
    replies: 56,
    borderColor: 'border-purple-600',
  },
  {
    id: '6',
    author: {
      name: 'Fitness Coach',
      username: 'fitlife',
      verified: false,
    },
    content:
      'Remember: Progress over perfection. Every small step counts toward your goals. Keep showing up!',
    timestamp: '14h',
    likes: 2156,
    retweets: 445,
    replies: 123,
    borderColor: 'border-yellow-600',
  },
];

const createBatch = (batchIndex: number) =>
  basePosts.map((post) => ({
    ...post,
    id: `${post.id}-${batchIndex}`,
  }));

export default function HomeFeed() {
  const [posts, setPosts] = useState<Post[]>(() => createBatch(0));
  const [loading, setLoading] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const pageRef = useRef(1);
  const loadingRef = useRef(false);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting || loadingRef.current) return;
        loadingRef.current = true;
        observer.unobserve(sentinel);
        setLoading(true);
        setTimeout(() => {
          setPosts((prev) => [...prev, ...createBatch(pageRef.current)]);
          pageRef.current += 1;
          setLoading(false);
          loadingRef.current = false;
          observer.observe(sentinel);
        }, 700);
      },
      { rootMargin: '300px' }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>('[data-reveal]');
      items.forEach((item) => {
        gsap.fromTo(
          item,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [posts.length]);

  return (
    <div ref={containerRef} className="min-h-screen bg-gray-100 lg:flex">
      <NavigationSidebar />

      <main className="w-full lg:flex-1 lg:border-r-4 lg:border-black lg:max-w-3xl bg-gray-100">
        <div className="border-b-4 border-black p-6 sticky top-0 bg-white z-10" data-reveal>
          <h1 className="text-2xl font-bold uppercase tracking-tight text-black">HOME FEED</h1>
        </div>

        <ComposePost />

        <div className="px-6 pb-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}

          <div ref={sentinelRef} className="py-6">
            <div className="border-2 border-dashed border-gray-400 text-center py-4 text-xs font-bold uppercase text-gray-500">
              {loading ? 'Loading more posts...' : 'Scroll to load more'}
            </div>
          </div>
        </div>
      </main>

      <TrendingSidebar />
    </div>
  );
}
