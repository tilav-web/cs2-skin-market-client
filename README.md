# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```

# CS2 Skin Market Client

## Steam Authentication Setup

### 1. Steam API Key olish
1. [Steam Community](https://steamcommunity.com/dev/apikey) sahifasiga o'ting
2. Steam hisobingiz bilan tizimga kiring
3. "Register a new domain" maydoniga `localhost` yoki domeningizni kiriting
4. "I agree to the terms and conditions" ni belgilang
5. "Register" tugmasini bosing
6. API kalitingizni nusxalab oling

### 2. Environment variables sozlash
`env.example` faylini `.env` ga nusxalab, quyidagi ma'lumotlarni to'ldiring:

```env
VITE_STEAM_API_KEY=your_steam_api_key_here
VITE_RETURN_URL=http://localhost:5173/auth/callback
VITE_REALM_URL=http://localhost:5173
```

### 3. Dasturni ishga tushirish
```bash
npm install
npm run dev
```

### 4. Steam login test qilish
1. Brauzerda `http://localhost:5173/auth` ga o'ting
2. "Steam bilan kirish" tugmasini bosing
3. Steam sahifasida login qiling
4. Console da foydalanuvchi ma'lumotlari va token ko'rinadi
5. "CS2 Skinlarini olish" tugmasini bosib, inventory ni ko'ring

## Features
- ✅ Steam OpenID authentication
- ✅ Token-based authentication (localStorage)
- ✅ User data fetching from Steam API
- ✅ CS2 inventory fetching with token
- ✅ Local storage for session management
- ✅ Automatic login state checking
- ✅ User profile display with CS2 skins
- ✅ Logout functionality

## Console Logs
Steam login va CS2 inventory jarayonida quyidagi ma'lumotlar console ga chiqadi:

### Login Process:
- 🚀 Login boshlanishi
- 📥 Callback qabul qilish
- 🆔 Steam ID ajratish
- 💾 Token saqlash
- 👤 Foydalanuvchi ma'lumotlari
- ✅ Muvaffaqiyatli login

### CS2 Inventory:
- 🔍 CS2 inventory so'rash
- 🌐 Inventory URL
- 📊 Inventory response
- 🎮 CS2 skinlar soni
- 🎨 CS2 skinlar ma'lumotlari

### Errors:
- ❌ Xatoliklar
- ⏰ Token muddati tugashi

## Token System
- Steam login qilgandan so'ng avtomatik token yaratiladi
- Token 24 soat muddatga saqlanadi
- Token yordamida CS2 inventory ma'lumotlari olinadi
- Real loyihada token bazaga saqlanishi kerak

## CS2 Inventory
- Foydalanuvchining CS2 skinlari olinadi
- Faqat CS2 bilan bog'liq itemlar ko'rsatiladi (qurollar, pichoqlar, qo'lqoplar)
- Har bir skin uchun rasm, nom va market hash name ko'rsatiladi
