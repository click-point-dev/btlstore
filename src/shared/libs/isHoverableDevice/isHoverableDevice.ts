export function isHoverableDevice(): boolean {
   const isHoverableDevice = window.matchMedia(
      '(hover: hover) and (pointer: fine)',
   );

   return isHoverableDevice.matches;
}
