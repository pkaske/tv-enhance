const t=new WeakMap,e=e=>"function"==typeof e&&t.has(e),i=void 0!==window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,s=(t,e,i=null)=>{for(;e!==i;){const i=e.nextSibling;t.removeChild(e),e=i}},n={},o={},r=`{{lit-${String(Math.random()).slice(2)}}}`,a=`\x3c!--${r}--\x3e`,l=new RegExp(`${r}|${a}`),c="$lit$";class h{constructor(t,e){this.parts=[],this.element=e;const i=[],s=[],n=document.createTreeWalker(e.content,133,null,!1);let o=0,a=-1,h=0;const{strings:p,values:{length:m}}=t;for(;h<m;){const t=n.nextNode();if(null!==t){if(a++,1===t.nodeType){if(t.hasAttributes()){const e=t.attributes,{length:i}=e;let s=0;for(let t=0;t<i;t++)d(e[t].name,c)&&s++;for(;s-- >0;){const e=p[h],i=_.exec(e)[2],s=i.toLowerCase()+c,n=t.getAttribute(s);t.removeAttribute(s);const o=n.split(l);this.parts.push({type:"attribute",index:a,name:i,strings:o}),h+=o.length-1}}"TEMPLATE"===t.tagName&&(s.push(t),n.currentNode=t.content)}else if(3===t.nodeType){const e=t.data;if(e.indexOf(r)>=0){const s=t.parentNode,n=e.split(l),o=n.length-1;for(let e=0;e<o;e++){let i,o=n[e];if(""===o)i=u();else{const t=_.exec(o);null!==t&&d(t[2],c)&&(o=o.slice(0,t.index)+t[1]+t[2].slice(0,-c.length)+t[3]),i=document.createTextNode(o)}s.insertBefore(i,t),this.parts.push({type:"node",index:++a})}""===n[o]?(s.insertBefore(u(),t),i.push(t)):t.data=n[o],h+=o}}else if(8===t.nodeType)if(t.data===r){const e=t.parentNode;null!==t.previousSibling&&a!==o||(a++,e.insertBefore(u(),t)),o=a,this.parts.push({type:"node",index:a}),null===t.nextSibling?t.data="":(i.push(t),a--),h++}else{let e=-1;for(;-1!==(e=t.data.indexOf(r,e+1));)this.parts.push({type:"node",index:-1}),h++}}else n.currentNode=s.pop()}for(const t of i)t.parentNode.removeChild(t)}}const d=(t,e)=>{const i=t.length-e.length;return i>=0&&t.slice(i)===e},p=t=>-1!==t.index,u=()=>document.createComment(""),_=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;class m{constructor(t,e,i){this.__parts=[],this.template=t,this.processor=e,this.options=i}update(t){let e=0;for(const i of this.__parts)void 0!==i&&i.setValue(t[e]),e++;for(const t of this.__parts)void 0!==t&&t.commit()}_clone(){const t=i?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),e=[],s=this.template.parts,n=document.createTreeWalker(t,133,null,!1);let o,r=0,a=0,l=n.nextNode();for(;r<s.length;)if(o=s[r],p(o)){for(;a<o.index;)a++,"TEMPLATE"===l.nodeName&&(e.push(l),n.currentNode=l.content),null===(l=n.nextNode())&&(n.currentNode=e.pop(),l=n.nextNode());if("node"===o.type){const t=this.processor.handleTextExpression(this.options);t.insertAfterNode(l.previousSibling),this.__parts.push(t)}else this.__parts.push(...this.processor.handleAttributeExpressions(l,o.name,o.strings,this.options));r++}else this.__parts.push(void 0),r++;return i&&(document.adoptNode(t),customElements.upgrade(t)),t}}class f{constructor(t,e,i,s){this.strings=t,this.values=e,this.type=i,this.processor=s}getHTML(){const t=this.strings.length-1;let e="",i=!1;for(let s=0;s<t;s++){const t=this.strings[s],n=t.lastIndexOf("\x3c!--");i=(n>-1||i)&&-1===t.indexOf("--\x3e",n+1);const o=_.exec(t);e+=null===o?t+(i?r:a):t.substr(0,o.index)+o[1]+o[2]+c+o[3]+r}return e+=this.strings[t]}getTemplateElement(){const t=document.createElement("template");return t.innerHTML=this.getHTML(),t}}const g=t=>null===t||!("object"==typeof t||"function"==typeof t),b=t=>Array.isArray(t)||!(!t||!t[Symbol.iterator]);class y{constructor(t,e,i){this.dirty=!0,this.element=t,this.name=e,this.strings=i,this.parts=[];for(let t=0;t<i.length-1;t++)this.parts[t]=this._createPart()}_createPart(){return new v(this)}_getValue(){const t=this.strings,e=t.length-1;let i="";for(let s=0;s<e;s++){i+=t[s];const e=this.parts[s];if(void 0!==e){const t=e.value;if(g(t)||!b(t))i+="string"==typeof t?t:String(t);else for(const e of t)i+="string"==typeof e?e:String(e)}}return i+=t[e]}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class v{constructor(t){this.value=void 0,this.committer=t}setValue(t){t===n||g(t)&&t===this.value||(this.value=t,e(t)||(this.committer.dirty=!0))}commit(){for(;e(this.value);){const t=this.value;this.value=n,t(this)}this.value!==n&&this.committer.commit()}}class S{constructor(t){this.value=void 0,this.__pendingValue=void 0,this.options=t}appendInto(t){this.startNode=t.appendChild(u()),this.endNode=t.appendChild(u())}insertAfterNode(t){this.startNode=t,this.endNode=t.nextSibling}appendIntoPart(t){t.__insert(this.startNode=u()),t.__insert(this.endNode=u())}insertAfterPart(t){t.__insert(this.startNode=u()),this.endNode=t.endNode,t.endNode=this.startNode}setValue(t){this.__pendingValue=t}commit(){for(;e(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=n,t(this)}const t=this.__pendingValue;t!==n&&(g(t)?t!==this.value&&this.__commitText(t):t instanceof f?this.__commitTemplateResult(t):t instanceof Node?this.__commitNode(t):b(t)?this.__commitIterable(t):t===o?(this.value=o,this.clear()):this.__commitText(t))}__insert(t){this.endNode.parentNode.insertBefore(t,this.endNode)}__commitNode(t){this.value!==t&&(this.clear(),this.__insert(t),this.value=t)}__commitText(t){const e=this.startNode.nextSibling;t=null==t?"":t,e===this.endNode.previousSibling&&3===e.nodeType?e.data=t:this.__commitNode(document.createTextNode("string"==typeof t?t:String(t))),this.value=t}__commitTemplateResult(t){const e=this.options.templateFactory(t);if(this.value instanceof m&&this.value.template===e)this.value.update(t.values);else{const i=new m(e,t.processor,this.options),s=i._clone();i.update(t.values),this.__commitNode(s),this.value=i}}__commitIterable(t){Array.isArray(this.value)||(this.value=[],this.clear());const e=this.value;let i,s=0;for(const n of t)void 0===(i=e[s])&&(i=new S(this.options),e.push(i),0===s?i.appendIntoPart(this):i.insertAfterPart(e[s-1])),i.setValue(n),i.commit(),s++;s<e.length&&(e.length=s,this.clear(i&&i.endNode))}clear(t=this.startNode){s(this.startNode.parentNode,t.nextSibling,this.endNode)}}class w{constructor(t,e,i){if(this.value=void 0,this.__pendingValue=void 0,2!==i.length||""!==i[0]||""!==i[1])throw new Error("Boolean attributes can only contain a single expression");this.element=t,this.name=e,this.strings=i}setValue(t){this.__pendingValue=t}commit(){for(;e(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=n,t(this)}if(this.__pendingValue===n)return;const t=!!this.__pendingValue;this.value!==t&&(t?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=t),this.__pendingValue=n}}class x extends y{constructor(t,e,i){super(t,e,i),this.single=2===i.length&&""===i[0]&&""===i[1]}_createPart(){return new C(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class C extends v{}let P=!1;try{const t={get capture(){return P=!0,!1}};window.addEventListener("test",t,t),window.removeEventListener("test",t,t)}catch(t){}class N{constructor(t,e,i){this.value=void 0,this.__pendingValue=void 0,this.element=t,this.eventName=e,this.eventContext=i,this.__boundHandleEvent=(t=>this.handleEvent(t))}setValue(t){this.__pendingValue=t}commit(){for(;e(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=n,t(this)}if(this.__pendingValue===n)return;const t=this.__pendingValue,i=this.value,s=null==t||null!=i&&(t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive),o=null!=t&&(null==i||s);s&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),o&&(this.__options=A(t),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=t,this.__pendingValue=n}handleEvent(t){"function"==typeof this.value?this.value.call(this.eventContext||this.element,t):this.value.handleEvent(t)}}const A=t=>t&&(P?{capture:t.capture,passive:t.passive,once:t.once}:t.capture);class E{handleAttributeExpressions(t,e,i,s){const n=e[0];if("."===n){return new x(t,e.slice(1),i).parts}return"@"===n?[new N(t,e.slice(1),s.eventContext)]:"?"===n?[new w(t,e.slice(1),i)]:new y(t,e,i).parts}handleTextExpression(t){return new S(t)}}const T=new E;function M(t){let e=V.get(t.type);void 0===e&&(e={stringsArray:new WeakMap,keyString:new Map},V.set(t.type,e));let i=e.stringsArray.get(t.strings);if(void 0!==i)return i;const s=t.strings.join(r);return void 0===(i=e.keyString.get(s))&&(i=new h(t,t.getTemplateElement()),e.keyString.set(s,i)),e.stringsArray.set(t.strings,i),i}const V=new Map,k=new WeakMap,q=(t,e,i)=>{let n=k.get(e);void 0===n&&(s(e,e.firstChild),k.set(e,n=new S(Object.assign({templateFactory:M},i))),n.appendInto(e)),n.setValue(t),n.commit()};(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.0.0");const O=(t,...e)=>new f(t,e,"html",T),$=133;function R(t,e){const{element:{content:i},parts:s}=t,n=document.createTreeWalker(i,$,null,!1);let o=U(s),r=s[o],a=-1,l=0;const c=[];let h=null;for(;n.nextNode();){a++;const t=n.currentNode;for(t.previousSibling===h&&(h=null),e.has(t)&&(c.push(t),null===h&&(h=t)),null!==h&&l++;void 0!==r&&r.index===a;)r.index=null!==h?-1:r.index-l,r=s[o=U(s,o)]}c.forEach(t=>t.parentNode.removeChild(t))}const z=t=>{let e=11===t.nodeType?0:1;const i=document.createTreeWalker(t,$,null,!1);for(;i.nextNode();)e++;return e},U=(t,e=-1)=>{for(let i=e+1;i<t.length;i++){const e=t[i];if(p(e))return i}return-1};function j(t,e,i=null){const{element:{content:s},parts:n}=t;if(null===i||void 0===i)return void s.appendChild(e);const o=document.createTreeWalker(s,$,null,!1);let r=U(n),a=0,l=-1;for(;o.nextNode();){for(l++,o.currentNode===i&&(a=z(e),i.parentNode.insertBefore(e,i));-1!==r&&n[r].index===l;){if(a>0){for(;-1!==r;)n[r].index+=a,r=U(n,r);return}r=U(n,r)}}}const F=(t,e)=>`${t}--${e}`;let L=!0;void 0===window.ShadyCSS?L=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),L=!1);const H=t=>e=>{const i=F(e.type,t);let s=V.get(i);void 0===s&&(s={stringsArray:new WeakMap,keyString:new Map},V.set(i,s));let n=s.stringsArray.get(e.strings);if(void 0!==n)return n;const o=e.strings.join(r);if(void 0===(n=s.keyString.get(o))){const i=e.getTemplateElement();L&&window.ShadyCSS.prepareTemplateDom(i,t),n=new h(e,i),s.keyString.set(o,n)}return s.stringsArray.set(e.strings,n),n},I=["html","svg"],B=t=>{I.forEach(e=>{const i=V.get(F(e,t));void 0!==i&&i.keyString.forEach(t=>{const{element:{content:e}}=t,i=new Set;Array.from(e.querySelectorAll("style")).forEach(t=>{i.add(t)}),R(t,i)})})},D=new Set,W=(t,e,i)=>{D.add(i);const s=t.querySelectorAll("style"),{length:n}=s;if(0===n)return void window.ShadyCSS.prepareTemplateStyles(e.element,i);const o=document.createElement("style");for(let t=0;t<n;t++){const e=s[t];e.parentNode.removeChild(e),o.textContent+=e.textContent}B(i);const r=e.element.content;j(e,o,r.firstChild),window.ShadyCSS.prepareTemplateStyles(e.element,i);const a=r.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==a)t.insertBefore(a.cloneNode(!0),t.firstChild);else{r.insertBefore(o,r.firstChild);const t=new Set;t.add(o),R(e,t)}},J=(t,e,i)=>{const n=i.scopeName,o=k.has(e),r=L&&11===e.nodeType&&!!e.host&&t instanceof f,a=r&&!D.has(n),l=a?document.createDocumentFragment():e;if(q(t,l,Object.assign({templateFactory:H(n)},i)),a){const t=k.get(l);k.delete(l),t.value instanceof m&&W(l,t.value.template,n),s(e,e.firstChild),e.appendChild(l),k.set(e,t)}!o&&r&&window.ShadyCSS.styleElement(e.host)};window.JSCompiler_renameProperty=((t,e)=>t);const K={toAttribute(t,e){switch(e){case Boolean:return t?"":null;case Object:case Array:return null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){switch(e){case Boolean:return null!==t;case Number:return null===t?null:Number(t);case Object:case Array:return JSON.parse(t)}return t}},G=(t,e)=>e!==t&&(e==e||t==t),Q={attribute:!0,type:String,converter:K,reflect:!1,hasChanged:G},X=Promise.resolve(!0),Y=1,Z=4,tt=8,et=16,it=32;class st extends HTMLElement{constructor(){super(),this._updateState=0,this._instanceProperties=void 0,this._updatePromise=X,this._hasConnectedResolver=void 0,this._changedProperties=new Map,this._reflectingProperties=void 0,this.initialize()}static get observedAttributes(){this.finalize();const t=[];return this._classProperties.forEach((e,i)=>{const s=this._attributeNameForProperty(i,e);void 0!==s&&(this._attributeToPropertyMap.set(s,i),t.push(s))}),t}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const t=Object.getPrototypeOf(this)._classProperties;void 0!==t&&t.forEach((t,e)=>this._classProperties.set(e,t))}}static createProperty(t,e=Q){if(this._ensureClassProperties(),this._classProperties.set(t,e),e.noAccessor||this.prototype.hasOwnProperty(t))return;const i="symbol"==typeof t?Symbol():`__${t}`;Object.defineProperty(this.prototype,t,{get(){return this[i]},set(e){const s=this[t];this[i]=e,this._requestUpdate(t,s)},configurable:!0,enumerable:!0})}static finalize(){if(this.hasOwnProperty(JSCompiler_renameProperty("finalized",this))&&this.finalized)return;const t=Object.getPrototypeOf(this);if("function"==typeof t.finalize&&t.finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const t=this.properties,e=[...Object.getOwnPropertyNames(t),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(t):[]];for(const i of e)this.createProperty(i,t[i])}}static _attributeNameForProperty(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}static _valueHasChanged(t,e,i=G){return i(t,e)}static _propertyValueFromAttribute(t,e){const i=e.type,s=e.converter||K,n="function"==typeof s?s:s.fromAttribute;return n?n(t,i):t}static _propertyValueToAttribute(t,e){if(void 0===e.reflect)return;const i=e.type,s=e.converter;return(s&&s.toAttribute||K.toAttribute)(t,i)}initialize(){this._saveInstanceProperties(),this._requestUpdate()}_saveInstanceProperties(){this.constructor._classProperties.forEach((t,e)=>{if(this.hasOwnProperty(e)){const t=this[e];delete this[e],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(e,t)}})}_applyInstanceProperties(){this._instanceProperties.forEach((t,e)=>this[e]=t),this._instanceProperties=void 0}connectedCallback(){this._updateState=this._updateState|it,this._hasConnectedResolver&&(this._hasConnectedResolver(),this._hasConnectedResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(t,e,i){e!==i&&this._attributeToProperty(t,i)}_propertyToAttribute(t,e,i=Q){const s=this.constructor,n=s._attributeNameForProperty(t,i);if(void 0!==n){const t=s._propertyValueToAttribute(e,i);if(void 0===t)return;this._updateState=this._updateState|tt,null==t?this.removeAttribute(n):this.setAttribute(n,t),this._updateState=this._updateState&~tt}}_attributeToProperty(t,e){if(this._updateState&tt)return;const i=this.constructor,s=i._attributeToPropertyMap.get(t);if(void 0!==s){const t=i._classProperties.get(s)||Q;this._updateState=this._updateState|et,this[s]=i._propertyValueFromAttribute(e,t),this._updateState=this._updateState&~et}}_requestUpdate(t,e){let i=!0;if(void 0!==t){const s=this.constructor,n=s._classProperties.get(t)||Q;s._valueHasChanged(this[t],e,n.hasChanged)?(this._changedProperties.has(t)||this._changedProperties.set(t,e),!0!==n.reflect||this._updateState&et||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(t,n))):i=!1}!this._hasRequestedUpdate&&i&&this._enqueueUpdate()}requestUpdate(t,e){return this._requestUpdate(t,e),this.updateComplete}async _enqueueUpdate(){let t,e;this._updateState=this._updateState|Z;const i=this._updatePromise;this._updatePromise=new Promise((i,s)=>{t=i,e=s});try{await i}catch(t){}this._hasConnected||await new Promise(t=>this._hasConnectedResolver=t);try{const t=this.performUpdate();null!=t&&await t}catch(t){e(t)}t(!this._hasRequestedUpdate)}get _hasConnected(){return this._updateState&it}get _hasRequestedUpdate(){return this._updateState&Z}get hasUpdated(){return this._updateState&Y}performUpdate(){this._instanceProperties&&this._applyInstanceProperties();let t=!1;const e=this._changedProperties;try{(t=this.shouldUpdate(e))&&this.update(e)}catch(e){throw t=!1,e}finally{this._markUpdated()}t&&(this._updateState&Y||(this._updateState=this._updateState|Y,this.firstUpdated(e)),this.updated(e))}_markUpdated(){this._changedProperties=new Map,this._updateState=this._updateState&~Z}get updateComplete(){return this._updatePromise}shouldUpdate(t){return!0}update(t){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach((t,e)=>this._propertyToAttribute(e,this[e],t)),this._reflectingProperties=void 0)}updated(t){}firstUpdated(t){}}st.finalized=!0;const nt="adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype;function ot(t,e=[]){for(let i=0,s=t.length;i<s;i++){const s=t[i];Array.isArray(s)?ot(s,e):e.push(s)}return e}(window.litElementVersions||(window.litElementVersions=[])).push("2.0.1");const rt=t=>t.flat?t.flat(1/0):ot(t);class at extends st{static finalize(){super.finalize(),this._styles=this.hasOwnProperty(JSCompiler_renameProperty("styles",this))?this._getUniqueStyles():this._styles||[]}static _getUniqueStyles(){const t=this.styles,e=[];if(Array.isArray(t)){rt(t).reduceRight((t,e)=>(t.add(e),t),new Set).forEach(t=>e.unshift(t))}else t&&e.push(t);return e}initialize(){super.initialize(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const t=this.constructor._styles;0!==t.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?nt?this.renderRoot.adoptedStyleSheets=t.map(t=>t.styleSheet):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(t.map(t=>t.cssText),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(t){super.update(t);const e=this.render();e instanceof f&&this.constructor.render(e,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach(t=>{const e=document.createElement("style");e.textContent=t.cssText,this.renderRoot.appendChild(e)}))}render(){}}at.finalized=!0,at.render=J;const lt=[{action:"text",label:"text"},{action:"anchored_text",label:"anchored_text"},{action:"balloon",label:"balloon"},{action:"arrow_up",label:"arrow_up"},{action:"arrow_down",label:"arrow_down"},{action:"arrow_left",label:"arrow_left"},{action:"arrow_right",label:"arrow_right"},{action:"price_label",label:"price_label"},{action:"flag",label:"flag"},{action:"xabcd_pattern",label:"xabcd_pattern"},{action:"abcd_pattern",label:"abcd_pattern"},{action:"triangle_pattern",label:"triangle_pattern"},{action:"3divers_pattern",label:"3divers_pattern"},{action:"head_and_shoulders",label:"head_and_shoulders"},{action:"cypher_pattern",label:"cypher_pattern"},{action:"elliott_impulse_wave",label:"elliott_impulse_wave"},{action:"elliott_triangle_wave",label:"elliott_triangle_wave"},{action:"elliott_triple_combo",label:"elliott_triple_combo"},{action:"elliott_correction",label:"elliott_correction"},{action:"elliott_double_combo",label:"elliott_double_combo"},{action:"cyclic_lines",label:"cyclic_lines"},{action:"time_cycles",label:"time_cycles"},{action:"sine_line",label:"sine_line"},{action:"rectangle",label:"rectangle"},{action:"rotated_rectangle",label:"rotated_rectangle"},{action:"ellipse",label:"ellipse"},{action:"triangle",label:"triangle"},{action:"polyline",label:"polyline"},{action:"curve",label:"curve"},{action:"double_curve",label:"double_curve"},{action:"arc",label:"arc"},{action:"vertical_line",label:"vertical_line"},{action:"horizontal_line",label:"horizontal_line"},{action:"cross_line",label:"cross_line"},{action:"horizontal_ray",label:"horizontal_ray"},{action:"trend_line",label:"trend_line"},{action:"trend_infoline",label:"trend_infoline"},{action:"trend_angle",label:"trend_angle"},{action:"arrow",label:"arrow"},{action:"ray",label:"ray"},{action:"extended",label:"extended"},{action:"parallel_channel",label:"parallel_channel"},{action:"disjoint_angle",label:"disjoint_angle"},{action:"flat_bottom",label:"flat_bottom"},{action:"fib_spiral",label:"fib_spiral"},{action:"pitchfork",label:"pitchfork"},{action:"schiff_pitchfork_modified",label:"schiff_pitchfork_modified"},{action:"schiff_pitchfork",label:"schiff_pitchfork"},{action:"inside_pitchfork",label:"inside_pitchfork"},{action:"pitchfan",label:"pitchfan"},{action:"gannbox_square",label:"gannbox_square"},{action:"gannbox_fan",label:"gannbox_fan"},{action:"gannbox",label:"gannbox"},{action:"fib_speed_resist_fan",label:"fib_speed_resist_fan"},{action:"fib_retracement",label:"fib_retracement"},{action:"fib_trend_ext",label:"fib_trend_ext"},{action:"fib_timezone",label:"fib_timezone"},{action:"fib_trend_time",label:"fib_trend_time"},{action:"fib_circles",label:"fib_circles"},{action:"fib_speed_resist_arcs",label:"fib_speed_resist_arcs"},{action:"fib_wedge",label:"fib_wedge"},{action:"fib_channel",label:"fib_channel"},{action:"date_range",label:"date_range"},{action:"price_range",label:"price_range"},{action:"date_and_price_range",label:"date_and_price_range"},{action:"long_position",label:"long_position"},{action:"short_position",label:"short_position"},{action:"projection",label:"projection"},{action:"forecast",label:"forecast"},{action:"ghost_feed",label:"ghost_feed"},{action:"bars_pattern",label:"bars_pattern"}];class ct extends at{render(){return O`
      <style>
        :host {
          display: block;
        }

        .sc-grid {
          display: grid;
          grid-template-columns: auto 1fr;
          column-gap: 20px;
          align-items: center;
        }

        .sc-grid > div {
          padding: 4px 0;
        }
      </style>

      <h3>Custom Shortcuts</h3>

      <div class="sc-grid" @keyup=${this._saveShortcuts}>
        <div>
          Toggle Magnet Mode
        </div>
        <div>
          <select name="magnetModeModifier" @change=${this._saveShortcuts}>
            <option value="alt" ?selected=${this._shortCutModEq("magnetMode","alt")}>alt</option>
            <option value="ctrl" ?selected=${this._shortCutModEq("magnetMode","ctrl")}>ctrl</option>
          </select> + <input type="text" name="magnetMode" value=${this._getShortCutKey("magnetMode")}>
        </div>

        <div>
          Hide All Drawing Tools
        </div>
        <div>
          <select name="hideAllDrawingToolsModifier" @change=${this._saveShortcuts}>
            <option value="alt" ?selected=${this._shortCutModEq("hideAllDrawingTools","alt")}>alt</option>
            <option value="ctrl" ?selected=${this._shortCutModEq("hideAllDrawingTools","ctrl")}>ctrl</option>
          </select> + <input type="text" name="hideAllDrawingTools" value=${this._getShortCutKey("hideAllDrawingTools")}>
        </div>

        ${this.tools.map(t=>O`
          <div>
            ${t.label}
          </div>
          <div>
            <select name="${t.action}Modifier" @change=${this._saveShortcuts}>
              <option value="alt" ?selected=${this._shortCutModEq(t.action,"alt")}>alt</option>
              <option value="ctrl" ?selected=${this._shortCutModEq(t.action,"ctrl")}>ctrl</option>
            </select> + <input type="text" name=${t.action} value=${this._getShortCutKey(t.action)}>
          </div>
        `)}
      </div>
    `}static get properties(){return{shortcuts:{type:Object},tools:{type:Array}}}constructor(){super(),this.shortcuts={},this.tools=lt}connectedCallback(){super.connectedCallback(),chrome.storage.sync.get(["shortcuts"],t=>{this.shortcuts=t.shortcuts})}_saveShortcuts(){const t=this.shadowRoot.querySelector(".sc-grid"),e={};t.querySelectorAll("input").forEach(i=>{const s=i.name,n=i.value.trim().toLowerCase(),o=t.querySelector(`select[name="${s}Modifier"]`).value;""!==n&&(e[s]={key:n,mod:o})}),chrome.storage.sync.set({shortcuts:e},()=>{chrome.tabs.query({},function(t){for(var e=0;e<t.length;++e)chrome.tabs.sendMessage(t[e].id,{action:"reloadShortcuts"})})})}_getShortCutKey(t){return this.shortcuts[t]?this.shortcuts[t].key:""}_shortCutModEq(t,e){return this.shortcuts[t]&&this.shortcuts[t].mod===e}}window.customElements.define("tv-app",ct);