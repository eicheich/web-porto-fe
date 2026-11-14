# Portfolio — Machine Learning & Small Experiments

Web portfolio modern berbasis **React + Vite + Tailwind CSS**, dibuat sesuai dengan rancangan desain landing page portfolio machine learning.

## 🚀 Fitur & Komponen

1. **Navigation Bar (`Navbar.jsx`)**:
   - Logo `Portfolio.` dengan tipografi bersih.
   - Smooth-scrolling anchor links: `ML projects`, `Playground`, `Stories`, `About`.
   - Tombol aktif `• Let's connect` dengan pulse indicator hijau yang memicu modal kontak.
   - Responsif untuk desktop & mobile drawer.

2. **Hero Section (`Hero.jsx`)**:
   - Tagline: `SOFTWARE ENGINEERING STUDENT · FOCUSED ON MACHINE LEARNING`.
   - Headline: *Exploring machine learning. One small idea at a time.*
   - Action buttons: `Explore ML projects` & `Try a model`.

3. **Interactive Learning Lab (`LearningLab.jsx`)**:
   - UI Card bergaya browser window (`My learning lab`).
   - **Sentiment Analysis Card**: Input kalimat interaktif dengan estimasi live confidence & tombol ganti contoh.
   - **Digit Recognition Card**: Selector angka dengan visualisasi kotak hitam & prediksi model.
   - 3 pilar: *Machine learning*, *Hands-on experiments*, *A little software, too*.

4. **Machine Learning Explorations (`MLExplorations.jsx`) - Dark Section**:
   - Background gelap elegan (`#0b0c0e`).
   - **Language Exploration**: *"Reading between the words"* dengan kartu sampel input & badge hasil.
   - **Vision Exploration**: *"What does a seven look like?"* dengan visualisasi pixel grid 8x8 dan inferensi.

5. **Software Projects (`SoftwareProjects.jsx`) - Light Section**:
   - Showcase proyek engineering dasar: **Study Space** (Web) & **Campus Pocket** (Mobile).
   - Mockup visual card & phone frame.

6. **Beyond The Screen (`BeyondTheScreen.jsx`)**:
   - Aktivitas non-coding: Juri hackathon, speaker workshop, dan study group lead.

7. **About Me (`AboutMe.jsx`) - Dark Section**:
   - Narasi personal: *"Still learning. Especially about learning."*
   - Breakdown keahlian: PyTorch, Scikit-Learn, React, FastAPI, dsb.
   - Foto profil asli yang diekstrak dan disesuaikan dari desain dengan status ketersediaan kerja sama.

8. **Contact & CTA (`Contact.jsx`)**:
   - *"Let's start with a hello."*
   - Tombol `Say hello ↗` dengan popup form & efek animasi confetti.
   - Link cepat ke Email, LinkedIn, dan GitHub.

9. **Interactive Modal Playground (`InteractiveModal.jsx`)**:
   - Pengujian live sentiment analysis.
   - Interactive drawing grid 8x8 untuk scribble digit recognition.
   - Formulir kirim pesan instan.

---

## 🛠️ Cara Menjalankan

Jalankan perintah berikut di terminal:

```bash
# Jalankan development server
npm run dev

# Build untuk produksi
npm run build

# Preview hasil build
npm run preview
```

Buka browser di: [http://localhost:5173](http://localhost:5173)
