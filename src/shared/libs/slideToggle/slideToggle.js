import { _slideDown, _slideUp } from '../../../features';

export function slideToggle(target, duration = 500) {
   if (target.hidden) {
      return _slideDown(target, duration);
   } else {
      return _slideUp(target, duration);
   }
}
