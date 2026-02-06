import AppShell from '../components/layout/AppShell';
import { TrendingSidebar } from '../components/home/TrendingSidebar';
import SearchBar from '../components/search/SearchBar';
import { PostCard, Post } from '../components/home/PostCard';

const featured: Post[] = [
  {
    id: 'exp-1',
    author: { name: 'Design Weekly', username: 'designweekly' },
    content: 'Bold typography, hard borders, and a clean grid are back in style.',
    timestamp: '1h',
    likes: 812,
    retweets: 120,
    replies: 45,
    image:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    borderColor: 'border-black',
  },
  {
    id: 'exp-2',
    author: { name: 'Product Lab', username: 'productlab' },
    content: 'Looking for crisp UI inspiration? Here is a curated feed of strong layouts.',
    timestamp: '3h',
    likes: 645,
    retweets: 88,
    replies: 29,
    borderColor: 'border-blue-600',
  },
];

const tags = ['Design Systems', 'AI Development', 'Minimal UI', 'Creative Tools', 'Productivity', 'Sports'];

export default function ExplorePage() {
  return (
    <AppShell title="Explore" right={<TrendingSidebar />}>
      <div className="page-reveal">
        <SearchBar placeholder="Search topics" />
      </div>

      <section className="page-reveal border-4 border-black bg-white p-6">
        <h2 className="text-lg font-bold uppercase tracking-tight text-black mb-4">Trending tags</h2>
        <div className="flex flex-wrap gap-3">
          {tags.map((tag) => (
            <span key={tag} className="border-2 border-black px-4 py-2 text-xs font-bold uppercase">
              {tag}
            </span>
          ))}
        </div>
      </section>

      <section className="page-reveal">
        <div className="flex items-center justify-between border-4 border-black bg-white px-6 py-4">
          <h2 className="text-lg font-bold uppercase tracking-tight text-black">Featured</h2>
          <span className="text-xs font-bold uppercase text-gray-500">Updated hourly</span>
        </div>
        <div className="mt-6">
          {featured.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </AppShell>
  );
}
