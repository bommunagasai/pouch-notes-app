if(!self.define){let e,a={};const i=(i,f)=>(i=new URL(i+".js",f).href,a[i]||new Promise((a=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=a,document.head.appendChild(e)}else e=i,importScripts(i),a()})).then((()=>{let e=a[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(f,d)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(a[c])return;let r={};const s=e=>i(e,c),o={module:{uri:c},exports:r,require:s};a[c]=Promise.all(f.map((e=>o[e]||s(e)))).then((e=>(d(...e),r)))}}define(["./workbox-873c5e43"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"android-chrome-192x192.66562bb8.png",revision:"546f738d231714b418735205f5bf4654"},{url:"android-chrome-512x512.b0d97327.png",revision:"699269073922f5920249ddfcb11fb58c"},{url:"apple-touch-icon.e42bf8f0.png",revision:"b8fd133330a5a9423a195458816d0152"},{url:"Create.0149a7fd.js",revision:"ca63a7ade948653bc3d28d447a184cbe"},{url:"Create.0149a7fd.js.map",revision:"80bad11f8a0c71bea55a85d66cc3fef3"},{url:"Create.9a80e5f8.css",revision:"9fbe85adc595dc46514b809f8f54c774"},{url:"Create.9a80e5f8.css.map",revision:"2a6a1356ab2e9fd9b07c3d4a609a5f61"},{url:"Create.ce1a055f.js",revision:"7fc65fd8d8dacad70a7a2ebe76af8ed6"},{url:"Create.ce1a055f.js.map",revision:"37db5ed8455b5869ef6aee020271c9d2"},{url:"empty-street.e16312a4.svg",revision:"8f114a866140caf57cb3645b50ab0dbb"},{url:"EvaIcons.8282e99f.svg",revision:"a5601060e075d3958ffc5870ad3d66a3"},{url:"EvaIcons.8962891e.eot",revision:"7308ef42b0bab9447833000b8980df5c"},{url:"EvaIcons.fa2806a7.woff",revision:"57c58aa72cd4fd44116f15c99d4417b5"},{url:"favicon-16x16.d483eb8a.png",revision:"32b0713d61da0191aa9e6e885fc2e92d"},{url:"favicon-32x32.81975a3b.png",revision:"8e574752e59629be0e8ca7923607a995"},{url:"favicon.d9861fac.ico",revision:"7fd4dcf1a67617053be3675b84f62b52"},{url:"ftu-main-2.5fb738bf.svg",revision:"adf50868506cde8c4cfef156f5a442c4"},{url:"ftu-main.bfbb2ea5.svg",revision:"fdc4eb9e0e2356e20330428043f3d4a5"},{url:"index.6c77ecc3.css",revision:"63a4736b1e76dc373d3b5228bdc347f6"},{url:"index.6c77ecc3.css.map",revision:"1aa58d916517d4a714821f6cd188074e"},{url:"index.efbbd367.js",revision:"485919bdc36092cd7cd5fe3464382f45"},{url:"index.efbbd367.js.map",revision:"b8c6f76e4ead1327c26213eee7729c67"},{url:"index.html",revision:"246c5ae4d0847ef4f61d295c5578b0c6"},{url:"not-found.6adc6594.svg",revision:"a461f11ae5658e3eb5d050a280371cdc"},{url:"PlateEditor.28a77cab.js",revision:"01274978706e5a2cad055f481a5e2147"},{url:"PlateEditor.6f4aa0cd.js",revision:"3067884f1f983bf6d1f04f2ebe9d6c65"},{url:"PlateEditor.6f4aa0cd.js.map",revision:"1ffbf4db22d84f34cbc3ef0bb0101d2d"},{url:"remixicon.5a813bff.svg",revision:"010941d4a670729967fa09f14b30b531"},{url:"remixicon.82adb9f5.eot",revision:"a880a7630450a80cafef0638d8fa76a9"},{url:"remixicon.c46c3d8e.woff2",revision:"217b5ac83db360415bcd4770665db6bf"},{url:"remixicon.d1535903.woff",revision:"23475b2278140922de337dc0536473bb"},{url:"splash.6ca156b2.svg",revision:"e25d1c4f28c0581892b0cdbe5a8414fc"},{url:"up_/site.webmanifest",revision:"061c0d65761812777f446057383e061b"},{url:"Update.0f9a3086.js",revision:"cb8179f74248e1b84396e6f77d5a1fda"},{url:"Update.0f9a3086.js.map",revision:"04e421c84d150d3a8955f7775c867311"}],{})}));
//# sourceMappingURL=service-worker.js.map
