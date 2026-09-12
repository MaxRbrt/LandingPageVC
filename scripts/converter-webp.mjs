/**
 * Converte as imagens de /public para WebP e remove os originais.
 * Rode depois de adicionar fotos novas: `npm run img:webp`
 *
 * Largura máxima de 1600px: nenhuma imagem da página é exibida maior que isso,
 * e o excedente só pesaria no download.
 */
import { readdir, stat, unlink } from "node:fs/promises";
import { join, extname } from "node:path";
import sharp from "sharp";

const RAIZ = "public";
const LARGURA_MAX = 1600;
const QUALIDADE = 82;
const CONVERSIVEIS = new Set([".png", ".jpg", ".jpeg"]);

async function listar(dir) {
  const entradas = await readdir(dir, { withFileTypes: true });
  const arquivos = await Promise.all(
    entradas.map((e) => {
      const caminho = join(dir, e.name);
      return e.isDirectory() ? listar(caminho) : caminho;
    })
  );
  return arquivos.flat();
}

const arquivos = (await listar(RAIZ)).filter((f) =>
  CONVERSIVEIS.has(extname(f).toLowerCase())
);

let antes = 0;
let depois = 0;

for (const origem of arquivos) {
  const destino = origem.replace(/\.(png|jpe?g)$/i, ".webp");
  const tamanhoOriginal = (await stat(origem)).size;

  await sharp(origem)
    .resize({ width: LARGURA_MAX, withoutEnlargement: true })
    .webp({ quality: QUALIDADE })
    .toFile(destino);

  const tamanhoNovo = (await stat(destino)).size;
  await unlink(origem);

  antes += tamanhoOriginal;
  depois += tamanhoNovo;
  const corte = ((1 - tamanhoNovo / tamanhoOriginal) * 100).toFixed(0);
  console.log(
    `${origem} → ${(tamanhoOriginal / 1024).toFixed(0)}KB para ${(tamanhoNovo / 1024).toFixed(0)}KB (-${corte}%)`
  );
}

console.log(
  `\n${arquivos.length} imagens: ${(antes / 1024 / 1024).toFixed(1)}MB → ${(depois / 1024 / 1024).toFixed(1)}MB`
);
