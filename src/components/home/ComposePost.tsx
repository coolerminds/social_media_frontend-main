import ComposePanel from './ComposePanel';

export function ComposePost() {
  return (
    <section className="border-4 border-red-600 bg-white mb-6 mx-6 mt-6" data-reveal>
      <div className="bg-red-600 px-6 py-3">
        <h3 className="font-bold uppercase text-white tracking-tight">COMPOSE</h3>
      </div>
      <div className="p-6">
        <ComposePanel minHeight={120} uppercase />
      </div>
    </section>
  );
}
