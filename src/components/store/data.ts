import palette from "@/assets/p-palette.jpg.asset.json";
import gloss from "@/assets/p-gloss.jpg.asset.json";
import earrings from "@/assets/p-earrings.jpg.asset.json";
import watch from "@/assets/p-watch.jpg.asset.json";
import phoneCase from "@/assets/p-case.jpg.asset.json";
import catMakeup from "@/assets/cat-makeup.jpg.asset.json";
import catAcc from "@/assets/cat-accessories.jpg.asset.json";
import catCases from "@/assets/cat-cases.jpg.asset.json";

export type Category = "MAQUIAGEM" | "ACESSÓRIOS" | "CAPAS DE CELULAR";

export interface Product {
  id: string;
  category: Category;
  name: string;
  price: number;
  image: string;
  description: string;
}

export const products: Product[] = [
  { id: "paleta-12", category: "MAQUIAGEM", name: "Paleta de Sombras 12 Cores", price: 59.9, image: palette.url, description: "Paleta com 12 tons nude, marrom e rosé, de acabamento matte e cintilante, alta pigmentação e longa duração." },
  { id: "gloss", category: "MAQUIAGEM", name: "Gloss Labial Hidratante", price: 34.9, image: gloss.url, description: "Gloss com efeito volumoso, brilho intenso e fórmula hidratante que não deixa os lábios pegajosos." },
  { id: "brinco-argola", category: "ACESSÓRIOS", name: "Brinco Argola Dourada", price: 29.9, image: earrings.url, description: "Argolas douradas encorpadas, leves e confortáveis, perfeitas para o dia a dia ou ocasiões especiais." },
  { id: "smartwatch", category: "ACESSÓRIOS", name: "Relógio Smartwatch", price: 199.9, image: watch.url, description: "Smartwatch com pulseira de silicone preta, monitor de atividades, notificações e bateria de longa duração." },
  { id: "capa-silicone", category: "CAPAS DE CELULAR", name: "Capa de Celular Silicone", price: 24.9, image: phoneCase.url, description: "Capa de silicone macio com toque aveludado e detalhe de coração dourado. Proteção e estilo." },
];

export const categories: { name: Category; image: string }[] = [
  { name: "MAQUIAGEM", image: catMakeup.url },
  { name: "ACESSÓRIOS", image: catAcc.url },
  { name: "CAPAS DE CELULAR", image: catCases.url },
];

export const formatBRL = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
