export function isAvaliableURI(
   inaccessiblePages: [string] = ['components'],
): boolean {
   const isAvaliableURI = !inaccessiblePages.some(href =>
      location.href.includes(href),
   );
   console.log(isAvaliableURI);
   return isAvaliableURI;
}
