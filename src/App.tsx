import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import HistoryPage from "./pages/HistoryPage";
import HeaderNav from "./components/common/HeaderNav";
import ClassicGame from "./components/games/ClassicGame";
import UltimateGame from "./components/games/UltimateGame";
import ThreeDGame from "./components/games/ThreeDGame";
import MultiplayerGame from "./components/games/MultiplayerGame";

const GameLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="min-h-screen flex flex-col pb-12">
    <HeaderNav />
    <main className="flex-1 w-full max-w-6xl mx-auto px-4">{children}</main>
  </div>
);

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<HistoryPage />} />

        {/* Game Mode Routes */}
        <Route
          path="/play/classic"
          element={
            <GameLayout>
              <ClassicGame />
            </GameLayout>
          }
        />
        <Route
          path="/play/ultimate"
          element={
            <GameLayout>
              <UltimateGame />
            </GameLayout>
          }
        />
        <Route
          path="/play/3d"
          element={
            <GameLayout>
              <ThreeDGame />
            </GameLayout>
          }
        />
        <Route
          path="/play/multiplayer"
          element={
            <GameLayout>
              <MultiplayerGame />
            </GameLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
