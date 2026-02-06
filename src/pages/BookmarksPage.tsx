import AppShell from '../components/layout/AppShell';
import { TrendingSidebar } from '../components/home/TrendingSidebar';
import { PostCard, Post } from '../components/home/PostCard';

const savedPosts: Post[] = [
  {
    id: 'b1',
    author: { name: 'Creative Lab', username: 'creativelab' },
    content: 'Saved layout study: strong grid, bold headers, generous spacing.',
    timestamp: '1d',
    likes: 412,
    retweets: 98,
    replies: 21,
    borderColor: 'border-black',
  },
  {
    id: 'b2',
    author: { name: 'UI Patterns', username: 'uipatterns' },
    content: 'Bookmarking this for later: the alignment and contrast are perfect.',
    timestamp: '2d',
    likes: 233,
    retweets: 44,
    replies: 11,
    borderColor: 'border-red-600',
  },
];

export default function BookmarksPage() {
  return (
    <AppShell title="Bookmarks" right={<TrendingSidebar />}>
      <section className="page-reveal border-4 border-black bg-white p-6">
        <h2 className="text-lg font-bold uppercase tracking-tight text-black">Saved collections</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {['Inspiration', 'Research', 'Reads', 'Case Studies'].map((item) => (
            <span key={item} className="border-2 border-black px-4 py-2 text-xs font-bold uppercase">
              {item}
            </span>
          ))}
        </div>
      </section>

      <section className="page-reveal">
        {savedPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </section>
    </AppShell>
  );
}
