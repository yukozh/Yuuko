function LoadFromCollectionPort(t){if((null==$("[data-collection='"+t+"']").attr("data-method")||"insert"!=$("[data-collection='"+t+"']").attr("data-method"))&&(null==CollectionLocks[t]&&(CollectionLocks[t]=!1),!CollectionLocks[t])){CollectionLocks[t]=!0,"flow"==$("[data-collection='"+t+"']").attr("data-expression")&&(null==Collection[t]?Collection[t]={p:0}:null==Collection[t].p&&(Collection[t].p=0));try{CollectionEvents[t].onLoading()}catch(o){}$.getJSON("/yuuko/gets/"+t,Collection[t],function(o){if(0!=o.length)$("[data-collection='"+t+"']").unbind().each(function(){for(var e=$(this).find(".template."+t.toLocaleLowerCase()),l=$(this).attr("data-identifier"),a=0;a<o.length;a++){var i=$(e)[0].outerHTML.toString();for(var n in o[a])"undefined"!=typeof n&&(i=i.replaceAll("\\$"+t+"."+n,o[a][n]));var c=$(i);null!=o[a][l]&&c.attr("id",t.toLocaleLowerCase()+"-collection-"+o[a][l]),c.removeClass(t.toLocaleLowerCase()),c.removeClass("template");for(var n in o[a])if("undefined"!=typeof n){if(null==c.find("[data-field='"+t+"."+n+"']").val())try{c.find("[data-field='"+t+"."+n+"']").val(o[a][n].toString())}catch(d){}try{c.find("[data-field='"+t+"."+n+"']").text(o[a][n].toString())}catch(d){}try{c.find("[data-field='"+t+"."+n+"']").html(o[a][n].toString())}catch(d){}if(c.attr("data-field")==t+"."+n){if(null==c.val())try{c.val(o[a][n].toString())}catch(d){}if(null==c.attr("data-collection")&&null==c.attr("data-detail")){try{c.text(o[a][n].toString())}catch(d){}try{c.html(o[a][n].toString())}catch(d){}}}}$(this).append(c)}CollectionLocks[t]=!1;try{CollectionEvents[t].onLoaded()}catch(d){}});else{CollectionLocks[t]=!0;try{CollectionEvents[t].onEmptyCollection()}catch(e){}}})}}function CollectionPageTo(t,o){null==Collection[t]&&(Collection[t]={},Collection[t].p=0),null==Collection[t].p&&(Collection[t].p=0),Collection[t].p=o,$("[data-collection='"+t+"']").unbind().each(function(){var o=$(this).children(".template."+t).clone();$(this).html(""),$(this).append(o)}),LoadFromCollectionPort(t,o)}function CollectionFlowNext(t){null==Collection[t]?(Collection[t]={},Collection[t].p=0):null==Collection[t].p?Collection[t].p=0:Collection[t].p++,LoadFromCollectionPort(t,Collection[t].p)}function ResetCollectionPort(t){CollectionLocks[t]=!1,Collection[t]={},$("[data-collection='"+t+"']").unbind().each(function(){var o=$(this).find(".template."+t).clone();$(this).html(""),$(this).append(o)})}function LoadFromDetailPort(t){if(null==DetailLocks[t]&&(DetailLocks[t]=!1),!DetailLocks[t]){DetailLocks[t]=!0;try{DetailEvents[t].onLoading()}catch(o){}$.getJSON("/yuuko/gets/"+t,{k:Detail[t]},function(o){var e=DetailTemplates[t].toString();for(var l in o)"undefined"!=typeof l&&(e=e.replaceAll("\\$"+t+"."+l,o[l]));e=$(e),$("[data-detail='"+t+"']")[0].outerHTML=e[0].outerHTML,e=$("[data-detail='"+t+"']");for(var l in o)if("undefined"!=typeof l){try{e.find("select[data-field='"+t+"."+l+"']").append($("<option>Current</option>").val(o[l]))}catch(a){}try{e.find("[data-field='"+t+"."+l+"']").val(o[l].toString())}catch(a){}if(null==e.find("[data-field='"+t+"."+l+"']").attr("data-collection")&&null==e.find("[data-field='"+t+"."+l+"']").attr("data-detail")){try{e.find("[data-field='"+t+"."+l+"']").text(o[l].toString())}catch(a){}try{e.find("[data-field='"+t+"."+l+"']").html(o[l].toString())}catch(a){}}}DetailLocks[t]=!1;try{DetailEvents[t].onLoaded()}catch(a){}})}}function DetailKeyTo(t,o){Detail[t]=o,DetailLocks[t]=!1,LoadFromDetailPort(t)}function EditPort(t){try{DetailEvents[t].onEditing()}catch(o){}$("[data-detail='"+t+"']").unbind().each(function(){if(null!=$(this).attr("data-method")&&"edit"==$(this).attr("data-method")){var o={k:Detail[t],YuukoToken:YuukoToken};$(this).find("[data-field]").each(function(){$(this).attr("data-field").indexOf(t+".")>=0&&null!=$(this).val()&&(o[$(this).attr("data-field").replace(t+".","")]=$(this).val())}),$.post("/yuuko/sets/"+t+"/edit",o,function(o){try{DetailEvents[t].onEdited(t,o)}catch(e){}})}})}function DeletePort(t,o){try{DetailEvents[t].onDeleting()}catch(e){}$.post("/yuuko/sets/"+t+"/delete",{k:o,YuukoToken:YuukoToken},function(e){try{DetailEvents[t].onDeleted(o,e)}catch(l){}})}function InsertPort(t){try{DetailEvents[t].onInserting()}catch(o){}$("[data-detail='"+t+"']").unbind().each(function(){if(null!=$(this).attr("data-method")&&"insert"==$(this).attr("data-method")){var o={YuukoToken:YuukoToken};$(this).find("[data-field]").each(function(){$(this).attr("data-field").indexOf(t+".")>=0&&null!=$(this).val()&&(o[$(this).attr("data-field").replace(t+".","")]=$(this).val())}),$.post("/yuuko/sets/"+t+"/insert",o,function(o){try{DetailEvents[t].onInserted(o)}catch(e){}})}})}var Collection={},CollectionLocks={},CollectionEvents={},Detail={},DetailLocks={},DetailEvents={},DetailTemplates={};String.prototype.replaceAll=function(t,o){return this.replace(new RegExp(t,"gm"),o)},$(window).scroll(function(){totalheight=parseFloat($(window).height())+parseFloat($(window).scrollTop()),$(document).height()<=totalheight&&$("[data-expression='flow']").unbind().each(function(){CollectionFlowNext($(this).attr("data-collection"))})}),$(document).ready(function(){$("[data-detail]").unbind().each(function(){(null==$(this).attr("data-method")||"insert"!=$(this).attr("data-method"))&&(DetailTemplates[$(this).attr("data-detail")]=$(this)[0].outerHTML,LoadFromDetailPort($(this).attr("data-detail")))}),$("[data-collection]").unbind().each(function(){LoadFromCollectionPort($(this).attr("data-collection"))})});