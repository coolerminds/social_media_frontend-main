interface TrendingTopic {
  category: string;
  title: string;
  posts: string;
}

export function TrendingSidebar() {
  const trendingTopics: TrendingTopic[] = [
    { category: 'TECHNOLOGY', title: 'AI DEVELOPMENT', posts: '125K' },
    { category: 'SPORTS', title: 'CHAMPIONSHIP FINALS', posts: '89K' },
    { category: 'ENTERTAINMENT', title: 'NEW MOVIE RELEASE', posts: '67K' },
    { category: 'POLITICS', title: 'POLICY UPDATE', posts: '45K' },
  ];

  const whoToFollow = [
    { name: 'TECH INSIDER', username: 'TECHINSIDER' },
    { name: 'NEWS DAILY', username: 'NEWSDAILY' },
  ];

  return (
    <aside className="hidden xl:block xl:w-96 h-screen sticky top-0 p-6 bg-white">
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="SEARCH"
          className="w-full bg-white border-4 border-black px-4 py-4 focus:outline-none focus:border-blue-600 text-sm font-bold uppercase tracking-tight placeholder-gray-500"
        />
      </div>

      <div className="bg-gray-200 border-4 border-gray-400 mb-6">
        <h2 className="text-xl px-6 py-4 bg-gray-400 text-black font-bold uppercase tracking-tight">TRENDING</h2>
        <div className="p-6 space-y-6">
          {trendingTopics.map((topic, index) => (
            <div key={index} className="pb-6 border-b-2 border-gray-400 last:border-b-0 last:pb-0">
              <div className="text-xs text-gray-600 mb-2 uppercase font-bold">{topic.category}</div>
              <div className="font-bold text-black text-lg uppercase tracking-tight mb-1">{topic.title}</div>
              <div className="text-xs text-gray-600 uppercase font-bold">{topic.posts} POSTS</div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border-4 border-blue-600">
        <h2 className="text-xl px-6 py-4 bg-blue-600 text-white font-bold uppercase tracking-tight">WHO TO FOLLOW</h2>
        <div className="p-6 space-y-4">
          {whoToFollow.map((user, index) => (
            <div key={index} className="flex items-center gap-4 pb-4 border-b-2 border-gray-300 last:border-b-0 last:pb-0">
              <div className="w-14 h-14 bg-gray-300 border-2 border-black flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="font-bold text-black truncate uppercase text-sm">{user.name}</div>
                <div className="text-gray-600 text-xs truncate uppercase">@{user.username}</div>
              </div>
              <button className="bg-black text-white px-4 py-2 text-xs font-bold uppercase tracking-tight border-2 border-black">
                FOLLOW
              </button>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
