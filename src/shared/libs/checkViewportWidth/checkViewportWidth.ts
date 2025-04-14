export function checkViewportWidth(mediaQuery: string): boolean {
   const matchMedia = window.matchMedia(mediaQuery);

   return matchMedia.matches;
}
