!function(e,r){"use strict";var t=null;tinymce.PluginManager.add("jnews_shortcode",(function(o,n){o.addButton("jnews_grid",{title:"Grid Builder",image:n+"/shortcode/grid.png",cmd:"jnews_grid_cmd"}),o.addCommand("jnews_grid_cmd",(function(){(t=a("Grid Builder",[{type:"grid",name:"Grid Layout"}],820)).find("#exeCmd").on("click",(function(r){var a='<div class="row clearfix">\n';e(".buildgrid > li").each((function(){var r=parseInt(e(this).attr("data-length"),10);a+='<div class="col-md-'+r+'"><p>Your Content Goes Here</p></div>\n'})),a+="</div>\n",t.remove(),o.execCommand("mceInsertContent",!1,a)}))})),o.on("init",(function(e){o.formatter.register("jnews_intro_formater",{block:"div",classes:["intro-text"],wrapper:!0})})),o.addButton("jnews_intro",{title:"Intro",image:n+"/shortcode/intro.png",cmd:"jnews_intro_cmd",onPostRender:function(){var e=this;o.on("NodeChange",(function(r){var t=o.formatter.match("jnews_intro_formater");e.active(t)}))}}),o.addCommand("jnews_intro_cmd",(function(){o.formatter.match("jnews_intro_formater")?o.formatter.remove("jnews_intro_formater"):o.formatter.apply("jnews_intro_formater")}));var c=function(e){var r=e.formatter.match("jnews_dropcaps_formater"),t=e.formatter.match("jnews_dropcaps_formater_square"),o=e.formatter.match("jnews_dropcaps_formater_circle"),a=e.formatter.match("jnews_dropcaps_formater_rounded"),n=e.formatter.match("jnews_dropcaps_formater_border"),c=e.formatter.match("jnews_dropcaps_formater_border_rounded"),l=e.formatter.match("jnews_dropcaps_formater_border_circle"),i=e.formatter.match("jnews_dropcaps_formater_shadow");return Boolean(r|t|o|a|n|c|l|i)};o.on("init",(function(e){o.formatter.register("jnews_dropcaps_formater",{block:"span",classes:["dropcap"],wrapper:!0,styles:["background-color","color","border-color"]}),o.formatter.register("jnews_dropcaps_formater_square",{block:"span",classes:["dropcap","square"],wrapper:!0,styles:["background-color","color","border-color"]}),o.formatter.register("jnews_dropcaps_formater_circle",{block:"span",classes:["dropcap","circle"],wrapper:!0,styles:["background-color","color","border-color"]}),o.formatter.register("jnews_dropcaps_formater_rounded",{block:"span",classes:["dropcap","rounded"],wrapper:!0,styles:["background-color","color","border-color"]}),o.formatter.register("jnews_dropcaps_formater_border",{block:"span",classes:["dropcap","border"],wrapper:!0,styles:["background-color","color","border-color"]}),o.formatter.register("jnews_dropcaps_formater_border_rounded",{block:"span",classes:["dropcap","border","rounded"],wrapper:!0,styles:["background-color","color","border-color"]}),o.formatter.register("jnews_dropcaps_formater_border_circle",{block:"span",classes:["dropcap","border","circle"],wrapper:!0,styles:["background-color","color","border-color"]}),o.formatter.register("jnews_dropcaps_formater_shadow",{block:"span",classes:["dropcap","shadow"],wrapper:!0,styles:["background-color","color","border-color"]})})),o.addButton("jnews_dropcaps",{title:"Dropcap",image:n+"/shortcode/dropcaps.png",cmd:"jnews_dropcaps_cmd",onPostRender:function(){var e=this;o.on("NodeChange",(function(r){e.active(c(o))}))}}),o.addCommand("jnews_dropcaps_cmd",(function(){if(c(o))for(var r=["jnews_dropcaps_formater","jnews_dropcaps_formater_square","jnews_dropcaps_formater_circle","jnews_dropcaps_formater_rounded","jnews_dropcaps_formater_border","jnews_dropcaps_formater_border_rounded","jnews_dropcaps_formater_border_circle","jnews_dropcaps_formater_shadow"],n=0;n<r.length;n++)o.formatter.match(r[n])&&o.formatter.remove(r[n]);else{var l=o.selection.getContent(),i=[{type:"select",name:"Select Dropcap style ",id:"dropstyle",option:["normal","square","circle","rounded","square-border","rounded-border","circle-border","shadow"]},{type:"colorpicker",name:"Background Color",id:"bgcolor",color:"#ffffff"},{type:"colorpicker",name:"Text Color",id:"txtcolor",color:"#000000"},{type:"colorpicker",name:"Border Color",id:"bordercolor",color:"#ffffff"}];""===l&&i.push({type:"text",name:"Dropcap String",id:"dropcap"}),(t=a("Dropcap",i,500)).find("#exeCmd").on("click",(function(r){var a=e("#txtcolor").val(),n=e("#bgcolor").val(),c=e("#bordercolor").val(),i=""!==l?l:e("#dropcap").val(),s=e("#dropstyle").val();"normal"===s?s="":"square-border"===s?s="border":"rounded-border"===s?s="border rounded":"circle-border"===s&&(s="border circle");var d='<span class="dropcap '+s+'" style="'+("background-color : "+n+"; color : "+a+"; border-color : "+c)+'">'+i+"</span>";t.remove(),o.execCommand("mceInsertContent",!1,d)}))}})),o.on("init",(function(e){o.formatter.register("jnews_highlight_formater",{block:"span",classes:["highlight"],wrapper:!0,styles:["background-color","color"]})})),o.addButton("jnews_highlight",{title:"Highlight",image:n+"/shortcode/highlight.png",cmd:"jnews_highlight_cmd",onPostRender:function(){var e=this;o.on("NodeChange",(function(r){var t=o.formatter.match("jnews_highlight_formater");e.active(t)}))}}),o.addCommand("jnews_highlight_cmd",(function(){if(o.formatter.match("jnews_highlight_formater"))o.formatter.remove("jnews_highlight_formater");else{var r=o.selection.getContent(),n=[{type:"colorpicker",name:"Background color",id:"bgcolor",color:"#666666"},{type:"colorpicker",name:"Text color",id:"txtcolor",color:"ffffff"}];""===r&&n.push({type:"text",name:"Highlighted Text",id:"highlight"}),(t=a("Highlight",n,500)).find("#exeCmd").on("click",(function(a){var n=e("#txtcolor").val(),c='<span class="highlight" style="'+("background-color : "+e("#bgcolor").val()+"; color : "+n)+'">'+(""!==r?r:e("#highlight").val())+"</span>";t.remove(),o.execCommand("mceInsertContent",!1,c)}))}}));var l=function(e){var r=e.formatter.match("jnews_pullquote_formater_center"),t=e.formatter.match("jnews_pullquote_formater_right"),o=e.formatter.match("jnews_pullquote_formater_left");return Boolean(r|t|o)};o.on("init",(function(e){o.formatter.register("jnews_pullquote_formater_center",{block:"blockquote",classes:["pullquote","align-center"],wrapper:!0}),o.formatter.register("jnews_pullquote_formater_right",{block:"blockquote",classes:["pullquote","align-right"],wrapper:!0}),o.formatter.register("jnews_pullquote_formater_left",{block:"blockquote",classes:["pullquote","align-left"],wrapper:!0})})),o.addButton("jnews_pullquote",{title:"Pullquote",image:n+"/shortcode/pullquote.png",cmd:"jnews_pullquote_cmd",onPostRender:function(){var e=this;o.on("NodeChange",(function(r){e.active(l(o))}))}}),o.addCommand("jnews_pullquote_cmd",(function(){l(o)?(o.formatter.match("jnews_pullquote_formater_center")&&o.formatter.remove("jnews_pullquote_formater_center"),o.formatter.match("jnews_pullquote_formater_right")&&o.formatter.remove("jnews_pullquote_formater_right"),o.formatter.match("jnews_pullquote_formater_left")&&o.formatter.remove("jnews_pullquote_formater_left")):(t=a("Pullquote",[{type:"select",name:"Pullquote Position ",id:"pullposition",option:["left","right","center"]}],500)).find("#exeCmd").on("click",(function(r){var a=e("#pullposition").val();switch(t.remove(),a){case"left":o.formatter.apply("jnews_pullquote_formater_left");break;case"right":o.formatter.apply("jnews_pullquote_formater_right");break;case"center":o.formatter.apply("jnews_pullquote_formater_center")}}))})),o.addButton("jnews_alert",{title:"Alert",image:n+"/shortcode/alert.png",cmd:"jnews_alert_cmd"}),o.addCommand("jnews_alert_cmd",(function(){(t=a("Alert",[{type:"select",name:"Select alert style",id:"select-color",option:["warning","error","success","info"]},{type:"text",name:"Alert Title",id:"alert-title"},{type:"text",name:"Alert Content",id:"alert-content"}],500)).find("#exeCmd").on("click",(function(r){var a,n=e("#select-color").val();"warning"==n?a="alert-warning":"error"==n?a="alert-error":"success"==n?a="alert-success":"info"==n&&(a="alert-info");var c="<div class='alert "+a+"'><strong>"+e("#alert-title").val()+"</strong> "+e("#alert-content").val()+" </div>";t.remove(),o.execCommand("mceInsertContent",!1,c)}))})),o.addButton("jnews_btn",{title:"Button",image:n+"/shortcode/button.png",cmd:"jnews_btn_cmd"}),o.addCommand("jnews_btn_cmd",(function(){(t=a("Button",[{type:"select",name:"Select button style ",id:"select-color",option:["default","primary","success","info","warning","danger"]},{type:"text",name:"Button Url",id:"btnurl"},{type:"text",name:"Button Text",id:"btntxt"}],500)).find("#exeCmd").on("click",(function(r){var a=e("#select-color").val(),n='<a href="'+e("#btnurl").val()+'" class="btn btn-'+a+'">'+e("#btntxt").val()+"</a>";t.remove(),o.execCommand("mceInsertContent",!1,n)}))})),o.addButton("jnews_spacing",{title:"Spacing",image:n+"/shortcode/spacing.png",cmd:"jnews_spacing_cmd"}),o.addCommand("jnews_spacing_cmd",(function(){(t=a("Spacing",[{type:"text",name:"Size in px",id:"size"}],500)).find("#exeCmd").on("click",(function(r){var a='[spacing size="'+e("#size").val()+'"]';t.remove(),o.execCommand("mceInsertContent",!1,a)}))})),o.addButton("jnews-shortcode-generator",{title:"JNews Generator",image:n+"/shortcode/generator.png",cmd:"shortcode_list"}),o.addCommand("shortcode_list",(function(){r.shortcodepopup.has("jnews")?r.shortcodepopup.instance("jnews").showPopup():r.shortcodepopup.add("jnews",new r.ShortCodeListPopup(o))})),o.addButton("jnews_weather",{title:"Weather",image:n+"/shortcode/weather.png",cmd:"jnews_weather_cmd"}),o.addCommand("jnews_weather_cmd",(function(){(t=a("Weather",[{type:"text",name:"Weather Location",id:"location"},{type:"checkbox",name:"Auto Detect Location",id:"auto_location"},{type:"select",name:"Next Days Weather Forecast",id:"item",option:["show","hide"]},{type:"slider",name:"Number of Weather Item",id:"count",min:3,max:6,step:1,value:4}],500)).find("#exeCmd").on("click",(function(r){var a='[jeg_weather location="'+e("#location").val()+'" auto_location="'+!!e("#auto_location").is(":checked")+'" count="'+e("#count").val()+'" item="'+e("#item").val()+'"]';t.remove(),o.execCommand("mceInsertContent",!1,a)}))}))}));var o=function(e){for(var r,t="",o=0;o<e.length;o++)t+='<option value="'+e[o]+'">'+((r=e[o]).charAt(0).toUpperCase()+r.slice(1)+"</option>\n");return t},a=function(r,a,n){var c=function(e){for(var r="",t=0;t<e.length;t++){var a=e[t];"text"==a.type?r+="<label>"+a.name+" : </label><input type='text' id='"+a.id+"' name='"+a.id+"' />":"textarea"==a.type?r+="<label>"+a.name+" : </label><textarea id='"+a.id+"' name='"+a.id+"' /></textarea>":"grid"==a.type?r+="<label>"+a.name+" : <a href='#' title='Add Grid' class='addgrid'>&nbsp;</a></label><ul class='buildgrid'><li class='gridlist span12' data-length='12'><div class='gridcounter'>12/12</div><div class='panelgrid'><a href='#' class='plusgrid' title='Increase Grid Width'>plus</a><a href='#' class='reducegrid' title='Reduce Grid Width'>reduce</a><a href='#' class='removegrid' title='Remove Grid'>remove</a></div></li></ul>":"select"==a.type?r+="<label>"+a.name+" : </label><select id='"+a.id+"' name='"+a.id+"'>"+o(a.option)+"</select>":"colorpicker"==a.type?r+="<label>"+a.name+" : <input class='pickcolor' id='"+a.id+"' value='"+a.color+"'/></label>":"checkbox"==a.type?r+="<label>"+a.name+" :  <input type='checkbox' class='checkbox' id='"+a.id+"' /></label>":"slider"==a.type&&(r+="<label>"+a.name+" :  </label><div class='type-range-wrapper'><input type='range' class='range' id='"+a.id+"' min='"+a.min+"' max='"+a.max+"' step='"+a.step+"' value='"+a.value+"' /><span class='range-value'>"+a.value+"</span></div>")}return r}(a);return t=e('<div><div class="jeg-dialog-form">'+c+'</div><div class="jeg-dialog-submit"><input type="button" id="exeCmd" class="button-primary alignright" value="Insert" /></div><div style="clear: both;"></div></div>').dialog({title:r,modal:!0,dialogClass:"j-dialog",resizable:!0,width:n,close:function(e,r){jQuery(this).html("").remove()},create:function(){var r=e(document),t=e(".pickcolor"),o=e(".type-range-wrapper"),a=e(".buildgrid");if(t.length&&t.each((function(){e(this).wpColorPicker()})),o.length&&o.each((function(){e(this).on("mousedown",(function(){var r=e(this),t=r.find("input").attr("value");r.mousemove((function(){var r=e(this);t=r.find("input").attr("value"),r.find(".range-value").text(t)}))}))})),a.length){var n=function(e){return'<li class="gridlist span'+e+'" data-length="'+e+'"><div class="gridcounter">'+e+'/12</div><div class="panelgrid"><a href="#" class="plusgrid" title="Increase Grid Width">plus</a> <a href="#" class="reducegrid" title="Reduce Grid Width">reduce</a> <a href="#" class="removegrid" title="Remove Grid">remove</a></div></li>'};e(".addgrid").on("click",(function(r){var t=e(".buildgrid > li").size();if(t<12){var o=function(e){for(var r="",t=Math.floor(12/e),o=0;o<e;o++)r+=n(t);return r}(t+1);a.html(o)}return!1})),r.on("click",".buildgrid .removegrid",(function(r){return e(this).closest(".gridlist").remove(),!1})),r.on("click",".buildgrid .reducegrid",(function(r){var t=e(this).closest(".gridlist"),o=parseInt(t.attr("data-length"));if(1==o)t.remove();else{var a=n(o-1);t.replaceWith(a)}return!1})),r.on("click",".buildgrid .plusgrid",(function(r){var t,o=e(this).closest(".gridlist"),a=parseInt(o.attr("data-length"));if(t=0,e(".buildgrid > li").each((function(){t+=parseInt(e(this).attr("data-length"),10)})),t<12){var c=n(a+1);o.replaceWith(c)}else alert("Remove or reduce other grid before increasing this grid size");return!1}))}}})}}(jQuery,wp.customize);