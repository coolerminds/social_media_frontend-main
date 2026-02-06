import AppShell from '../components/layout/AppShell';

const conversations = [
  { id: 'm1', name: 'Design Studio', handle: 'designstudio', preview: 'We just shipped the updates.', time: '2m' },
  { id: 'm2', name: 'Tech News', handle: 'technews', preview: 'Want to collaborate on a post?', time: '30m' },
  { id: 'm3', name: 'Fitness Coach', handle: 'fitlife', preview: 'Morning check-in: keep the momentum.', time: '1h' },
];

const messages = [
  { id: 'c1', from: 'Design Studio', content: 'We just shipped the updates. Thoughts?', time: '2:10 PM' },
  { id: 'c2', from: 'You', content: 'Looks great. The layout feels confident.', time: '2:12 PM' },
  { id: 'c3', from: 'Design Studio', content: 'Nice. Want to share a behind-the-scenes post?', time: '2:15 PM' },
];

export default function MessagesPage() {
  return (
    <AppShell title="Messages">
      <section className="page-reveal grid gap-6 lg:grid-cols-[1.1fr_1.5fr]">
        <div className="border-4 border-black bg-white">
          <div className="border-b-4 border-black px-4 py-3">
            <h2 className="text-sm font-bold uppercase tracking-tight text-black">Inbox</h2>
          </div>
          <div className="divide-y-2 divide-gray-200">
            {conversations.map((item) => (
              <div key={item.id} className="p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-bold uppercase text-black">{item.name}</div>
                    <div className="text-xs uppercase text-gray-500">@{item.handle}</div>
                  </div>
                  <span className="text-xs uppercase text-gray-400">{item.time}</span>
                </div>
                <p className="text-sm text-gray-600 mt-2">{item.preview}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="border-4 border-gray-400 bg-white flex flex-col">
          <div className="border-b-4 border-gray-400 px-4 py-3">
            <h2 className="text-sm font-bold uppercase tracking-tight text-black">Conversation</h2>
          </div>
          <div className="flex-1 p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`border-2 p-3 ${msg.from === 'You' ? 'border-black bg-gray-100 ml-10' : 'border-gray-300 bg-white mr-10'}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase text-black">{msg.from}</span>
                  <span className="text-[10px] uppercase text-gray-400">{msg.time}</span>
                </div>
                <p className="text-sm text-gray-700">{msg.content}</p>
              </div>
            ))}
          </div>
          <div className="border-t-4 border-gray-400 p-4">
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Type a message"
                className="flex-1 border-2 border-gray-400 px-3 py-2 text-sm font-medium focus:outline-none focus:border-black"
              />
              <button className="bg-black text-white px-4 py-2 text-xs font-bold uppercase tracking-tight border-2 border-black">
                Send
              </button>
            </div>
          </div>
        </div>
      </section>
    </AppShell>
  );
}
