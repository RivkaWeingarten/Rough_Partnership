'use client';
import { useEffect } from "react";


const VoiceflowChat = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://cdn.voiceflow.com/widget-next/bundle.mjs"; 
    script.async = true;

    script.onload = () => {
      if (window.voiceflow && window.voiceflow.chat) {
        window.voiceflow.chat.load({
          verify: { projectID: '67a5cffa47a25c84385a1032' }, 
          url: 'https://general-runtime.voiceflow.com',
          versionID: "production",
        });
      }
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null; // This component only loads the script, no UI needed
};

export default VoiceflowChat;
