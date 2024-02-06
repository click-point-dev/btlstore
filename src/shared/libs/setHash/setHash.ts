// Указание хеша в адресе сайта
export function setHash(hash: string) {
   hash = hash ? `#${hash}` : window.location.href.split('#')[0];
   history.pushState('', '', hash);
}
