import gsap from 'gsap';

export function spoller2(): void {
   const items = <Element[]>gsap.utils.toArray('.spoller-2__item');
   const summary = <Element[]>gsap.utils.toArray('.spoller-2__summary');
   const detail = <Element[]>gsap.utils.toArray('.spoller-2__detail');

   const animateDetail = gsap.timeline({ paused: true });

   function animate(selector: any) {
      return animateDetail.to(selector, {
         height: 'auto',
         translateY: '0px',
         // paddingTop: '0px',
      });
   }

   let isNotOpen = false;

   items.forEach((item, itemIndex) => {
      item.addEventListener(
         'click',
         function (e) {
            e.preventDefault();

            if (isNotOpen === false) {
               animate(detail[itemIndex]).play();
               console.log(detail[itemIndex]);
               isNotOpen = true;
            } else {
               animate(detail[itemIndex]).reverse();
               isNotOpen = false;
            }
         },
         true,
      );
   });

   ///==========================================
   // const items = gsap.utils.selector('.spoller-2__list');

   // const li = items('.spoller-2__item');

   // const animateDetail = gsap.timeline({ paused: true });
   // li.forEach(item => {
   //    item.addEventListener('click', function (e) {
   //       e.preventDefault();
   //       const target = gsap.utils.selector(e.currentTarget);
   //       let isOpen = false;
   //       console.log(target);
   //       animateDetail.from(items('.spoller-2__detail'), {
   //          height: '0px',
   //          translateY: '100px',
   //          paddingTop: '0px',
   //       });

   //       if (isOpen === false) {
   //          animateDetail.play();
   //          isOpen = true;
   //       } else {
   //          animateDetail.reverse();
   //          isOpen = false;
   //       }
   //    });
   // });

   ///==========================================
   // const items: HTMLElement[] = gsap.utils.toArray('.spoller-2__item');

   // if (!items.length) return;

   // const animateDetail = gsap.timeline({ paused: true });

   // items.forEach(item => {
   //    // const detail = el('.spoller-2__detail')[0];
   //    // const summary = el('.spoller-2__summary')[0];
   //    let open = false;

   //    function animate(selector: any) {
   //       return animateDetail.from(selector, {
   //          height: '0px',
   //          translateY: '100px',
   //          paddingTop: '0px',
   //       });
   //    }

   //    item.addEventListener('click', function (e) {
   //       const el = <Element>e.target;
   //       if (open === false) {
   //          el.classList.add('active');
   //          console.log('open on', el);
   //          animateDetail.play();
   //          open = true;
   //       } else {
   //          animateDetail.reverse();
   //          el.classList.remove('active');
   //          console.log('close on', el);
   //          open = false;
   //       }
   //    });
   // });
   ///==========================================
   // // create timline tween
   // tl.from(this, { height: 0 });

   // // bind event to button
   // buttons.forEach(button => {
   //    box = button
   //       .closest('.spoller-2__item')
   //       .querySelector('.spoller-2__detail');
   //    console.log(box);
   //    button.addEventListener('click', toggleHeight.bind(box), false);
   // });

   // function toggleHeight(e: any) {
   //    e.preventDefault();
   //    if (open === false) {
   //       tl.play();
   //       open = true;
   //    } else {
   //       tl.reverse();
   //       open = false;
   //    }
   // }
}
