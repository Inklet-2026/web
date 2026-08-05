
const VIDEO_ID = "QDXv_1ijR8Y";
const VIDEO_TITLE = "This E-Ink Display Will Change How You Read — Meet inklet";

export default function DisplayVideo() {
  return (
    <section id="watch" className="py-32">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="font-[family-name:var(--font-newsreader)] text-4xl md:text-5xl font-light text-center mb-14">
          See inklet in action.
        </h2>

        <div className="relative aspect-video overflow-hidden rounded-[20px] bg-[#e8e5db]">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?rel=0`}
            title={VIDEO_TITLE}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
            className="absolute inset-0 w-full h-full"
          />
        </div>
      </div>
    </section>
  );
}
