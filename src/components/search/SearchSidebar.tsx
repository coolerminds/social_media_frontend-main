const filters = [
  { label: 'Latest', count: '324' },
  { label: 'People', count: '58' },
  { label: 'Photos', count: '96' },
  { label: 'Videos', count: '12' },
];

const recent = ['Design systems', 'AI development', 'Championship finals'];

export default function SearchSidebar() {
  return (
    <aside className="hidden xl:block xl:w-96 h-screen sticky top-0 p-6 bg-white">
      <div className="border-4 border-black mb-6 bg-white">
        <div className="bg-black px-6 py-4">
          <h2 className="text-lg font-bold uppercase tracking-tight text-white">Filters</h2>
        </div>
        <div className="p-6 space-y-4">
          {filters.map((filter) => (
            <div key={filter.label} className="flex items-center justify-between border-2 border-gray-300 px-4 py-3">
              <span className="text-sm font-bold uppercase text-black">{filter.label}</span>
              <span className="text-xs font-bold uppercase text-gray-600">{filter.count}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="border-4 border-gray-400 bg-gray-100">
        <div className="bg-gray-400 px-6 py-4">
          <h2 className="text-lg font-bold uppercase tracking-tight text-black">Recent</h2>
        </div>
        <div className="p-6 space-y-3">
          {recent.map((item) => (
            <div key={item} className="border-2 border-gray-300 bg-white px-4 py-3 text-xs font-bold uppercase text-gray-700">
              {item}
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
