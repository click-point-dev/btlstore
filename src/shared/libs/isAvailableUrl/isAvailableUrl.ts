export function isAvailableUrl(path: string): boolean {
   const normalPath = path.toLowerCase().trim();
   // console.log(
   //    location.pathname,
   //    normalPath,
   //    location.pathname.includes(normalPath),
   // );
   if (location.pathname === '/' && normalPath === '/') return true;
   if (normalPath !== '/') return location.pathname.includes(`/${normalPath}`);
}
