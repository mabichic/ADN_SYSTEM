import { ipcRenderer } from "electron";
import { useEffect, useRef, useState } from "react";
import useAudio from "../useAudio";

export default function useTimer(intentions: string, audioAddress: String) {
  const [visible, setVisible] = useState(false);
  const [audio] = useAudio(audioAddress);
  const timerIdRef = useRef(null);

  function tick() {
    return setTimeout(() => {
      setVisible(false);
    }, 3000);
  }
  useEffect(() => {
    ipcRenderer.on(intentions, (event, arg) => {
      if (visible) {
        clearTimeout(timerIdRef.current);
        timerIdRef.current = tick();
      } else {
        clearTimeout(timerIdRef.current);
        timerIdRef.current = tick();
        setVisible(true);
        audio(true);
      }
    });

    return () => {
      ipcRenderer.removeAllListeners(intentions);
    };
  }, [visible]);

  return [visible, setVisible];
}
