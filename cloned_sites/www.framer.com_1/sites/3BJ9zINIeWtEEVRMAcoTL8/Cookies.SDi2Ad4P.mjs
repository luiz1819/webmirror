import{__esmMin as e,init_jsx_runtime as t,init_ssg_sandbox_shims as n,p as r,window as i}from"./react.Bw_BZ6ND.mjs";import{init_framer_motion_KB2VX5JL as a,isBrowser as o}from"./motion.CHCLrvhr.mjs";function s(e){return t=>{function n(e){o&&(i.dataLayer=i.dataLayer||[],i.dataLayer.push(e))}function a({isInEU:e}){n({event:`CookieBannerShown`,isInEU:e})}function s({isInEU:e}){n({event:`CookieBannerAccepted`,isInEU:e})}function c({isInEU:e}){n({event:`CookieBannerRejected`,isInEU:e})}function l({isInEU:e}){n({event:`CookieBannerDismissed`,isInEU:e})}function u({isInEU:e,consent:t}){let r={analytics:!0,marketing:!0,necessary:!0,preferences:!0},i=JSON.stringify(t)===JSON.stringify(r);i&&n({event:`CookieBannerStartTracking`,isInEU:e})}return r(e,{...t,onShown:a,onAccept:s,onReject:c,onDismiss:l,onConsentChange:u,gtmLoadedExternally:!0})}}function c(e){return t=>{function n(){localStorage.removeItem(`framerCookiesConsentMode`),localStorage.removeItem(`framerCookiesDismissed`)}return r(e,{...t,onClick:n})}}var l=e(()=>{n(),t(),a()});export{l as init_Cookies,c as withCookieReset,s as withTracking};
//# sourceMappingURL=Cookies.SDi2Ad4P.mjs.map