// Data bawaan hasil migrasi dari proyek lama + placeholder siap pakai.
// Saat Firebase sudah dikonfigurasi, data akan otomatis diambil dari Firestore.

export const DEFAULT_PROFILE = {
  nama: "Adhi Sasongko",
  username: "Adhi7dawg",
  tagline: "Pelajar · Dewan Ambalan · Web Enthusiast",
  heroIntro: "Membangun disiplin lewat organisasi kepramukaan dan mengeksplorasi pengembangan web modern.",
  profilIntro: "Catatan singkat mengenai latar belakang pendidikan, aktivitas organisasi, serta minat di dunia teknologi dan gim.",
  statusBadge: "Terus Belajar",
  sekolah: "SMK Tamtama 1 Sidareja",
  organisasi: "Dewan Ambalan",
  domisili: "Cilacap, Jawa Tengah",
  highestRank: "Mythical Immortal 111",
  townHall: "15",
  fotoUrl: "foto.jpg",
  githubUrl: "https://github.com/PLACEHOLDER_USERNAME",
  instagramUrl: "https://instagram.com/PLACEHOLDER_USERNAME",
  email: "placeholder@email.com"
};

export const DEFAULT_PROJECTS = [
  {
    id: "proj-1",
    judul: "Personal Portfolio & CMS",
    deskripsi: "Website portofolio pribadi dengan desain editorial responsif serta dashboard admin untuk mengelola konten profil, proyek, galeri, dan musik favorit.",
    techStack: ["HTML5", "CSS3", "JavaScript", "Firebase"],
    liveUrl: "index.html",
    repoUrl: "https://github.com/PLACEHOLDER_USERNAME/portfolio"
  },
  {
    id: "proj-2",
    judul: "Placeholder Proyek Web #2",
    deskripsi: "Deskripsi singkat proyek aplikasi web Anda. Silakan ganti judul, teknologi, dan tautan ini melalui Admin Dashboard atau langsung di file data.",
    techStack: ["JavaScript", "Responsive UI"],
    liveUrl: "#",
    repoUrl: "#"
  }
];

export const DEFAULT_GALLERY = [
  {
    id: "gal-1",
    imageUrl: "images/Untitled35_20261018152347.png",
    caption: "Pertama Kali Immo",
    date: "Feb 28, 2026"
  },
  {
    id: "gal-2",
    imageUrl: "images/Untitled35_20261018152257.png",
    caption: "Pangandaran With Andoko dkk",
    date: "Sep 21, 2025"
  },
  {
    id: "gal-3",
    imageUrl: "images/Untitled35_20261018152415.png",
    caption: "Pangandaran With Asep dkk",
    date: "Oct 03, 2026"
  },
  {
    id: "gal-4",
    imageUrl: "images/Untitled35_20261018152458.png",
    caption: "Pramuka Rutin",
    date: "Oct 09, 2026"
  },
  {
    id: "gal-5",
    imageUrl: "images/Untitled35_20261018152542.png",
    caption: "Skin Mai Shiranui",
    date: "Feb 12, 2026"
  },
  {
    id: "gal-6",
    imageUrl: "images/Untitled35_20261018184522.png",
    caption: "Mobile Legends at Tony's",
    date: "Sep 30, 2026"
  },
  {
    id: "gal-7",
    imageUrl: "images/Untitled35_20261018182934.png",
    caption: "Batik Days",
    date: "Oct 02, 2026"
  },
  {
    id: "gal-8",
    imageUrl: "images/Untitled35_20261031162839.png",
    caption: "Clash of Clans",
    date: "Oct 31, 2026"
  },
  {
    id: "gal-9",
    imageUrl: "images/Untitled35_20261018182908.png",
    caption: "Laksana",
    date: "May 17, 2026"
  }
];

export const DEFAULT_ALBUMS = [
  {
    id: "alb-1",
    judul: "Alfredo 2",
    artist: "Freddie Gibbs & The Alchemist",
    cover: "imgalbm/97a5aa24de7948fc9135016f9980cfed.jpg",
    deskripsi: "Album kolaborasi Freddie Gibbs dan produser The Alchemist yang dirilis pada 2025. Sebagai kelanjutan dari Alfredo (2020), proyek ini memadukan rap Freddie yang tajam dengan produksi The Alchemist yang atmosferik, penuh tekstur soul, dan terasa sinematik.",
    tracks: [
      "1995", "Mar-a-Lago", "Lemon Pepper Steppers", "Ensalada (feat. Anderson .Paak)",
      "Empanadas", "Skinny Suge II", "Feeling (feat. Larry June)", "I Still Love H.E.R.",
      "Shangri La", "Gas Station Sushi", "Lavish Habits", "Gold Feet (feat. JID)",
      "Jean Claude", "A Thousand Mountains"
    ],
    spotify: "https://open.spotify.com/album/5WrpCQmbTUZuzNxGCPUFSV?si=9CKhfuqqRUuL12SUk9jcig&utm_source=copy-link"
  },
  {
    id: "alb-2",
    judul: "The Stranger",
    artist: "Billy Joel",
    cover: "imgalbm/d2d13b9964b51af00e6596221c99ca10.jpg",
    deskripsi: "Album studio kelima Billy Joel, dirilis pada 29 September 1977 dan diproduseri Phil Ramone. Menggabungkan pop rock dan soft rock dengan penulisan lagu yang kuat, album ini menjadi titik balik besar dalam karier Joel.",
    tracks: [
      "Movin' Out (Anthony's Song)", "The Stranger", "Just the Way You Are",
      "Scenes from an Italian Restaurant", "Vienna", "Only the Good Die Young",
      "She's Always a Woman", "Get It Right the First Time", "Everybody Has a Dream"
    ],
    spotify: "https://open.spotify.com/album/1Mhn9VosyjtWn4dMPFlna6?si=GeFcjq-RTR2JP8uPhHevYQ&utm_source=copy-link"
  },
  {
    id: "alb-3",
    judul: "Pray for Paris",
    artist: "Westside Gunn",
    cover: "imgalbm/2a573a11a282b2e13a41dbbe8d994ad3.jpg",
    deskripsi: "Album studio Westside Gunn yang dirilis pada 17 April 2020 melalui Griselda Records. Proyek hip-hop ini membawa ciri khas Griselda: rap penuh detail, ad-lib yang ikonik, dan produksi bernuansa gelap sekaligus mewah.",
    tracks: [
      "400 Million Plus Tax", "No Vacancy", "George Bondo", "327", "French Toast",
      "Euro Step", "Allah Sent Me", "$500 Ounces", "Versace", "Claiborne Kick",
      "Shawn vs. Flair", "Party wit Pop Smoke", "LE Djoliba"
    ],
    spotify: "https://open.spotify.com/album/6nfJMRoIjyRwk3ZTHNm0PY?si=I8OpbYKQR4iPKM41jbWXFw&utm_source=copy-link"
  },
  {
    id: "alb-4",
    judul: "In the Court of the Crimson King",
    artist: "King Crimson",
    cover: "imgalbm/3174088049fd36ff393bcf5bd5c727ea.jpg",
    deskripsi: "Album debut King Crimson yang dirilis pada 10 Oktober 1969. Karya penting dalam perkembangan progressive rock ini memadukan rock, jazz, dan nuansa klasik dengan perubahan dinamika yang dramatis.",
    tracks: [
      "21st Century Schizoid Man", "I Talk to the Wind", "Epitaph",
      "Moonchild", "The Court of the Crimson King"
    ],
    spotify: "https://open.spotify.com/album/75ol9OP8bJaRqzGimpFHDm?si=14eVLWUmSW69ywhaicyz8w&utm_source=copy-link"
  },
  {
    id: "alb-5",
    judul: "good kid, m.A.A.d city",
    artist: "Kendrick Lamar",
    cover: "imgalbm/f9327a848e09ab5fb71cd2f86bce0212 (1).jpg",
    deskripsi: "Album major-label debut Kendrick Lamar yang dirilis pada 22 Oktober 2012, dengan subtitle 'A Short Film by Kendrick Lamar'. Disusun seperti film naratif yang mengeksplorasi lingkungan dan pencarian jati diri.",
    tracks: [
      "Sherane a.k.a Master Splinter's Daughter", "Bitch, Don't Kill My Vibe",
      "Backseat Freestyle", "The Art of Peer Pressure", "Money Trees", "Poetic Justice",
      "good kid", "m.A.A.d city", "Swimming Pools (Drank)",
      "Sing About Me, I'm Dying Of Thirst", "Real", "Compton"
    ],
    spotify: "https://open.spotify.com/album/748dZDqSZy6aPXKcI9H80u?si=ceL5OeeVR_yFTtVjYweEdw&utm_source=copy-link"
  }
];

export const DEFAULT_TRACKS = [
  {
    id: "trk-1",
    judul: "Rindu Aku Rindu Kamu",
    artist: "Doel Sumbang, Nini Carlina",
    cover: "imgalbm/ab67616d0000b2730baf10b452a4b86648994806.jpeg",
    deskripsi: "Duet Doel Sumbang dan Nini Carlina yang bercerita tentang sepasang kekasih yang saling merindu dan dimabuk asmara di tepi pantai.",
    spotify: "https://open.spotify.com/track/3Gupp8x0uDuRyzBwQfxGgC?si=psatQmiQSDyy0o1OnMUoxw&utm_source=copy-link"
  },
  {
    id: "trk-2",
    judul: "Movin' Out (Anthony's Song)",
    artist: "Billy Joel",
    cover: "imgalbm/d2d13b9964b51af00e6596221c99ca10.jpg",
    deskripsi: "Lagu pembuka album The Stranger (1977) karya Billy Joel, diproduseri Phil Ramone.",
    spotify: "https://open.spotify.com/track/16GUMo6u3D2qo9a19AkYct?si=019EFu_8SCGAQe5APmygSQ&utm_source=copy-link"
  },
  {
    id: "trk-3",
    judul: "So Be It",
    artist: "Clipse",
    cover: "imgalbm/SpotiMate.io - So Be It - Clipse.jpg",
    deskripsi: "Single dari album Let God Sort Em Out (2025), reuni Clipse (Pusha T dan Malice) dengan produksi Pharrell.",
    spotify: "https://open.spotify.com/track/0xaQ86cGRgcF8wwP1SkXsb?si=12bGwpN8Rvu8V2kE9bN1mg&utm_source=copy-link"
  },
  {
    id: "trk-4",
    judul: "Never Let Me Down",
    artist: "Kanye West, JAY-Z & J. Ivy",
    cover: "imgalbm/SpotiMate.io - Never Let Me Down - Kanye West.jpg",
    deskripsi: "Lagu dari album debut Kanye West, The College Dropout (2004), bersama Jay-Z dan penyair J. Ivy.",
    spotify: "https://open.spotify.com/track/34j4OxJxKznBs88cjSL2j9?si=j821M-ctTI-mUAFao-9Ftg&utm_source=copy-link"
  },
  {
    id: "trk-5",
    judul: "Simpan Saja",
    artist: "Ecoutez",
    cover: "imgalbm/ab67616d0000b27380771106caae6467ff44b240.jpeg",
    deskripsi: "Single pertama band Ecoutez asal Jakarta dari album debut Ekute (2006).",
    spotify: "https://open.spotify.com/track/6nIptzv5jqfdiDw9Aen0Ad?si=czbfuZK8TXO0aVn4QR_GnQ&utm_source=copy-link"
  }
];
