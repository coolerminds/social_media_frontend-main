import { useSearchParams } from 'react-router-dom';
import AppShell from '../components/layout/AppShell';
import SearchBar from '../components/search/SearchBar';
import SearchSidebar from '../components/search/SearchSidebar';
import { PostCard, Post } from '../components/home/PostCard';

const results: Post[] = [
  {
    id: 's1',
    author: { name: 'Tech Insider', username: 'techinsider' },
    content: 'AI development is accelerating with new tooling and sharper UI workflows.',
    timestamp: '15m',
    likes: 210,
    retweets: 31,
    replies: 12,
    borderColor: 'border-black',
  },
  {
    id: 's2',
    author: { name: 'News Daily', username: 'newsdaily' },
    content: 'Latest update: new product releases focus on clean typography and layout.',
    timestamp: '1h',
    likes: 88,
    retweets: 19,
    replies: 5,
    borderColor: 'border-blue-600',
  },
];

export default function SearchPage() {
  const [params] = useSearchParams();
  const query = params.get('q') || '';

  return (
    <AppShell title="Search" right={<SearchSidebar />}>
      <div className="page-reveal">
        <SearchBar initialValue={query} />
      </div>

      <section className="page-reveal border-4 border-black bg-white px-6 py-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-tight text-black">Results</h2>
          <span className="text-xs font-bold uppercase text-gray-500">Showing {results.length}</span>
        </div>
        <p className="text-xs uppercase text-gray-500 mt-2">{query ? `Results for "${query}"` : 'Try searching for a topic'}</p>
      </section>

      <section className="page-reveal">
        {results.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </section>
    </AppShell>
  );
}
