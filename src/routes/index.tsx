import { createFileRoute } from "@tanstack/react-router";
import { Store } from "@/components/store/Store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Angela Oliver — Beleza, Acessórios e Capas de Celular" },
      { name: "description", content: "Sua beleza, seu estilo, em um só lugar! Maquiagem, acessórios e capas de celular." },
      { property: "og:title", content: "Angela Oliver" },
      { property: "og:description", content: "Maquiagem, acessórios e capas de celular com entrega para todo o Brasil." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Store,
});
