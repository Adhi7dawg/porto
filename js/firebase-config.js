// ============================================================================
// KONFIGURASI FIREBASE (PLACEHOLDER)
// Ganti seluruh nilai PLACEHOLDER_* di bawah ini dengan konfigurasi asli dari
// Firebase Console -> Project Settings -> General -> Your apps (Web App).
// ============================================================================

export const firebaseConfig = {
  apiKey: "AIzaSyC-WxM7vAo37vMs46oP8nve1vEQG6K8kDQ",
  authDomain: "port-df9ed.firebaseapp.com",
  projectId: "port-df9ed",
  storageBucket: "port-df9ed.firebasestorage.app",
  messagingSenderId: "866554091450",
  appId: "1:866554091450:web:bbf622c2eb613264fa2f83"
};

// Ganti dengan UID akun Admin Anda dari Firebase Console -> Authentication -> Users
export const ADMIN_UID = "4opYWhvr9RX7BtK3mAgyDg06N893";

export function isFirebaseConfigured() {
  return (
    firebaseConfig.apiKey &&
    !firebaseConfig.apiKey.startsWith("PLACEHOLDER_") &&
    firebaseConfig.projectId &&
    !firebaseConfig.projectId.startsWith("PLACEHOLDER_")
  );
}
