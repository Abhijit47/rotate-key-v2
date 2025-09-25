// 'use client';

// import { useUser } from '@clerk/nextjs';
// import {
//   KnockFeedProvider,
//   KnockProvider,
//   NotificationFeedPopover,
//   NotificationIconButton,
// } from '@knocklabs/react';
// import { useRef, useState } from 'react';

// // Required CSS import, unless you're overriding the styling
// import '@knocklabs/react/dist/index.css';

// export default function NotificationFeed() {
//   const [isVisible, setIsVisible] = useState(false);
//   const notifButtonRef = useRef<HTMLButtonElement | null>(null);

//   const { user } = useUser();

//   if (!user) {
//     return null;
//   }

//   return (
//     <KnockProvider
//       apiKey={process.env.NEXT_PUBLIC_KNOCK_API_KEY}
//       userId={user.id}>
//       <KnockFeedProvider feedId={process.env.NEXT_PUBLIC_KNOCK_FEED_CHANNEL_ID}>
//         <>
//           <NotificationIconButton
//             ref={notifButtonRef}
//             onClick={() => {
//               // alert('clicked');
//               setIsVisible((prev) => !prev);
//             }}
//           />
//           <NotificationFeedPopover
//             buttonRef={notifButtonRef as React.RefObject<HTMLButtonElement>}
//             isVisible={isVisible}
//             // isVisible={!isVisible} // outside click not working in this way
//             onClose={() => setIsVisible(false)}
//           />
//         </>
//       </KnockFeedProvider>
//     </KnockProvider>
//   );
// }
