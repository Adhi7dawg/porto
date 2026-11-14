// ============================================================================
// MUSICBRAINZ & COVER ART ARCHIVE SERVICE
// Mengikuti pedoman resmi MusicBrainz API:
// - User-Agent identik & deskriptif
// - Rate limit: maksimal 1 request per detik (queue/throttle otomatis)
// - Pencarian Release Group & Release Editions via MusicBrainz Release ID
// ============================================================================

const MB_BASE_URL = "https://musicbrainz.org/ws/2";
const CAA_BASE_URL = "https://coverartarchive.org";
const USER_AGENT = "AdhiPortfolioRecordCollector/1.0.0 (https://github.com/Adhi7dawg)";

let lastRequestTime = 0;
let requestQueue = Promise.resolve();

function scheduleMbRequest(fn) {
  requestQueue = requestQueue.then(async () => {
    const now = Date.now();
    const elapsed = now - lastRequestTime;
    const minInterval = 1100;
    if (elapsed < minInterval) {
      await new Promise((resolve) => setTimeout(resolve, minInterval - elapsed));
    }
    lastRequestTime = Date.now();
    return fn();
  });
  return requestQueue;
}

async function fetchMbJson(url) {
  return scheduleMbRequest(async () => {
    const res = await fetch(url, {
      headers: {
        "Accept": "application/json",
        "User-Agent": USER_AGENT
      }
    });
    if (res.status === 503 || res.status === 429) {
      throw new Error("MusicBrainz API sedang sibuk (rate limit). Silakan coba sesaat lagi.");
    }
    if (!res.ok) {
      throw new Error(`Gagal mengakses MusicBrainz API (HTTP ${res.status})`);
    }
    return res.json();
  });
}

const searchCache = new Map();
const editionsCache = new Map();
const releaseDetailCache = new Map();
const coverCache = new Map();

export function formatMsDuration(ms) {
  if (!ms || isNaN(ms) || ms <= 0) return "";
  const totalSeconds = Math.round(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

export function formatArtistCredit(artistCredit) {
  if (!Array.isArray(artistCredit) || artistCredit.length === 0) return "Unknown Artist";
  return artistCredit
    .map((ac) => (ac.name || ac.artist?.name || "") + (ac.joinphrase || ""))
    .join("")
    .trim();
}

export async function getCoverArtUrl(releaseId, size = "500") {
  if (!releaseId) return null;
  const key = `${releaseId}:${size}`;
  if (coverCache.has(key)) return coverCache.get(key);

  try {
    const res = await fetch(`${CAA_BASE_URL}/release/${encodeURIComponent(releaseId)}`, {
      headers: { "Accept": "application/json" }
    });
    if (!res.ok) {
      coverCache.set(key, null);
      return null;
    }
    const data = await res.json();
    const images = Array.isArray(data.images) ? data.images : [];
    const front = images.find((img) => img.front) || images[0];
    if (!front) {
      coverCache.set(key, null);
      return null;
    }
    const thumbKey = size === "250" ? "250" : "500";
    const chosenUrl =
      front.thumbnails?.[thumbKey] ||
      front.thumbnails?.small ||
      front.thumbnails?.large ||
      front.image ||
      null;

    const safeUrl = chosenUrl ? chosenUrl.replace(/^http:\/\//i, "https://") : null;
    coverCache.set(key, safeUrl);
    return safeUrl;
  } catch (_) {
    coverCache.set(key, null);
    return null;
  }
}

export async function searchAlbumsMB(queryText) {
  const clean = (queryText || "").trim();
  if (!clean) return [];
  const cacheKey = clean.toLowerCase();
  if (searchCache.has(cacheKey)) return searchCache.get(cacheKey);

  const url = `${MB_BASE_URL}/release-group/?query=${encodeURIComponent(clean)}&limit=15&fmt=json`;
  const data = await fetchMbJson(url);
  const groups = Array.isArray(data["release-groups"]) ? data["release-groups"] : [];

  const results = groups.map((rg) => {
    const releases = Array.isArray(rg.releases) ? rg.releases : [];
    const firstReleaseId = releases[0]?.id || null;
    const secondaryTypes = Array.isArray(rg["secondary-types"]) ? rg["secondary-types"] : [];
    const releaseType = [rg["primary-type"], ...secondaryTypes].filter(Boolean).join(" · ") || "Album";

    return {
      releaseGroupId: rg.id,
      title: rg.title || "Untitled",
      artist: formatArtistCredit(rg["artist-credit"]),
      firstReleaseDate: rg["first-release-date"] || "",
      releaseType,
      releaseCount: rg.count || releases.length || 1,
      previewReleaseId: firstReleaseId,
      disambiguation: rg.disambiguation || ""
    };
  });

  searchCache.set(cacheKey, results);
  return results;
}

export function detectEditionBadge(release, earliestDate) {
  const badges = [];
  const titleLower = (release.title || "").toLowerCase();
  const disambLower = (release.disambiguation || "").toLowerCase();
  const combined = `${titleLower} ${disambLower}`;

  if (combined.includes("deluxe")) badges.push("Deluxe Edition");
  if (combined.includes("remaster")) badges.push("Remastered");
  if (combined.includes("anniversary")) badges.push("Anniversary Edition");
  if (combined.includes("expanded")) badges.push("Expanded Edition");
  if (combined.includes("bonus")) badges.push("Bonus Tracks");
  if (combined.includes("special edition")) badges.push("Special Edition");
  if (combined.includes("reissue") || combined.includes("re-release")) badges.push("Reissue");
  if (combined.includes("explicit")) badges.push("Explicit");
  if (combined.includes("clean")) badges.push("Clean");

  if (earliestDate && release.date && release.date === earliestDate && badges.length === 0) {
    badges.push("Original Release");
  } else if (
    earliestDate &&
    release.date &&
    release.date > earliestDate &&
    !badges.includes("Reissue") &&
    !badges.includes("Remastered") &&
    !badges.includes("Deluxe Edition") &&
    !badges.includes("Anniversary Edition")
  ) {
    badges.push("Reissue / Later Pressing");
  }

  if (badges.length === 0) {
    badges.push(release.disambiguation ? release.disambiguation : "Standard Edition");
  }

  return badges;
}

export async function getAlbumEditionsMB(releaseGroupId) {
  if (!releaseGroupId) return [];
  if (editionsCache.has(releaseGroupId)) return editionsCache.get(releaseGroupId);

  const url = `${MB_BASE_URL}/release?release-group=${encodeURIComponent(releaseGroupId)}&inc=media+artist-credits+labels&limit=50&fmt=json`;
  const data = await fetchMbJson(url);
  const releases = Array.isArray(data.releases) ? data.releases : [];

  const validDates = releases.map((r) => r.date).filter(Boolean).sort();
  const earliestDate = validDates[0] || "";

  const editions = releases.map((rel) => {
    const mediaList = Array.isArray(rel.media) ? rel.media : [];
    const totalTracks = mediaList.reduce((sum, m) => sum + (m["track-count"] || 0), 0);
    const formats = [...new Set(mediaList.map((m) => m.format).filter(Boolean))].join(" + ") || "Digital / Unknown";
    const labels = Array.isArray(rel["label-info"])
      ? rel["label-info"].map((li) => li.label?.name).filter(Boolean).join(", ")
      : "";

    const editionObj = {
      releaseId: rel.id,
      title: rel.title || "Untitled",
      artist: formatArtistCredit(rel["artist-credit"]),
      date: rel.date || "Tanggal tidak diketahui",
      country: rel.country || "Global / N/A",
      format: formats,
      trackCount: totalTracks,
      disambiguation: rel.disambiguation || "",
      status: rel.status || "Official",
      barcode: rel.barcode || "",
      label: labels,
      hasCoverInArchive: Boolean(rel["cover-art-archive"]?.front)
    };

    editionObj.editionBadges = detectEditionBadge(editionObj, earliestDate);
    editionObj.editionSummary = [
      editionObj.editionBadges.join(", "),
      editionObj.disambiguation ? `(${editionObj.disambiguation})` : "",
      editionObj.country !== "Global / N/A" ? `[${editionObj.country}]` : "",
      editionObj.format
    ].filter(Boolean).join(" · ");

    return editionObj;
  });

  editions.sort((a, b) => {
    if (a.date === b.date) return 0;
    if (a.date === "Tanggal tidak diketahui") return 1;
    if (b.date === "Tanggal tidak diketahui") return -1;
    return a.date.localeCompare(b.date);
  });

  editionsCache.set(releaseGroupId, editions);
  return editions;
}

export async function getReleaseDetailsMB(releaseId) {
  if (!releaseId) throw new Error("MusicBrainz Release ID tidak valid.");
  if (releaseDetailCache.has(releaseId)) return releaseDetailCache.get(releaseId);

  const url = `${MB_BASE_URL}/release/${encodeURIComponent(releaseId)}?inc=recordings+artist-credits+release-groups+labels&fmt=json`;
  const rel = await fetchMbJson(url);

  const mediaList = Array.isArray(rel.media) ? rel.media : [];
  const tracks = [];
  let trackNumberCounter = 1;

  mediaList.forEach((medium, mIdx) => {
    const mediumTracks = Array.isArray(medium.tracks) ? medium.tracks : [];
    mediumTracks.forEach((t) => {
      const durationMs = t.length || t.recording?.length || null;
      const trackArtist = formatArtistCredit(t["artist-credit"] || t.recording?.["artist-credit"]);
      tracks.push({
        number: trackNumberCounter++,
        disc: medium.position || mIdx + 1,
        title: t.title || t.recording?.title || "Untitled Track",
        artist: trackArtist,
        durationMs,
        duration: formatMsDuration(durationMs),
        recordingId: t.recording?.id || "",
        rating: 0
      });
    });
  });

  const formats = [...new Set(mediaList.map((m) => m.format).filter(Boolean))].join(" + ") || "Digital / Unknown";
  const rg = rel["release-group"] || {};
  const secondaryTypes = Array.isArray(rg["secondary-types"]) ? rg["secondary-types"] : [];
  const releaseType = [rg["primary-type"], ...secondaryTypes].filter(Boolean).join(" · ") || "Album";

  const coverUrl = await getCoverArtUrl(releaseId, "500");

  const detail = {
    releaseId: rel.id,
    releaseGroupId: rg.id || "",
    title: rel.title || "Untitled",
    artist: formatArtistCredit(rel["artist-credit"]),
    releaseDate: rel.date || "",
    releaseType,
    country: rel.country || "",
    format: formats,
    disambiguation: rel.disambiguation || "",
    trackCount: tracks.length,
    tracks,
    coverUrl
  };

  releaseDetailCache.set(releaseId, detail);
  return detail;
}
