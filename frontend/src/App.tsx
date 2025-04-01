import { useEffect, useRef } from 'react'
import './App.css'
import { Terminal } from "xterm";

import "xterm/css/xterm.css";


function App() {
  const hasRun = useRef(false);

  useEffect(() => {
    // Prevents useEffect from running twice in dev which happens due to StrictMode
    if (hasRun.current) return;
    hasRun.current = true;
    const term = new Terminal();
    term.open(document.getElementById("terminal")!);
    
    term.write("Welcome to the game!\r\n> ");
  }, [])

  return (
    <div id="terminal"/>
  )
}

export default App
