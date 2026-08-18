const fs = require('fs');
let code = fs.readFileSync('src/components/RumbleControlBar.tsx', 'utf8');

code = code.replace(
/if \('documentPictureInPicture' in window\) \{\s*const pipWindow = await \(window as any\)\.documentPictureInPicture\.requestWindow\(\);\s*pipWindow\.document\.body\.appendChild\(iframeRef\.current\.cloneNode\(true\)\);\s*\}/,
`if ('documentPictureInPicture' in window) {
          const pipWindow = await (window as any).documentPictureInPicture.requestWindow();
          const iframe = iframeRef.current;
          const originalParent = iframe.parentNode;
          const originalNextSibling = iframe.nextSibling;
          
          // Move the actual playing iframe into the PiP window
          pipWindow.document.body.appendChild(iframe);
          
          // Return it to the main window when PiP closes
          pipWindow.addEventListener("pagehide", () => {
            if (originalParent) {
              originalParent.insertBefore(iframe, originalNextSibling);
            }
            setIsPiP(false);
          });
        }`
);

fs.writeFileSync('src/components/RumbleControlBar.tsx', code);
