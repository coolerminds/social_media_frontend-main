import AppShell from '../components/layout/AppShell';
import { TrendingSidebar } from '../components/home/TrendingSidebar';

const communities = [
  {
    id: 'c1',
    name: 'Design Systems',
    members: '12.4k',
    description: 'Deep dives into design tokens, grids, and typography.',
  },
  {
    id: 'c2',
    name: 'Product Builders',
    members: '8.9k',
    description: 'Build faster with crisp UI patterns and workflows.',
  },
  {
    id: 'c3',
    name: 'Creative Coding',
    members: '6.2k',
    description: 'Generative visuals, motion, and interactive experiments.',
  },
];

export default function CommunitiesPage() {
  return (
    <AppShell title="Communities" right={<TrendingSidebar />}>
      <section className="page-reveal grid gap-6">
        {communities.map((community) => (
          <div key={community.id} className="border-4 border-black bg-white p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold uppercase tracking-tight text-black">{community.name}</h2>
              <span className="text-xs font-bold uppercase text-gray-500">{community.members} members</span>
            </div>
            <p className="text-sm text-gray-600 mt-3">{community.description}</p>
            <div className="mt-4 flex items-center gap-3">
              <button className="bg-black text-white px-4 py-2 text-xs font-bold uppercase tracking-tight border-2 border-black">
                Join
              </button>
              <button className="border-2 border-black px-4 py-2 text-xs font-bold uppercase tracking-tight text-black">
                Preview
              </button>
            </div>
          </div>
        ))}
      </section>
    </AppShell>
  );
}
