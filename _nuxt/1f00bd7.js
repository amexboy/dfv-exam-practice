(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{464:function(e,t,n){"use strict";n.r(t);var r={props:{value:{type:Array(String),default:null}},data:function(){return{date:this.value,menu:!1,modal:!1}},watch:{date:function(e){this.$emit("input",e)}}},l=n(85),c=n(102),o=n.n(c),d=n(436),f=n(521),v=n(440),m=n(452),k=n(441),component=Object(l.a)(r,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-menu",{ref:"menu",attrs:{"close-on-content-click":!1,"return-value":e.date,transition:"scale-transition","offset-y":"","max-width":"290px","min-width":"auto"},on:{"update:returnValue":function(t){e.date=t},"update:return-value":function(t){e.date=t}},scopedSlots:e._u([{key:"activator",fn:function(t){var r=t.on,l=t.attrs;return[n("v-text-field",e._g(e._b({attrs:{value:""+e.date,label:"Picker in menu","prepend-icon":"mdi-calendar",readonly:""}},"v-text-field",l,!1),r))]}}]),model:{value:e.menu,callback:function(t){e.menu=t},expression:"menu"}},[e._v(" "),n("v-date-picker",{attrs:{range:"","no-title":"",scrollable:""},on:{change:function(t){return e.$refs.menu.save(e.date)}},model:{value:e.date,callback:function(t){e.date=t},expression:"date"}},[n("v-spacer"),e._v(" "),n("v-btn",{attrs:{text:"",color:"primary"},on:{click:function(t){e.menu=!1}}},[e._v("\n      Cancel\n    ")])],1)],1)}),[],!1,null,null,null);t.default=component.exports;o()(component,{VBtn:d.a,VDatePicker:f.a,VMenu:v.a,VSpacer:m.a,VTextField:k.a})}}]);