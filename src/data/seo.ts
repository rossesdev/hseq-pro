import type { WithContext, ProfessionalService } from "schema-dts";

export const structuredData: WithContext<ProfessionalService> = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "HSEQ PRO",
  description:
    "Soluciones profesionales en seguridad, salud ocupacional, medio ambiente y calidad para establecimientos comerciales en Colombia.",
  url: "https://www.hseqpro.com",
  telephone: "+573145966689",
  email: "edwardarnulfo@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressCountry: "CO",
  },
  areaServed: {
    "@type": "Country",
    name: "Colombia",
  },
  knowsAbout: [
    "Saneamiento",
    "Gestión de Residuos",
    "Auditorías HSEQ",
    "Capacitación en Seguridad y Salud en el Trabajo",
  ],
};
