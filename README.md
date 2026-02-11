# transport-logistics-dashboard
Full-stack dashboard za upravljanje voznim parkom (60+ vozila). React + MUI + Supabase

🚚 Transport & Logistics Fleet Dashboard
Ovaj projekat predstavlja sistem za upravljanje voznim parkom od 60+ vozila. Cilj aplikacije je da digitalizuje procese praćenja vozila, vozača i njihovih zaduženja kroz moderan interfejs.

🚀 Glavne Karakteristike
Relaciona baza podataka: Implementiran PostgreSQL putem Supabase platforme sa kompleksnim relacijama.

Upravljanje Flotom: Razdvojena evidencija vučnih (kamioni) i priključnih (prikolice) vozila.

Administracija Vozača: Sistem za praćenje vozača i njihovu direktnu vezu sa vozilima.

Moderni UI: Korisnički interfejs izgrađen pomoću React i Material UI (MUI) komponenti.

🛠️ Tehnologije
Frontend: React.js, Material UI, Emotion (styling)

Backend/Database: Supabase (PostgreSQL)

State Management: React Hooks (useState, useEffect)

Data Import: Napredna migracija podataka iz Excel (.csv) formata u SQL.

📊 Struktura Baze Podataka
Baza je optimizovana za brzinu i integritet podataka:

vozaci: Evidencija svih zaposlenih vozača sa unikatnim ID-evima.

kamioni: Podaci o vučnim vozilima (registracija, marka, model).

prikolice: Posebna tabela za priključna vozila radi lakšeg menjanja kombinacija na terenu.

Relacije: Svaki kamion je povezan sa vozačem preko Foreign Key (vozac_id) polja.

🏁 Kako pokrenuti projekat
Kloniraj repozitorijum: git clone [link-do-tvoj-repo]

Instaliraj zavisnosti: npm install

Podesi .env fajl sa svojim Supabase ključevima.

Pokreni aplikaciju: npm start
