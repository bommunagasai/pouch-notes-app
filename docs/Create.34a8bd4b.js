function e(e,t,o,n){Object.defineProperty(e,t,{get:o,set:n,enumerable:!0,configurable:!0})}var t=("undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{}).parcelRequirec250;t.register("33bWW",(function(o,n){var a;a=o.exports,Object.defineProperty(a,"__esModule",{value:!0,configurable:!0}),e(o.exports,"default",(function(){return g}));var i=t("k8UWl"),r=t("fd2wl"),l=t("iZr1d"),s=t("jPO5J"),c=t("9qkK4"),d=t("bo4iJ"),u=t("1j7Qj"),f=t("8Mxml"),p=t("hdAu4"),h=t("iVzkL"),y=t("44L9R");const b={saving:!1,content:[],theme:"dark",type:"bulb",metaTitle:"",metaDescription:"",dialog:{show:!1}},m=(e,t)=>{switch(t.type){case"save_to_db_init":return{...e,saving:!0,content:t.payload,dialog:{...e.dialog,show:!0}};case"close_create_form":return{...e,dialog:{...e.dialog,show:!1}};default:return new Error("Unknown action")}};var g=s.withSizes((({width:e})=>({isMobile:e<=576})))((({isMobile:e})=>{const[t,o]=r.useReducer(m,b),n=new f.default("NOTE_DB"),a=l.useNavigate();return i.jsxs(c.Container,{md:!0,className:u.getClassName({fontColor:u.Color.dark}),children:[i.jsx(c.Row,{children:i.jsx(c.Col,{children:i.jsx(r.Suspense,{fallback:i.jsx(c.SpinLoader,{}),children:i.jsx(h.default,{id:d.v1(),isMobile:e,onSave:async e=>{o({type:"save_to_db_init",payload:e})},goBack:()=>a("/"),value:y.TEMPLATES.default})})})}),i.jsx(c.SheetContainer,{show:t.dialog.show,bottom:!0,children:i.jsx(p.default,{title:"Create Notes",hint:"Would be usefull for search",formData:{theme:t.theme,type:t.type},onCancel:()=>o({type:"close_create_form"}),onSubmit:e=>(async e=>{const{metaTitle:i,metaDescription:r,theme:l,type:s}=e;o({type:"close_create_form"});try{await n.createNotes({content:t.content,metaTitle:i,metaDescription:r,theme:l,type:s}),a("/")}catch(e){console.log(e),o({type:"save_to_db_failed"})}})(e)})})]})}))})),t.register("44L9R",(function(o,n){e(o.exports,"TEMPLATES",(function(){return i}));var a=t("25DGs");const i={default:[((e,{type:t=a.ELEMENT_PARAGRAPH,mark:o}={})=>{const n={text:e};return o&&(n[o]=!0),{type:t,children:[n]}})("",{type:a.ELEMENT_PARAGRAPH})]}}));
//# sourceMappingURL=Create.34a8bd4b.js.map
