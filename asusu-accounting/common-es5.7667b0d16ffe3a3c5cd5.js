!function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{PJPR:function(t,n,r){"use strict";r.d(n,"a",(function(){return u}));var o=r("fXoL"),a=r("Fa2m"),i=r("tk/3"),s=r("tyNb"),u=function(){var t=function(){function t(e,n,r){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),this.helper=e,this.http=n,this.router=r}var n,r,o;return n=t,(r=[{key:"get",value:function(){var e=this;return this.http.get(this.helper.getApiUrl()+"aas/business_logo",{headers:this.helper.header()}).subscribe((function(t){t.data&&e.helper.setLogo(t.data.logo)}),(function(e){console.log(e)}))}},{key:"upload",value:function(e){return this.http.post(this.helper.getApiUrl()+"aas/business_logo/set",e,{reportProgress:!0,observe:"events"})}}])&&e(n.prototype,r),o&&e(n,o),t}();return t.\u0275fac=function(e){return new(e||t)(o.Zb(a.a),o.Zb(i.b),o.Zb(s.a))},t.\u0275prov=o.Lb({token:t,factory:t.\u0275fac,providedIn:"root"}),t}()}}])}();