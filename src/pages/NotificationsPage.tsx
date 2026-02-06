import AppShell from '../components/layout/AppShell';
import { TrendingSidebar } from '../components/home/TrendingSidebar';

const notifications = [
  {
    id: 'n1',
    title: 'New follower',
    detail: 'Jordan Mills started following you.',
    time: '2m',
    tone: 'border-blue-600',
  },
  {
    id: 'n2',
    title: 'Mentioned you',
    detail: 'Design Studio mentioned you in a post.',
    time: '10m',
    tone: 'border-red-600',
  },
  {
    id: 'n3',
    title: 'New comment',
    detail: 'Alex Rivera commented on your post.',
    time: '1h',
    tone: 'border-black',
  },
  {
    id: 'n4',
    title: 'Weekly recap',
    detail: 'Your posts reached 12k people this week.',
    time: '1d',
    tone: 'border-green-600',
  },
];

export default function NotificationsPage() {
  return (
    <AppShell title="Notifications" right={<TrendingSidebar />}>
      <section className="page-reveal space-y-4">
        {notifications.map((item) => (
          <div key={item.id} className={`border-4 ${item.tone} bg-white p-5`}>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-base font-bold uppercase tracking-tight text-black">{item.title}</h2>
              <span className="text-xs font-bold uppercase text-gray-500">{item.time}</span>
            </div>
            <p className="text-sm text-gray-700">{item.detail}</p>
          </div>
        ))}
      </section>
    </AppShell>
  );
}
