import React, { useState } from "react";
import SplashScreen from "./Components/SplashScreen";
import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import Info from "./Components/Info";
import Mission from "./Components/Mission";
import Goals from "./Components/Goals";
import Features from "./Components/Features";
import Footer from "./Components/Footer";

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <SplashScreen onFinish={() => setLoading(false)} />}
      {!loading && (
        <>
          <Navbar />
          <Hero />
          <Info />
          <Mission />
          <Goals />
          <Features />
          <Footer />
        </>
      )}
    </>
  );
}

export default App;
