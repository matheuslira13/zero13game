export const siteName = "Zero13GameClub";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "http://localhost:3000";

export const siteDescription =
  "Portal gamer da Zero13GameClub com noticias, campeonatos, rankings e eventos de jogos de luta para a comunidade da Baixada Santista.";

export const siteKeywords = [
  "Zero13GameClub",
  "Zero13 Game Club",
  "portal gamer",
  "noticias gamer",
  "campeonatos gamer",
  "campeonatos de jogos",
  "jogos de luta",
  "fight games",
  "e-sports",
  "torneios gamer",
  "comunidade gamer",
  "Baixada Santista",
  "Santos",
  "Street Fighter",
  "Mortal Kombat",
  "Pokemon",
];

export function absoluteUrl(path = "/") {
  return new URL(path, siteUrl).toString();
}

export function truncateDescription(value: string, maxLength = 155) {
  const normalized = value.replace(/\s+/g, " ").trim();

  if (normalized.length <= maxLength) {
    return normalized;
  }

  return `${normalized.slice(0, maxLength - 3).trim()}...`;
}
