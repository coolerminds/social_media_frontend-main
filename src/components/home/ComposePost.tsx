import { Image, Smile, Calendar, MapPin } from 'lucide-react';

export function ComposePost() {
  return (
    <section className="border-4 border-red-600 bg-white mb-6 mx-6 mt-6" data-reveal>
      <div className="bg-red-600 px-6 py-3">
        <h3 className="font-bold uppercase text-white tracking-tight">COMPOSE</h3>
      </div>
      <div className="p-6">
        <div className="flex gap-4">
          <div className="w-14 h-14 bg-gray-300 border-2 border-black flex-shrink-0" />
          <div className="flex-1">
            <textarea
              placeholder="WHAT'S HAPPENING?"
              className="w-full text-base resize-none border-2 border-gray-400 outline-none placeholder-gray-500 min-h-[120px] p-4 font-medium uppercase"
            />

            <div className="flex items-center justify-between pt-4 mt-4 border-t-2 border-gray-300">
              <div className="flex gap-2">
                <button className="p-2 border-2 border-black bg-white text-black btn-dynamic" aria-label="Add image">
                  <Image className="w-5 h-5" />
                </button>
                <button className="p-2 border-2 border-black bg-white text-black btn-dynamic" aria-label="Add emoji">
                  <Smile className="w-5 h-5" />
                </button>
                <button className="p-2 border-2 border-black bg-white text-black btn-dynamic" aria-label="Schedule">
                  <Calendar className="w-5 h-5" />
                </button>
                <button className="p-2 border-2 border-black bg-white text-black btn-dynamic" aria-label="Add location">
                  <MapPin className="w-5 h-5" />
                </button>
              </div>

              <button className="bg-red-600 text-white px-8 py-3 border-4 border-red-600 disabled:opacity-50 disabled:cursor-not-allowed font-bold uppercase text-sm tracking-tight btn-dynamic">
                POST
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
