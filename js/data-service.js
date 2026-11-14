import { firebaseConfig, isFirebaseConfigured } from "./firebase-config.js";
import {
  DEFAULT_PROFILE,
  DEFAULT_PROJECTS,
  DEFAULT_GALLERY,
  DEFAULT_ALBUMS,
  DEFAULT_TRACKS
} from "./default-data.js";

let db = null;
let initPromise = null;

async function ensureFirestore() {
  if (!isFirebaseConfigured()) return null;
  if (db) return db;
  if (!initPromise) {
    initPromise = (async () => {
      const { initializeApp, getApps } = await import("https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js");
      const { getFirestore } = await import("https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js");
      const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
      db = getFirestore(app);
      return db;
    })();
  }
  return initPromise;
}

export async function getProfile() {
  const firestore = await ensureFirestore();
  if (!firestore) return DEFAULT_PROFILE;
  try {
    const { doc, getDoc } = await import("https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js");
    const snap = await getDoc(doc(firestore, "settings", "profile"));
    return snap.exists() ? { ...DEFAULT_PROFILE, ...snap.data() } : DEFAULT_PROFILE;
  } catch (err) {
    console.warn("Menggunakan profil default:", err.message);
    return DEFAULT_PROFILE;
  }
}

export async function getCollectionData(collectionName, fallbackData) {
  const firestore = await ensureFirestore();
  if (!firestore) return fallbackData;
  try {
    const { collection, getDocs, query, orderBy } = await import("https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js");
    const q = query(collection(firestore, collectionName), orderBy("order", "asc"));
    const snap = await getDocs(q);
    if (snap.empty) return fallbackData;
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch (err) {
    console.warn(`Menggunakan data default untuk ${collectionName}:`, err.message);
    return fallbackData;
  }
}

export const getProjects = () => getCollectionData("projects", DEFAULT_PROJECTS);
export const getGallery = () => getCollectionData("gallery", DEFAULT_GALLERY);
export const getAlbums = () => getCollectionData("albums", DEFAULT_ALBUMS);
export const getTracks = () => getCollectionData("tracks", DEFAULT_TRACKS);
