"use strict";(self.webpackChunkfrenglish_docusaurus=self.webpackChunkfrenglish_docusaurus||[]).push([[209],{6535:(e,t,a)=>{a.d(t,{A:()=>k});var l=a(6540),r=a(4164),n=a(781),s=a(4581),i=a(8774),c=a(1312),m=a(6347),o=a(9169);function u(e){const{pathname:t}=(0,m.zy)();return(0,l.useMemo)((()=>e.filter((e=>function(e,t){return!(e.unlisted&&!(0,o.ys)(e.permalink,t))}(e,t)))),[e,t])}const d={sidebar:"sidebar_re4s",sidebarItemTitle:"sidebarItemTitle_pO2u",sidebarItemList:"sidebarItemList_Yudw",sidebarItem:"sidebarItem__DBe",sidebarItemLink:"sidebarItemLink_mo7H",sidebarItemLinkActive:"sidebarItemLinkActive_I1ZP"};function g(e){let{sidebar:t}=e;const a=u(t.items);return l.createElement("aside",{className:"col col--3"},l.createElement("nav",{className:(0,r.A)(d.sidebar,"thin-scrollbar"),"aria-label":(0,c.T)({id:"theme.blog.sidebar.navAriaLabel",message:"Blog recent posts navigation",description:"The ARIA label for recent posts in the blog sidebar"})},l.createElement("div",{className:(0,r.A)(d.sidebarItemTitle,"margin-bottom--md")},t.title),l.createElement("ul",{className:(0,r.A)(d.sidebarItemList,"clean-list")},a.map((e=>l.createElement("li",{key:e.permalink,className:d.sidebarItem},l.createElement(i.A,{isNavLink:!0,to:e.permalink,className:d.sidebarItemLink,activeClassName:d.sidebarItemLinkActive},e.title)))))))}var b=a(5600);function E(e){let{sidebar:t}=e;const a=u(t.items);return l.createElement("ul",{className:"menu__list"},a.map((e=>l.createElement("li",{key:e.permalink,className:"menu__list-item"},l.createElement(i.A,{isNavLink:!0,to:e.permalink,className:"menu__link",activeClassName:"menu__link--active"},e.title)))))}function p(e){return l.createElement(b.GX,{component:E,props:e})}function h(e){let{sidebar:t}=e;const a=(0,s.l)();return t?.items.length?"mobile"===a?l.createElement(p,{sidebar:t}):l.createElement(g,{sidebar:t}):null}function k(e){const{sidebar:t,toc:a,children:s,...i}=e,c=t&&t.items.length>0;return l.createElement(n.A,i,l.createElement("div",{className:"container margin-vert--lg"},l.createElement("div",{className:"row"},l.createElement(h,{sidebar:t}),l.createElement("main",{className:(0,r.A)("col",{"col--7":c,"col--9 col--offset-1":!c})},s),a&&l.createElement("div",{className:"col col--2"},a))))}},9158:(e,t,a)=>{a.r(t),a.d(t,{default:()=>p});var l=a(6540),r=a(4164),n=a(1312);const s=()=>(0,n.T)({id:"theme.tags.tagsPageTitle",message:"Tags",description:"The title of the tag list page"});var i=a(1213),c=a(7559),m=a(6535),o=a(6133),u=a(1107);const d={tag:"tag_Nnez"};function g(e){let{letterEntry:t}=e;return l.createElement("article",null,l.createElement(u.A,{as:"h2",id:t.letter},t.letter),l.createElement("ul",{className:"padding--none"},t.tags.map((e=>l.createElement("li",{key:e.permalink,className:d.tag},l.createElement(o.A,e))))),l.createElement("hr",null))}function b(e){let{tags:t}=e;const a=function(e){const t={};return Object.values(e).forEach((e=>{const a=function(e){return e[0].toUpperCase()}(e.label);t[a]??=[],t[a].push(e)})),Object.entries(t).sort(((e,t)=>{let[a]=e,[l]=t;return a.localeCompare(l)})).map((e=>{let[t,a]=e;return{letter:t,tags:a.sort(((e,t)=>e.label.localeCompare(t.label)))}}))}(t);return l.createElement("section",{className:"margin-vert--lg"},a.map((e=>l.createElement(g,{key:e.letter,letterEntry:e}))))}var E=a(1463);function p(e){let{tags:t,sidebar:a}=e;const n=s();return l.createElement(i.e3,{className:(0,r.A)(c.G.wrapper.blogPages,c.G.page.blogTagsListPage)},l.createElement(i.be,{title:n}),l.createElement(E.A,{tag:"blog_tags_list"}),l.createElement(m.A,{sidebar:a},l.createElement(u.A,{as:"h1"},n),l.createElement(b,{tags:t})))}},6133:(e,t,a)=>{a.d(t,{A:()=>i});var l=a(6540),r=a(4164),n=a(8774);const s={tag:"tag_zVej",tagRegular:"tagRegular_sFm0",tagWithCount:"tagWithCount_h2kH"};function i(e){let{permalink:t,label:a,count:i}=e;return l.createElement(n.A,{href:t,className:(0,r.A)(s.tag,i?s.tagWithCount:s.tagRegular)},a,i&&l.createElement("span",null,i))}}}]);