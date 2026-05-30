import Navbar from "@/app/nutricionpamcastro/_components/Navbar";
import Footer from "@/app/nutricionpamcastro/_components/Footer";

export default function AvisoPrivacidad() {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-24 px-6 bg-[#FAFAF7] min-h-dvh">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-semibold text-[#1C1C1A] mb-8" style={{ fontFamily: "var(--font-lora)" }}>
            Aviso de privacidad
          </h1>
          <div className="prose prose-sm text-[#6B6B60]" style={{ fontFamily: "var(--font-raleway)" }}>
            <p className="mb-4">© 2024 Nutrición Pam Castro. Todos los derechos reservados.</p>
            <p className="mb-4">
              La información personal que compartes en el proceso de consulta (nombre, datos de salud, estudios de laboratorio)
              se usa exclusivamente para el diseño de tu plan de nutrición personalizado.
            </p>
            <p className="mb-4">
              No compartimos tu información con terceros. Toda la comunicación es confidencial.
            </p>
            <p>
              Para dudas sobre el manejo de tu información, escríbenos a través de WhatsApp.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
