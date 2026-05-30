import Navbar from "@/app/nutricionpamcastro/_components/Navbar";
import Footer from "@/app/nutricionpamcastro/_components/Footer";

const CHANNEL_ID = "UCe1X1S9P2TaJja4Ucch0C9g";
const CHANNEL_URL = "https://www.youtube.com/@nutriologapamcastro";

interface Video {
  title: string;
  videoId: string;
  published: string;
  thumb: string;
}

async function getVideos(): Promise<Video[]> {
  try {
    const res = await fetch(
      `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`,
      { next: { revalidate: 3600 } } // refresca cada hora
    );
    const xml = await res.text();
    return [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)]
      .slice(0, 6)
      .map((m) => {
        const e = m[1];
        return {
          title: e.match(/<title>(.*?)<\/title>/)?.[1]?.replace(/&amp;/g, "&") ?? "",
          videoId: e.match(/<yt:videoId>(.*?)<\/yt:videoId>/)?.[1] ?? "",
          published: e.match(/<published>(.*?)<\/published>/)?.[1]?.slice(0, 10) ?? "",
          thumb: e.match(/<media:thumbnail url="([^"]+)"/)?.[1] ?? "",
        };
      })
      .filter((v) => v.videoId);
  } catch {
    return [];
  }
}

function formatDate(iso: string) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  const months = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
  return `${parseInt(d)} ${months[parseInt(m) - 1]} ${y}`;
}

export default async function MiCanal() {
  const videos = await getVideos();

  return (
    <>
      <Navbar />

      {/* HERO */}
      <section className="pt-32 pb-20 px-6 bg-[#FAFAF7]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <p
              className="text-[#C4856A] text-xs uppercase tracking-[0.2em] font-semibold mb-4"
              style={{ fontFamily: "var(--font-raleway)" }}
            >
              YouTube
            </p>
            <h1
              className="text-4xl md:text-5xl font-semibold leading-[1.1] text-[#1C1C1A] mb-6"
              style={{ fontFamily: "var(--font-lora)" }}
            >
              Contenido gratuito sobre nutrición autoinmune
            </h1>
            <p
              className="text-[#6B6B60] text-base leading-relaxed mb-8"
              style={{ fontFamily: "var(--font-raleway)" }}
            >
              En mi canal encontrarás información valiosa sobre condiciones autoinmunes,
              respuestas a las preguntas más frecuentes de mis pacientes y todo el contenido
              de mis miércoles de preguntas de Instagram — disponible cuando tú quieras.
            </p>
            <a
              href={CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#FF0000] text-white font-semibold px-7 py-3.5 rounded-full hover:bg-[#CC0000] transition-colors duration-200 text-sm cursor-pointer"
              style={{ fontFamily: "var(--font-raleway)" }}
            >
              <svg width="18" height="14" viewBox="0 0 18 14" fill="currentColor" aria-hidden="true">
                <path d="M17.64 2.18A2.26 2.26 0 0 0 16.06.58C14.65.2 9 .2 9 .2s-5.65 0-7.06.38A2.26 2.26 0 0 0 .36 2.18 23.7 23.7 0 0 0 0 6.8a23.7 23.7 0 0 0 .36 4.62 2.26 2.26 0 0 0 1.58 1.6C3.35 13.4 9 13.4 9 13.4s5.65 0 7.06-.38a2.26 2.26 0 0 0 1.58-1.6A23.7 23.7 0 0 0 18 6.8a23.7 23.7 0 0 0-.36-4.62zM7.2 9.6V4l4.73 2.8L7.2 9.6z" />
              </svg>
              Suscribirte al canal
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { stat: "15+", label: "Videos publicados" },
              { stat: "Gratis", label: "Acceso a todo el contenido" },
              { stat: "Miércoles", label: "Sesiones de preguntas y respuestas" },
              { stat: "Tiroides", label: "Hashimoto · Autoinmunes · y más" },
            ].map((item) => (
              <div key={item.stat} className="bg-[#F4F1EA] border border-[#E4DED4] rounded-2xl p-6">
                <p
                  className="text-2xl font-semibold text-[#1C1C1A] mb-1"
                  style={{ fontFamily: "var(--font-lora)" }}
                >
                  {item.stat}
                </p>
                <p
                  className="text-[#6B6B60] text-xs leading-tight"
                  style={{ fontFamily: "var(--font-raleway)" }}
                >
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VIDEO GRID */}
      <section className="py-24 px-6 bg-[#F4F1EA]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <div>
              <p
                className="text-[#C4856A] text-xs uppercase tracking-[0.2em] font-semibold mb-3"
                style={{ fontFamily: "var(--font-raleway)" }}
              >
                Últimos videos
              </p>
              <h2
                className="text-3xl md:text-4xl font-semibold text-[#1C1C1A]"
                style={{ fontFamily: "var(--font-lora)" }}
              >
                Videos recientes
              </h2>
            </div>
            <a
              href={CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[#3D6B4F] font-semibold hover:underline underline-offset-4 shrink-0"
              style={{ fontFamily: "var(--font-raleway)" }}
            >
              Ver todos en YouTube →
            </a>
          </div>

          {videos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((v) => (
                <a
                  key={v.videoId}
                  href={`https://www.youtube.com/watch?v=${v.videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white border border-[#E4DED4] rounded-2xl overflow-hidden hover:shadow-md transition-shadow duration-200 cursor-pointer"
                >
                  <div className="relative aspect-video overflow-hidden bg-[#EBF2ED]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={v.thumb || `https://i.ytimg.com/vi/${v.videoId}/hqdefault.jpg`}
                      alt={v.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* Play overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="#1C1C1A" aria-hidden="true">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <p
                      className="text-[#1C1C1A] text-sm font-semibold leading-snug mb-2 line-clamp-2 group-hover:text-[#3D6B4F] transition-colors duration-200"
                      style={{ fontFamily: "var(--font-lora)" }}
                    >
                      {v.title}
                    </p>
                    <p
                      className="text-[#6B6B60] text-xs"
                      style={{ fontFamily: "var(--font-raleway)" }}
                    >
                      {formatDate(v.published)}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-[#6B6B60] text-sm" style={{ fontFamily: "var(--font-raleway)" }}>
                No se pudieron cargar los videos. Visita el canal directamente.
              </p>
              <a
                href={CHANNEL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 text-sm text-[#3D6B4F] font-semibold hover:underline underline-offset-4"
                style={{ fontFamily: "var(--font-raleway)" }}
              >
                Ver canal en YouTube →
              </a>
            </div>
          )}
        </div>
      </section>

      {/* CTA subscribe */}
      <section className="py-20 px-6 bg-[#1C1C1A] text-white">
        <div className="max-w-xl mx-auto text-center">
          <h2
            className="text-2xl md:text-3xl font-semibold mb-4"
            style={{ fontFamily: "var(--font-lora)" }}
          >
            Dale a la campanita para no perderte nada.
          </h2>
          <p
            className="text-[#9C9C8E] text-sm mb-8 leading-relaxed"
            style={{ fontFamily: "var(--font-raleway)" }}
          >
            Activa las notificaciones y recibe un aviso cada vez que suba contenido nuevo.
          </p>
          <a
            href={CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#FF0000] text-white font-semibold px-8 py-4 rounded-full hover:bg-[#CC0000] transition-colors duration-200 text-sm cursor-pointer"
            style={{ fontFamily: "var(--font-raleway)" }}
          >
            <svg width="18" height="14" viewBox="0 0 18 14" fill="currentColor" aria-hidden="true">
              <path d="M17.64 2.18A2.26 2.26 0 0 0 16.06.58C14.65.2 9 .2 9 .2s-5.65 0-7.06.38A2.26 2.26 0 0 0 .36 2.18 23.7 23.7 0 0 0 0 6.8a23.7 23.7 0 0 0 .36 4.62 2.26 2.26 0 0 0 1.58 1.6C3.35 13.4 9 13.4 9 13.4s5.65 0 7.06-.38a2.26 2.26 0 0 0 1.58-1.6A23.7 23.7 0 0 0 18 6.8a23.7 23.7 0 0 0-.36-4.62zM7.2 9.6V4l4.73 2.8L7.2 9.6z" />
            </svg>
            Suscribirme en YouTube
          </a>
        </div>
      </section>

      <Footer />
    </>
  );
}
