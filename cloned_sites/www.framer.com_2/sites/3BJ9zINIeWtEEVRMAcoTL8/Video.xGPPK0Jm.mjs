import{X as e,__esmMin as t,init_jsx_runtime as n,init_npm_react_18_2$1 as r,p as i,pe as a,se as o,te as s,ue as c,ye as l}from"./react.Bw_BZ6ND.mjs";import{init_framer_motion_KB2VX5JL as u,isMotionValue as d,useInView as f}from"./motion.CHCLrvhr.mjs";import{ControlType as p,RenderTarget as m,addPropertyControls as h,init_framer_XJ5BRUQR as g,useIsInCurrentNavigationTarget as _}from"./framer.A4H8FlLB.mjs";import{borderRadiusControl as v,defaultEvents as y,useIsBrowserSafari as ee,useIsOnCanvas as b,useOnEnter as te,useOnExit as ne,useRadius as x,useRenderTarget as S}from"./shared.BkRDOwIg.mjs";import{init_OIjZRBmWDcIE2B6qgG1j as C}from"./OIjZRBmWDcIE2B6qgG1j.DrIfzu6X.mjs";function w(e){let{width:t,height:n,topLeft:r,topRight:i,bottomRight:a,bottomLeft:o,id:s,children:c,...l}=e;return l}function T(e){let t=w(e);return i(j,{...t})}function re(e){let t=_(),n=a(!1),r=a(!1),i=s(t=>{if(!e.current)return;let n=(t===1?.999:t)*e.current.duration,r=Math.abs(e.current.currentTime-n)<.1;e.current.duration>0&&!r&&(e.current.currentTime=n)},[]),o=s(()=>{let i=e.current;if(!i)return;i.preload=`auto`;let a=i.currentTime>0&&i.onplaying&&!i.paused&&!i.ended&&i.readyState>=i.HAVE_CURRENT_DATA;!a&&i&&!n.current&&t&&(n.current=!0,r.current=!0,i.play().catch(e=>{}).finally(()=>n.current=!1))},[]),c=s(()=>{!e.current||n.current||(e.current.pause(),r.current=!1)},[]);return{play:o,pause:c,setProgress:i,isPlaying:r}}function ie({playingProp:e,muted:t,loop:n,playsinline:r,controls:i}){let[a]=l(()=>e),[o,s]=l(!1);e!==a&&!o&&s(!0);let c=a&&t&&n&&r&&!i&&!o,u;return u=c?`on-viewport`:a?`on-mount`:`no-autoplay`,u}function E(e){return e.charAt(0).toUpperCase()+e.slice(1)}function D(e){let t=e.match(/[A-Z]{2,}|[A-Z][a-z]+|[a-z]+|[A-Z]|\d+/gu)||[];return t.map(E).join(` `)}var O,k,A,j,M,N=t(()=>{n(),g(),u(),C(),r(),function(e){e.Fill=`fill`,e.Contain=`contain`,e.Cover=`cover`,e.None=`none`,e.ScaleDown=`scale-down`}(O||={}),function(e){e.Video=`Upload`,e.Url=`URL`}(k||={}),A=`https://framerusercontent.com/assets/MLWPbW1dUQawJLhhun3dBwpgJak.mp4`,j=e(function(e){let{srcType:t=`URL`,srcUrl:n,srcFile:r=``,posterEnabled:s=!1,controls:l=!1,playing:u=!0,loop:p=!0,muted:h=!0,playsinline:g=!0,restartOnEnter:_=!1,objectFit:v=`cover`,backgroundColor:y=`rgba(0,0,0,0)`,radius:C=0,volume:w=25,startTime:T=0,poster:E,playing:D,progress:O,onSeeked:k,onPause:j,onPlay:M,onEnd:N,onClick:P,onMouseEnter:F,onMouseLeave:I,onMouseDown:L,onMouseUp:R}=e,z=a(),B=ee(),V=a(null),H=a(null),U=b(),W=S(),G=U||W===m.export,ae=x(e),K=G?`no-autoplay`:ie({playingProp:D,muted:h,loop:p,playsinline:g,controls:l}),q=G?!0:f(z),oe=G?!1:f(z,{margin:`10%`,once:!0}),J=T===100?99.9:T,{play:Y,pause:X,setProgress:Z,isPlaying:Q}=re(z);c(()=>{G||K!==`on-viewport`&&(D?Y():X())},[K,D]),c(()=>{G||(q&&D&&K!==`no-autoplay`&&Y(),K===`on-viewport`&&X())},[K,q,D]),c(()=>{!U||E||s||J||!z.current||(z.current.currentTime=.01)},[s,E,J]);let $=a(!1);c(()=>{if(!$.current){$.current=!0;return}let e=d(O)?O.get():(O??0)*.01;Z((e??0)||(J??0)/100)},[J,r,n,O]),c(()=>{if(d(O))return O.on(`change`,e=>Z(e))},[O]),te(()=>{V.current!==null&&z.current&&(!H&&p||!V.current)&&Y()}),ne(()=>{z.current&&(H.current=z.current.ended,V.current=z.current.paused,X())});let se=o(()=>{let e=``;if(t===`URL`)return n+e;if(t===`Upload`)return r+e},[t,r,n,J]);c(()=>{B&&z.current&&K===`on-mount`&&setTimeout(()=>Y(),50)},[]),c(()=>{z.current&&!h&&(z.current.volume=(w??0)/100)},[w]);let ce=()=>{let e=z.current;e&&(e.currentTime<.3&&J>0&&Z((J??0)*.01),(Q.current||K===`on-mount`||D&&K===`on-viewport`&&q)&&Y())};return i(`video`,{onClick:P,onMouseEnter:F,onMouseLeave:I,onMouseDown:L,onMouseUp:R,src:se,loop:p,ref:z,onSeeked:e=>k?.(e),onPause:e=>j?.(e),onPlay:e=>M?.(e),onEnded:e=>N?.(e),autoPlay:Q.current||K===`on-mount`||D&&K===`on-viewport`&&q,preload:Q.current?`auto`:G&&!E?`metadata`:K!==`on-mount`&&!oe?`none`:`metadata`,poster:s&&!r&&n===A?`https://framerusercontent.com/images/5ILRvlYXf72kHSVHqpa3snGzjU.jpg`:s&&E?E:void 0,onLoadedData:ce,controls:l,muted:G?!0:h,playsInline:g,style:{cursor:P?`pointer`:`auto`,width:`100%`,height:`100%`,borderRadius:ae,display:`block`,objectFit:v,backgroundColor:y,objectPosition:`50% 50%`}})}),T.displayName=`Video`,M=[`cover`,`fill`,`contain`,`scale-down`,`none`],h(T,{srcType:{type:p.Enum,displaySegmentedControl:!0,title:`Source`,options:[`URL`,`Upload`]},srcUrl:{type:p.String,title:`URL`,defaultValue:`https://framerusercontent.com/assets/MLWPbW1dUQawJLhhun3dBwpgJak.mp4`,hidden(e){return e.srcType===`Upload`}},srcFile:{type:p.File,title:`File`,allowedFileTypes:[`mp4`,`webm`],hidden(e){return e.srcType===`URL`}},playing:{type:p.Boolean,title:`Playing`,enabledTitle:`Yes`,disabledTitle:`No`},...v,posterEnabled:{type:p.Boolean,title:`Poster`,enabledTitle:`Yes`,disabledTitle:`No`},poster:{type:p.Image,title:`Image`,hidden:({posterEnabled:e})=>!e,description:`We recommend adding a poster. [Learn more](https://www.framer.com/help/articles/how-are-videos-optimized-in-framer/).`},backgroundColor:{type:p.Color,title:`Background`,defaultValue:`rgba(0,0,0,0)`},startTime:{title:`Start Time`,type:p.Number,min:0,max:100,step:.1,unit:`%`},loop:{type:p.Boolean,title:`Loop`,enabledTitle:`Yes`,disabledTitle:`No`},objectFit:{type:p.Enum,title:`Fit`,options:M,optionTitles:M.map(D)},controls:{type:p.Boolean,title:`Controls`,enabledTitle:`Show`,disabledTitle:`Hide`,defaultValue:!1},muted:{type:p.Boolean,title:`Muted`,enabledTitle:`Yes`,disabledTitle:`No`},volume:{type:p.Number,max:100,min:0,unit:`%`,hidden:({muted:e})=>e,defaultValue:25},onEnd:{type:p.EventHandler},onSeeked:{type:p.EventHandler},onPause:{type:p.EventHandler},onPlay:{type:p.EventHandler},...y})});export{T as Video,N as init_Video};
//# sourceMappingURL=Video.xGPPK0Jm.mjs.map