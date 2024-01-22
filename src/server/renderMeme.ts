import type memeType from "./tyoes/memeType";

export default async function renderMeme() {
  const meme = await fetch("https://meme-api.com/gimme")

  const respnsoe = await meme.json() as memeType;

  return respnsoe;
}
