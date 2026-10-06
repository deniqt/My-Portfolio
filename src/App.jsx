import { useState } from "react";
import IntroLoader from "./IntroLoader";
import Portfolio from "./Portfolio";

function App() {
  const [loading, setLoading] = useState(true);
  return (
    <>
      {loading ? (
        <IntroLoader onComplete={() => setLoading(false)} />
      ) : (
        <Portfolio />
      )}
    </>
  );
}

export default App;