import AppShell from '../components/layout/AppShell';
import { PostCard, Post } from '../components/home/PostCard';

const posts: Post[] = [
  {
    id: 'p1',
    author: { name: 'Your Name', username: 'yourname' },
    content: 'Reworking the home feed layout with a stronger type hierarchy.',
    timestamp: '3h',
    likes: 212,
    retweets: 34,
    replies: 12,
    borderColor: 'border-black',
  },
  {
    id: 'p2',
    author: { name: 'Your Name', username: 'yourname' },
    content: 'Built a new component library from scratch. Launching soon.',
    timestamp: '1d',
    likes: 529,
    retweets: 101,
    replies: 48,
    borderColor: 'border-blue-600',
  },
];

export default function ProfilePage() {
  return (
    <AppShell title="Profile">
      <section className="page-reveal border-4 border-black bg-white">
        <div className="h-32 bg-gray-200 border-b-4 border-black" />
        <div className="p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-gray-300 border-4 border-black" />
              <div>
                <h2 className="text-xl font-bold uppercase tracking-tight text-black">Your Name</h2>
                <p className="text-sm uppercase text-gray-500">@yourname</p>
              </div>
            </div>
            <button className="bg-black text-white px-4 py-2 text-xs font-bold uppercase tracking-tight border-2 border-black btn-dynamic">
              Edit profile
            </button>
          </div>

          <p className="text-sm text-gray-700 mt-4 max-w-xl">
            Designer and builder focused on bold interfaces, clean grids, and confident typography.
          </p>

          <div className="flex flex-wrap gap-6 mt-4">
            {[
              { label: 'Posts', value: '128' },
              { label: 'Followers', value: '12.6k' },
              { label: 'Following', value: '348' },
            ].map((stat) => (
              <div key={stat.label} className="border-2 border-black px-4 py-3">
                <div className="text-xs font-bold uppercase text-gray-500">{stat.label}</div>
                <div className="text-lg font-bold uppercase text-black">{stat.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-reveal">
        <div className="border-4 border-black bg-white px-6 py-4 flex items-center justify-between">
          <h3 className="text-lg font-bold uppercase tracking-tight text-black">Latest posts</h3>
          <span className="text-xs font-bold uppercase text-gray-500">This week</span>
        </div>
        <div className="mt-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </AppShell>
  );
}
