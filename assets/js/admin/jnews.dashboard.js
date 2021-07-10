!function(t){"use strict";function i(){var i=t(".jnews-plugin-item .jnews-item-button > .button");i.off("click"),i.on("click",(function(i){i.preventDefault();var s=t(this),n=t(".jnews-install-plugin-body"),o=s.closest(".jnews-plugin-item"),a=o.find(".jnews-action-notice"),l=o.find(".nonce").val(),r=o.data("id"),d=o.data("path"),p=t('<i class="fa fa-refresh fa-spin fa-3x fa-fw"></i>'),c=!1,h="";n.hasClass("loading")||(n.addClass("loading"),o.addClass("active"),a.removeClass("expanded").fadeOut(),s.prepend(p),o.hasClass("plugin-installed")?h="activate":o.hasClass("plugin-activated")?h="deactivate":o.hasClass("plugin-not-installed")?h="install":o.hasClass("plugin-need-update")&&(h="update",o.hasClass("activated")&&(c=!0)),o.find(".progress-line").width("10%"),e(o,l,r,d,h,c,"plugin-installed",1))}))}function e(i,s,n,o,a,l,r,d){var p=i.find(".jnews-action-notice"),c=t('input[name="jnews-ajax-plugin-error-notice"]').val();t.ajax({url:ajaxurl,type:"post",data:{action:"jnews_ajax_install_plugin",slug:n,path:o,doing:a,step:r,active:l,nonce:s},timeout:6e4}).done((function(t){d++,"install"!=a&&"update"!=a||(t=t.match(/\{"(?:[^{}]|)*\"}/),t=JSON.parse(t[0]),o=t.path,a="activate"),t.status>0?(i.find(".progress-line").width(20*d+"%"),e(i,s,n,o,a,l,t.step,d)):(0==t.status&&(t.refresh&&window.location.replace(jnewsoption.plugin_admin),"activate"==a?i.removeClass("plugin-installed plugin-not-installed plugin-need-update"):"deactivate"==a&&i.removeClass("plugin-activated"),p.hasClass("warning")&&p.removeClass("warning").addClass("success"),i.data("path",t.path),i.addClass(t.add_class),i.find(".jnews-item-description").html(t.description)),t.status<0&&p.removeClass("success").addClass("warning"),h(i,p,t.notice))})).fail((function(t){p.removeClass("success").addClass("warning"),h(i,p,c)}));var h=function(i,e,s){var n=i.find(".progress-line");n.width("100%"),setTimeout((function(){t(".jnews-install-plugin-body").removeClass("loading"),i.removeClass("active"),i.find(".vp-button .fa").remove(),n.width(0),i.find(".jnews-action-notice > span").html(s),i.do_action_notice()}),500)}}var s,n;function o(){t(".jnews-video-documentation").length&&(!function(){if("undefined"==typeof YT||void 0===YT.Player){var t=document.createElement("script");t.src="https://www.youtube.com/iframe_api";var i=document.getElementsByTagName("script")[0];i.parentNode.insertBefore(t,i),window.onYouTubePlayerAPIReady=function(){a()}}else a()}(),t(".video-wrapper .video-item").on("click",(function(i){i.preventDefault();var e=t(this).data("video");r(e),function(i){s&&n!=i&&(s.loadVideoById(i),n=i,t("html, body").animate({scrollTop:t(".jnews-video-documentation").offset().top},300))}(e)})))}function a(){var i=t(".video-container-holder").get(0);s=new YT.Player(i,{videoId:l(),playerVars:{controls:1,showinfo:0,rel:0,showsearch:0,iv_load_policy:3}})}function l(){var i=t(".video-item").first();return r(n=t(i).data("video")),n}function r(i){t(".video-wrapper .video-item").removeClass("video-active"),t(".video-wrapper .video-item[data-video='"+i+"']").addClass("video-active")}window.jnews.import={steps:[],step_index:0,step_total:0,$parent:null,init:function(){this.cache_dom(),this.bind_event()},objKeys:function(t,i){var e=[],s=[],n={},o=0,a=0;for(var l in void 0!==i&&(this.objKeys(t).forEach((function(t){e.push(t)})),a=e.length,e=[]),t)Object.prototype.hasOwnProperty.call(t,l)&&(void 0!==i?(n[l]=t[l],(0!==++o&&o%i==0||o%i!=0&&o==a)&&(s.push(n),n={})):e.push(l));return void 0!==i&&e.push(s),e},load_content:function(i,e){for(var s=this,n=function(t){var i=document.createElement("textarea");return i.innerHTML=t,0===i.childNodes.length?"":i.childNodes[0].nodeValue},o=0;o<i;o++)s.objKeys(jnewsdemo.list,e).forEach((function(i,e){var o=t("<div></div>").insertBefore(".jnews-required-plugin-list .jeg_block_navigation"),a=i;o.addClass("jnews-row"),o.addClass("loaded"),s.objKeys(a[0]).forEach((function(t){var i={id:n(jnewsdemo.list[t].id),image:n(jnewsdemo.list[t].image),name:n(jnewsdemo.list[t].name),demo:n(jnewsdemo.list[t].demo),category:n(jnewsdemo.list[t].category),category_slug:n(jnewsdemo.list[t]["category-slug"]),support:jnewsdemo.list[t].support,installed_style:n(jnewsdemo.installed_style)},e=wp.template("jnews-demo-item")(i);o.append(e),delete jnewsdemo.list[i.id]})),0===s.objKeys(jnewsdemo.list).length&&s.$btn_load_more.remove()}))},load_more:function(t){t&&t.preventDefault();var i=this;i.$btn_load_more.hasClass("disabled")||(i.loading&&clearTimeout(i.loading),i.$btn_load_more.text(i.$btn_load_more.data("loading")),i.loading=setTimeout((function(){i.load_content(4,3),i.$btn_load_more.text(i.$btn_load_more.data("load")),i.init()}),500))},auto_load:function(){var t=this;t.$btn_load_more.waypoint((function(){t.load_more(),Waypoint.destroyAll()}),{offset:"100%",context:window})},cache_dom:function(){this.$btn_load_more=t(".jnews-required-plugin-list .jeg_block_loadmore a"),this.$btn_import=t(".button-import"),this.$btn_uninstall=t(".button-uninstall"),this.$items=t(".jnews-item"),this.activate_license=t(".license-plugin-notice"),this.install_notice=t(".install-plugin-notice").html(),this.uninstall_notice=t(".uninstall-plugin-notice").html(),this.finish_install_notice=t(".finish-install-plugin-notice").html(),this.finish_uninstall_notice=t(".finish-uninstall-plugin-notice").html()},bind_event:function(){this.$btn_load_more.off("click"),this.$btn_import.off("click"),this.$btn_uninstall.off("click"),"undefined"!=typeof jnewsdemo&&(this.$btn_load_more.on("click",this.load_more.bind(this)),this.auto_load()),this.$btn_import.on("click",this.import_install.bind(this)),this.$btn_uninstall.on("click",this.import_uninstall.bind(this))},set_import_parameter:function(i,e){this.$parent=t(i).closest(".jnews-item"),this.$progress_line=this.$parent.find(".progress-line"),this.$text_progress=this.$parent.find(".progress-text span"),this.import_id=this.$parent.data("id"),this.nonce=this.$parent.find(".nonce").val(),this.include_content=this.$parent.find('[name="include-content"]').prop("checked"),this.builder_content=this.$parent.find('[name="builder-content"]').prop("checked"),this.include_plugin=this.$parent.find('[name="install-plugin"]').prop("checked"),this.finish_text=this.$parent.find(".progress-text").data("finish"),this.import_type=e,this.license=!!jnewsoption&&jnewsoption.import_track.license},set_import_step:function(t,i){"check_step"===t&&(this.steps=i.steps,this.step_total=i.steps.length+1,this.step_index=0)},clear_import_parameter:function(){this.steps=[],this.step_total=0,this.step_index=0},finish_install:function(){vex.dialog.alert({message:this.finish_install_notice,showCloseButton:!1})},finish_uninstall:function(){vex.dialog.alert({message:this.finish_uninstall_notice,showCloseButton:!1})},import_install:function(t){t.preventDefault();var i=this;i.set_import_parameter(t.target,"install");var e=i.import_id,s=i.license;i.clear_import_parameter(),s||"default"===e?vex.dialog.confirm({message:this.install_notice,showCloseButton:!1,callback:function(e){e&&(i.set_import_parameter(t.target,"install"),i.import_flag("installing"),i.import_step("check_step"))}}):this.activate_license_popup()},import_uninstall:function(t){t.preventDefault();var i=this;vex.dialog.confirm({message:this.uninstall_notice,showCloseButton:!1,callback:function(e){e&&(i.set_import_parameter(t.target,"uninstall"),i.import_flag("installing"),i.import_step("check_step"))}})},import_flag:function(i){var e=this;this.$items.each((function(){t(this).data("id")===e.import_id?t(this).addClass(i):(e.$btn_load_more.addClass("disabled"),t(this).addClass("disabled"))}))},ajax_error:function(t,i,e){"error"===i?alert(e.toString()):"timeout"===i&&alert("Execution Timeout")},ajax_success:function(t,i){this.set_import_step(t,i),this.step_index+=1;var e=this.steps[this.step_index-1];if(void 0!==e&&void 0===e.items&&"elementor_setting"===e.id&&this.builder_content&&(this.step_index+=1,e=this.steps[this.step_index-1]),1==i.response?(this.change_progress_text(),this.update_progress(),void 0!==e&&(void 0!==e.items?this.import_item(0):this.import_step(e.id))):(this.finish_import(),this.clear_import_parameter()),this.step_index===this.step_total){var s=this;this.step_index+=1,this.$text_progress.text(this.finish_text),this.update_progress(),setTimeout((function(){s.finish_import()}),1e3)}},ajax_import_item_success:function(t,i){var e=this.steps[this.step_index-1];"plugin"!=e.id&&"related_plugin"!=e.id||"install"!=this.import_type||(i={response:1});var s=this.steps[this.step_index-1].text+" ( "+(t+1)+" ) ";this.$text_progress.text(s),this.import_item(++t,i)},finish_import:function(){this.$items.removeClass("disabled").removeClass("installing").removeClass("imported"),this.$btn_load_more.removeClass("disabled"),this.$progress_line.width(0),this.$text_progress.text(""),this.clear_import_parameter(),"install"===this.import_type?(this.$parent.addClass("imported"),this.finish_install()):(this.$parent.removeClass("imported"),this.finish_uninstall())},import_item:function(i,e){var s=this.steps[this.step_index-1],n=s.items,o="jnews_ajax_import_item";i>=s.items.length?this.ajax_success(s.id,e):("plugin"!=s.id&&"related_plugin"!=s.id||(o="jnews_ajax_install_item"),t.ajax({url:ajaxurl,type:"post",data:{action:o,nonce:this.nonce,id:this.import_id,type:this.import_type,builder:this.builder_content,step:s.id,key:n[i]},timeout:36e5,error:this.ajax_import_item_success.bind(this,i),success:this.ajax_import_item_success.bind(this,i)}))},import_step:function(i){this.license||"default"===this.import_id?t.ajax({url:ajaxurl,type:"post",data:{action:"jnews_ajax_import_content",nonce:this.nonce,content:this.include_content,plugin:this.include_plugin,id:this.import_id,type:this.import_type,step:i},timeout:36e5,error:this.ajax_error.bind(this),success:this.ajax_success.bind(this,i)}):this.activate_license_popup()},activate_license_popup:function(){vex.dialog.alert({message:this.activate_license.html(),showCloseButton:!1,buttons:[t.extend({},vex.dialog.buttons.YES,{text:this.activate_license.attr("data-btn")})],callback:function(t){t&&jnewsoption&&window.location.replace(jnewsoption.jnews_dashboard)}})},change_progress_text:function(){0!==this.step_index&&void 0!==this.steps[this.step_index-1]&&this.$text_progress.text(this.steps[this.step_index-1].text)},update_progress:function(){var t=this.step_index/this.step_total*100;this.$progress_line.width(t+"%")},import_track:function(){jnewsoption&&(jnewsoption.import_track.demo=this.import_id,jnewsoption.import_track.install_plugin=this.include_plugin,this.include_content||(jnewsoption.import_track.import_type="style"),t.ajax({url:"https://support.jegtheme.com/wp-admin/admin-ajax.php",type:"post",data:{action:"do_track",url:jnewsoption.import_track.url,license:jnewsoption.import_track.license?1:0,data_license:jnewsoption.import_track.data_license,demo:jnewsoption.import_track.demo,import_type:jnewsoption.import_track.import_type,install_plugin:jnewsoption.import_track.install_plugin?1:0}}))}},t((function(){var e;t(".debug-report").on("click",(function(i){var e=t(this);i.preventDefault(),e.find("textarea").focus().select(),document.execCommand("copy"),e.do_action_notice()})),function(){if(window.location.hash){var i=window.location.hash.substring(1),e=t(".jnews-plugin-item[data-id='"+i+"']");e.length&&t("html, body").animate({scrollTop:e.offset().top-40})}}(),i(),t("#accordion").accordion({heightStyle:"content"}),(e=t(".plugin-need-update")).length&&e.each((function(){var i=t(this).parent().attr("aria-labelledby");t("h3#"+i).find("span.flag.update").addClass("active")})),o(),jnews.import.init()}))}(jQuery);