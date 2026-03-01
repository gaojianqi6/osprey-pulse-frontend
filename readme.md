# 🦅 Osprey Pulse - Frontend (Universal App)

This is the frontend repository for **Osprey Pulse**, a high-performance sports community platform. It uses a **Universal Monorepo** architecture to share code across **iOS, Android, and Web (PC/Mobile Browser)**.

---

## 🏗 Project Structure

We use **Turborepo** to manage our workspaces.

```text
osprey-pulse-frontend/
├── apps/
│   ├── expo/          # Native Mobile App (iOS/Android)
│   │   └── src/       # Mobile-specific entry points & navigation wrappers
│   └── next/          # Web Platform (PC & Mobile Web)
│       └── src/       # Next.js pages & Layout wrappers
├── packages/
│   ├── app/           # <--- THE SHARED BRAIN (90% of your code lives here)
│   │   ├── api/       # Apollo Client, GraphQL Queries/Mutations
│   │   ├── components/# Atomic UI (Buttons, Cards, Modals)
│   │   ├── features/  # Screen-level features (NBA, Home, User Profile)
│   │   ├── hooks/     # Shared logic (useAuth, usePoints, useNbaData)
│   │   ├── provider/  # Global Contexts (Theme, Apollo, Redux)
│   │   ├── store/     # Redux Toolkit state management
│   │   └── ui/        # NativeWind theme configuration
│   │   └── utils/        # NativeWind theme configuration
│   │   │   ├── common/              # "Generic" Utils (Not related to sports)
│   │   │   │   ├── string.ts        # e.g., capitalize(), truncate()
│   │   │   │   ├── date.ts          # e.g., formatTimeAgo(), getNZTime()
│   │   │   │   └── number.ts        # e.g., formatPoints(), currency()
│   │   │   ├── domain/              # "Business" Utils (Specific to Osprey Pulse)
│   │   │   │   ├── nba.ts           # e.g., transformNbaStatus(), getTeamColor()
│   │   │   │   ├── rugby.ts         # e.g., calculateScoreDiff()
│   │   │   │   └── gaming.ts        # e.g., formatKda()
│   │   │   └── transform/           # Data Mapping (API -> UI)
│   │   │   │   └── nba-mapper.ts    # e.g., mapBackendToUIModel()
│   └── tailwind/      # Shared Tailwind/NativeWind config
```

---

## 🚀 Tech Stack

- **Framework:** [Solito](https://solito.dev) (Unifies Next.js + Expo)
- **Styling:** [NativeWind v4](https://www.nativewind.dev/v4) (Tailwind CSS v3 for React Native)
- **Data Fetching:** [Apollo Client](https://www.apollographql.com/docs/react) (GraphQL)
- **State Management:** [Redux Toolkit](https://redux-toolkit.js.org/)
- **Icons:** [Lucide React Native](https://lucide.dev)
- **Animations:** [Moti](https://moti.fyi) (Universal animations)

---

## 🛠 Development Workflow

### 1. How to write Shared Code
Write everything in `packages/app`.
- Use `View`, `Text`, and `Pressable` from `react-native`. 
- Use **NativeWind** classes for styling.
- **Responsive Design:** Use Tailwind prefixes. 
  - `w-full md:w-1/2`: Full width on mobile, half width on PC.
  - `hidden md:flex`: Hide on mobile, show on PC.

In a Solito/Universal app, you write your code using react-native primitives (View, Text, FlatList).
* On Mobile: It uses the standard React Native engine.
* On Web: Next.js uses react-native-web to automatically turn that View into a div and that Text into a span.

The Rule: If you want to share code, always import from react-native. Never use div or h1 in the packages/app folder.

### 2. How to write Platform-Specific Code (The Extension Trick)
If a feature must work differently on Web and Mobile (e.g., File Uploads), use file extensions:
- `VideoPlayer.web.tsx` (Next.js will use this)
- `VideoPlayer.native.tsx` (Expo will use this)

### 3. State Management Strategy
- **Server State:** Use **Apollo Client**. It caches your .NET GraphQL data automatically.
- **Global UI State:** Use **Redux** for things like:
  - Is the User Logged in?
  - Current "Osprey Points" balance.
  - Dark/Light mode preference.

---

## 📱 vs 💻 Navigation & Layouts

### Mobile App (Expo)
- **Header:** Use `react-navigation` header inside `apps/expo/src/navigation`.
- **Bottom Tabs:** Defined in `apps/expo` using `createBottomTabNavigator`. It should contain: *Home, Rates, Plus (+), Me*.

### PC Web (Next.js)
- **Header:** Create a custom `Navbar.tsx` component in `packages/app/components`. 
- **Layout:** Use a standard `layout.tsx` in Next.js.
- **PC Navigation:** Instead of bottom tabs, move navigation to the **Top Header** or a **Fixed Sidebar**.
  - *Tip:* Use `hidden md:flex` on your Sidebar and `flex md:hidden` on your Bottom Tab bar.

---

## 🎨 Layout Breakdown

| Feature | Mobile (Native) | Web (PC Browser) |
| :--- | :--- | :--- |
| **Main Navigation** | Bottom Tab Bar | Top Header / Sidebar |
| **Sports Channels** | Horizontal Scroll (Top) | Fixed Left Sidebar |
| **NBA Games** | Vertical Stack (1 Column) | Grid Layout (2 or 3 Columns) |
| **Ratings** | Full Screen Modal | Side Panel or Centered Modal |

---

## 🧪 Testing Strategy

### 1. Unit Testing (Logic & Hooks)
- **Tool:** `Vitest`.
- **Location:** `packages/app/**/*.test.ts`.
- Focus on testing "Osprey Points" calculations and data transformations.

### 2. Component Testing
- **Tool:** `React Testing Library` (Web) and `React Native Testing Library` (Mobile).
- Test that a `ScoreCard` displays the team names correctly.

### 3. E2E (End-to-End)
- **Web:** `Playwright` (Tests the Next.js site in Chrome/Safari).
- **Mobile:** `Maestro` (The simplest way to test Expo apps).

---

## 🧩 Stitch Home Page Assets

We use Stitch to design the NBA home experience.

- **Project:** Home Page - NBA Channel (`8593798284271653726`)
- **Screen:** Home Page - Final Polish (`9b88ce73066748aea9539d483cf2aff0`)

When you have the hosted export URLs from Stitch, download them into the shared app package (for example):

```bash
curl -L "<PASTE_STITCH_CODE_URL>" -o packages/app/features/home/stitch/home-page.tsx
curl -L "<PASTE_STITCH_ASSETS_URL>" -o packages/app/features/home/stitch/assets.zip
```

Then wire the exported component into `packages/app/features/home/screen.tsx` or a dedicated `StitchHomeScreen` wrapper so the same design is shared by both Expo and Next.

---

## 🛠 Setup Instructions

1. **Install Dependencies:**
   ```bash
   yarn install
   ```

2. **Start .NET Backend:**
   Ensure your .NET 10 API is running at `http://localhost:5018/graphql`.

3. **Start Development Servers:**
   - **Web:** `yarn web` (Next.js at localhost:3000)
   - **Mobile:** `yarn native` (Expo Go)

4. **Testing mobile app with local GraphQL backend**
   - **iOS Simulator:** Uses `http://localhost:5018/graphql` by default.
   - **Android Emulator:** Copy `apps/expo/.env.example` to `apps/expo/.env` and set `EXPO_PUBLIC_GRAPHQL_URL=http://10.0.2.2:5018/graphql` so the emulator can reach your machine.
   - **Physical device:** In `apps/expo/.env` set `EXPO_PUBLIC_GRAPHQL_URL=http://YOUR_COMPUTER_IP:5018/graphql` (e.g. `192.168.1.5`). Use the same Wi‑Fi as your phone and ensure the backend is running.

5. **GraphQL codegen (optional):**
   Run this whenever you change your .NET GraphQL schema:
   ```bash
   yarn workspace @my-app/api generate
   ```

---

## 📜 Development Philosophy
"Write once, run anywhere, but **look native everywhere.**" 
Don't make the website look like a stretched mobile app. Use the extra screen space on PC to show more news, standings, and chat sidebars.