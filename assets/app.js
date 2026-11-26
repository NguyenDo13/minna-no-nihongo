/* Khung dùng chung của mọi bài. Dữ liệu từng bài nằm trong data.js */
var SEC={"vocab": "<section id=\"vocab\">\n<h2>Từ vựng</h2>\n<p class=\"sub\">Bấm vào ô nghĩa để xem khi đang ở chế độ ẩn. Đánh dấu ô vuông khi đã thuộc. Bấm 🔊 để nghe phát âm (dùng giọng đọc của thiết bị).</p>\n<div class=\"tools\"><div class=\"chips\" id=\"chips\"></div></div>\n<div class=\"tools\"><label><input type=\"checkbox\" id=\"hideM\"> Ẩn nghĩa để tự kiểm tra</label><span class=\"note\" id=\"cnt\"></span></div>\n<div class=\"tbl\" style=\"margin-top:10px\"><table id=\"vt\"><tbody></tbody></table></div>\n</section>", "fc": "<section id=\"fc\" hidden>\n<h2>Flashcard và gõ lại từ</h2>\n<p class=\"sub\">Mặc định học flashcard toàn bộ từ vựng, đổi bộ lọc để học nhóm khác. Bấm Test để gõ lại từ tiếng Nhật dựa trên nghĩa, trong bộ đang chọn. Cần bàn phím tiếng Nhật trên thiết bị. Nút nghe dùng giọng đọc của thiết bị.</p>\n<div class=\"tools\"><select id=\"fcg\" aria-label=\"Bộ từ\"></select><button class=\"go\" id=\"fcn\">Test</button></div>\n<div id=\"fcv\" style=\"margin-top:14px\"></div>\n</section>", "kw": "<section id=\"kw\" hidden>\n<h2>Hội thoại và shadowing</h2>\n<p class=\"sub\">Nghe rồi nhại theo ngay sau người nói. Bắt đầu ở tốc độ chậm, tăng dần. Bấm vào dòng đang ẩn để xem.</p>\n<div class=\"chips\" id=\"kt\"></div>\n<div class=\"card\">\n<audio id=\"au\" controls preload=\"auto\" style=\"width:100%\"></audio>\n<div class=\"chips\" style=\"margin-bottom:0\">\n<select id=\"ksp\" aria-label=\"Tốc độ\"><option value=\"0.7\">Tốc độ 0.7x</option><option value=\"0.85\">0.85x</option><option value=\"1\" selected>1x</option><option value=\"1.15\">1.15x</option></select>\n<button class=\"chip\" id=\"kp\">◀ Đoạn trước</button><button class=\"chip\" id=\"kn\">Đoạn sau ▶</button>\n<button class=\"chip\" id=\"kl\" aria-pressed=\"false\">Lặp đoạn</button><button class=\"chip\" id=\"ka\" aria-pressed=\"false\">Lặp cả bài</button>\n</div>\n<p class=\"note\" id=\"kinfo\" style=\"margin:8px 0 0\"></p>\n</div>\n<div class=\"tools\"><label><input type=\"checkbox\" id=\"kf\" checked> Furigana</label><label><input type=\"checkbox\" id=\"kj\"> Ẩn tiếng Nhật</label><label><input type=\"checkbox\" id=\"kv\"> Ẩn tiếng Việt</label></div>\n<div id=\"ks\" style=\"margin-top:12px\"></div>\n<p class=\"note\">Các đoạn được chia tự động theo quãng nghỉ trong âm thanh, nên có thể không trùng hẳn với từng câu. Bản dịch tiếng Việt do tôi soạn, bạn đối chiếu với giáo trình nhé.</p>\n</section>", "quiz": "<section id=\"quiz\" hidden>\n<h2>AI ra đề</h2>\n<p class=\"sub\">Chọn loại đề, mở AI để nó soạn đề từ nội dung bài này, rồi dán kết quả về đây để làm và chấm ngay. Không cần khóa API.</p>\n<div class=\"card\">\n<div class=\"chips\" style=\"margin-top:0\">\n<select id=\"qt\" aria-label=\"Loại đề\"><option value=\"mc\">Trắc nghiệm</option><option value=\"fill\">Điền chỗ trống (gõ)</option><option value=\"tr\">Dịch Việt → Nhật (gõ)</option></select>\n<select id=\"qsc\" aria-label=\"Phạm vi\"><option value=\"g\">Ngữ pháp</option><option value=\"v\">Từ vựng</option><option value=\"gv\">Cả hai</option></select>\n<select id=\"qn\" aria-label=\"Số câu\"><option value=\"5\">5 câu</option><option value=\"8\" selected>8 câu</option><option value=\"10\">10 câu</option></select>\n</div>\n<div class=\"chips\" id=\"qpl\"><button class=\"chip\" data-p=\"chatgpt\">Mở ChatGPT</button><button class=\"chip\" data-p=\"claude\">Mở Claude</button><button class=\"chip\" data-p=\"gemini\">Mở Gemini</button><button class=\"chip\" data-p=\"perplexity\">Mở Perplexity</button><button class=\"chip\" data-p=\"copy\">Chỉ sao chép prompt</button></div>\n<p class=\"note\" id=\"qmsg\" style=\"margin:0\" role=\"status\"></p>\n<details id=\"qpd\" style=\"margin-top:8px\"><summary class=\"note\">Xem prompt</summary><textarea id=\"qpr\" readonly rows=\"6\" style=\"margin-top:8px\"></textarea></details>\n</div>\n<div class=\"card\"><h3>Dán kết quả của AI</h3>\n<textarea id=\"qin\" rows=\"5\" placeholder=\"Dán mảng JSON mà AI trả về vào đây\" spellcheck=\"false\"></textarea>\n<div class=\"row\" style=\"justify-content:flex-start\"><button class=\"go\" id=\"qgo\">Tạo đề</button><button class=\"go alt\" id=\"qdef\">Dùng đề mẫu</button></div>\n<p class=\"msg no\" id=\"qerr\" hidden></p></div>\n<p class=\"sub\" id=\"score\"></p>\n<div id=\"qs\"></div>\n</section>"};
(function(){var L=window.LESSON,tabs=[["vocab","Từ vựng"],["fc","Flashcard"],["gram","Ngữ pháp"],["kw","Hội thoại & Shadowing"]],ex=L.extra||[];
ex.forEach(function(e){tabs.push([e.id,e.label])});tabs.push(["quiz","AI ra đề"]);
var h='<header><div class="wrap"><a class="back" href="../">‹ Tất cả bài</a><h1 class="jp">'+L.title+'</h1><p>'+L.sub+'</p><div class="bar" role="img" aria-label="Tiến độ '+L.n+' trên '+L.total+' bài"><i style="width:'+Math.round(L.n/L.total*100)+'%"></i></div><div class="cap">'+L.series+': bài '+L.n+' / '+L.total+'</div></div></header>';
h+='<nav><div class="wrap" role="tablist">'+tabs.map(function(t,i){return '<button role="tab" data-t="'+t[0]+'" aria-selected="'+(i==0)+'">'+t[1].replace("&","&amp;")+'</button>'}).join("")+'</div></nav><main class="wrap">';
h+=SEC.vocab+SEC.fc+'<section id="gram" hidden>'+L.gram+'</section>'+SEC.kw+ex.map(function(e){return '<section id="'+e.id+'" hidden>'+e.html+'</section>'}).join("")+SEC.quiz+'</main>';
document.title="Minna no Nihongo – Bài "+L.n;document.getElementById("app").innerHTML=h})();
var $=function(s){return document.querySelector(s)};
var st={};try{st=JSON.parse(localStorage.getItem("mnn"+LESSON.n)||"{}")}catch(e){}
function save(){try{localStorage.setItem("mnn"+LESSON.n,JSON.stringify(st));localStorage.setItem("mnn"+LESSON.n+"s",JSON.stringify([Object.keys(st).filter(function(k){return st[k]}).length,V.length]))}catch(e){}}
var flt="all";
function chips(){var h='<button class="chip" aria-pressed="'+(flt=="all")+'" data-f="all">Tất cả ('+V.length+')</button>';
for(var k in G){h+='<button class="chip" aria-pressed="'+(flt==k)+'" data-f="'+k+'">'+G[k][0]+'</button>'}$("#chips").innerHTML=h}
function rows(){var h="",n=0;V.forEach(function(v){if(st[v[1]])n++;if(flt!="all"&&flt!=v[0])return;
h+='<tr class="'+(st[v[1]]?"done":"")+'"><td class="k" style="--h:'+G[v[0]][1]+'"><b class="jp">'+v[1]+'</b>'+(v[2]?'<small class="jp">'+v[2]+'</small>':'')+'</td><td class="v">'+v[3]+'<span class="tag">'+G[v[0]][0]+'</span></td><td><button class="spk" data-say="'+v[1]+'" aria-label="Nghe">🔊</button></td><td><input type="checkbox" data-k="'+v[1]+'" aria-label="Đã thuộc"'+(st[v[1]]?" checked":"")+'></td></tr>'});
$("#vt tbody").innerHTML=h;$("#cnt").textContent="Đã thuộc "+n+" / "+V.length}
$("#chips").onclick=function(e){var f=e.target.dataset.f;if(f){flt=f;chips();rows()}};
$("#vt").onclick=function(e){var t=e.target;var sp=t.closest("button[data-say]");if(sp){say(sp.dataset.say);return}if(t.dataset.k){st[t.dataset.k]=t.checked;save();rows()}else{var c=t.closest("td.v");if(c)c.classList.toggle("show")}};
$("#hideM").onchange=function(){$("#vt").classList.toggle("hide",this.checked);rows()};
if($("#wt"))$("#wt").innerHTML=W.map(function(w){return '<tr><td class="k jp" style="--h:205"><b>'+w[0]+'</b></td><td>'+w[1]+'</td></tr>'}).join("");
if($("#rg"))$("#rg").innerHTML=R.map(function(r){return '<div class="wx"><b class="jp">'+r[0]+'</b><small>khu vực '+r[1]+'</small></div>'}).join("");
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function nj(s){return nz(String(s)).replace(/[。、．，！？!?.,]/g,"")}
var QS=[],qsc=0,qan=0;
function qload(l,t){QS=l;qsc=0;qan=0;$("#score").textContent=t+" Làm xong sẽ hiện kết quả.";
$("#qs").innerHTML=l.map(function(q,i){var h='<div class="card q" data-i="'+i+'"><h3 class="jp">'+(i+1)+'. '+esc(q.q)+'</h3>';
if(q.choices)h+=q.choices.map(function(o,j){return '<button class="opt jp" data-j="'+j+'">'+esc(o)+'</button>'}).join("");
else h+='<input class="ti jp" lang="ja" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Gõ đáp án tiếng Nhật"><button class="go" data-chk="1">Kiểm tra</button>';
return h+'<div class="why" hidden></div></div>'}).join("")}
function qdef(){qload(Q.map(function(q){return {q:q[0],choices:q[1],a:q[2],why:q[3]}}),"Đề mẫu (6 câu).")}
function qfin(c,ok,txt){c.dataset.done=1;qan++;if(ok)qsc++;var w=c.querySelector(".why");w.hidden=false;w.textContent=(ok?"Đúng. ":"Chưa đúng. ")+(txt||"");
$("#score").textContent=qan==QS.length?"Kết quả: "+qsc+" / "+QS.length+(qsc==QS.length?". Tuyệt vời!":". Xem lại phần ngữ pháp rồi làm lại nhé."):"Đã trả lời "+qan+" / "+QS.length}
$("#qs").onclick=function(e){var c=e.target.closest(".q");if(!c||c.dataset.done)return;var q=QS[c.dataset.i],b=e.target.closest(".opt");
if(b&&q.choices){var j=+b.dataset.j,a=+q.a;c.querySelectorAll(".opt").forEach(function(o,k){if(k==a)o.classList.add("ok")});if(j!=a)b.classList.add("no");qfin(c,j==a,q.why);return}
if(e.target.closest("[data-chk]")){var i=c.querySelector("input"),x=nj(i.value);if(!x)return;var acc=[].concat(q.a),ok=acc.some(function(s){return nj(s)==x});i.disabled=true;qfin(c,ok,(ok?"":"Đáp án: "+acc[0]+". ")+(q.why||""))}};
$("#qs").onkeydown=function(e){if(e.key=="Enter"&&!e.isComposing&&e.target.tagName=="INPUT"){var b=e.target.closest(".q").querySelector("[data-chk]");if(b)b.click()}};
function qparse(t){var a=t.indexOf("["),b=t.lastIndexOf("]");if(a<0||b<a)throw 0;var l=JSON.parse(t.slice(a,b+1));
l=l.filter(function(q){return q&&typeof q.q=="string"&&q.a!==undefined&&(!q.choices||(Array.isArray(q.choices)&&q.choices.length>1&&+q.a>=0&&+q.a<q.choices.length))});if(!l.length)throw 0;return l}
function qprompt(){var ty=$("#qt").value,n=$("#qn").value,sc=$("#qsc").value;
var T={mc:["trắc nghiệm 4 đáp án, mỗi câu đúng một đáp án",'{"q":"câu hỏi (chỗ trống ghi là ( ))","choices":["..","..","..",".."],"a":<số thứ tự đáp án đúng, bắt đầu từ 0>,"why":"giải thích ngắn bằng tiếng Việt"}'],
fill:["điền vào chỗ trống (người học gõ đáp án)",'{"q":"câu tiếng Nhật có một chỗ trống ( ), kèm gợi ý nghĩa tiếng Việt","a":["đáp án chính","các cách viết khác cũng đúng (kana/kanji)"],"why":"giải thích ngắn bằng tiếng Việt"}'],
tr:["dịch câu tiếng Việt sang tiếng Nhật (người học gõ đáp án)",'{"q":"câu tiếng Việt cần dịch","a":["bản dịch chính","các cách dịch/viết khác cũng đúng"],"why":"giải thích ngắn bằng tiếng Việt"}']}[ty];
var g=[].map.call(document.querySelectorAll("#gram .card"),function(c){return "- "+c.querySelector("h3").textContent+": "+c.querySelector(".fm").textContent.replace(/\s+/g," ").trim()}).join("\n");
var v=V.map(function(w){return w[1]+(w[2]?"（"+w[2]+"）":"")+" = "+w[3]}).join("\n");
var body=(sc!="v"?"NGỮ PHÁP:\n"+g+"\n\n":"")+(sc!="g"?"TỪ VỰNG:\n"+v:"");
return "Bạn là giáo viên tiếng Nhật (Minna no Nihongo sơ cấp, "+$("h1").textContent+"). Hãy soạn "+n+" câu "+T[0]+", chỉ dựa trên nội dung dưới đây, câu tiếng Nhật tự nhiên, độ khó sơ cấp. Chỉ trả về MỘT mảng JSON thuần, không markdown, không văn bản nào ngoài JSON. Mỗi phần tử có dạng: "+T[1]+"\n\n"+body.trim()}
var PL={chatgpt:["https://chatgpt.com/?q=","https://chatgpt.com/"],claude:["https://claude.ai/new?q=","https://claude.ai/new"],perplexity:["https://www.perplexity.ai/search?q=","https://www.perplexity.ai/"],gemini:[null,"https://gemini.google.com/app"]};
$("#qpl").onclick=function(e){var k=e.target.dataset.p;if(!k)return;var p=qprompt(),m=$("#qmsg");$("#qpr").value=p;
var auto=false;if(k!="copy"){var pre=PL[k][0],full=pre?pre+encodeURIComponent(p):"",url=full&&full.length<7500?full:PL[k][1];auto=url==full&&!!full;window.open(url,"_blank","noopener")}
var done=function(){m.textContent=auto?"Đã mở AI với prompt điền sẵn. Prompt cũng đã được sao chép; nếu ô chat đang trống, hãy dán vào.":k=="copy"?"Đã sao chép prompt. Dán vào ô chat của AI rồi gửi.":"Đã mở AI và sao chép prompt. Dán vào ô chat rồi gửi."};
var fail=function(){$("#qpd").open=true;m.textContent="Không sao chép tự động được. Hãy copy prompt trong mục “Xem prompt”."};
try{navigator.clipboard.writeText(p).then(done,fail)}catch(x){fail()}};
$("#qgo").onclick=function(){var er=$("#qerr");try{var l=qparse($("#qin").value);er.hidden=true;qload(l,"Đề từ AI ("+l.length+" câu).");$("#qs").scrollIntoView()}catch(x){er.hidden=false;er.textContent="Không đọc được đề. Hãy nhờ AI “chỉ trả về mảng JSON thuần” rồi dán lại."}};
$("#qdef").onclick=function(){$("#qerr").hidden=true;qdef()};
document.querySelector("nav").onclick=function(e){var t=e.target.dataset.t;if(!t)return;
document.querySelectorAll("nav button").forEach(function(b){b.setAttribute("aria-selected",b.dataset.t==t)});
document.querySelectorAll("main section").forEach(function(s){s.hidden=s.id!=t});window.scrollTo(0,0)};
var FB={};try{FB=JSON.parse(localStorage.getItem("mnn"+LESSON.n+"fc")||"{}")}catch(e){}
function fsave(){try{localStorage.setItem("mnn"+LESSON.n+"fc",JSON.stringify(FB))}catch(e){}}
var F={q:[],set:[],m:"idle",flip:0,wr:{},first:0,res:null,hint:0,val:""};
function nz(s){return s.replace(/[\s\u3000〜~]/g,"").replace(/\[[^\]]*\]/g,"")}
function say(t){try{var u=new SpeechSynthesisUtterance(t.replace(/\[[^\]]*\]/g,""));u.lang="ja-JP";speechSynthesis.cancel();speechSynthesis.speak(u)}catch(e){}}
function shuf(a){return a.sort(function(){return Math.random()-.5})}
function fcInit(){var h='<option value="all">Tất cả từ</option><option value="todo">Từ chưa đánh dấu thuộc</option>';for(var k in G)h+='<option value="'+k+'">'+G[k][0]+'</option>';$("#fcg").innerHTML=h;fcStart()}
function fcPool(){var g=$("#fcg").value;return V.filter(function(v){return g=="all"||(g=="todo"?!st[v[1]]:v[0]==g)})}
function fcStart(){var p=fcPool();
if(!p.length){F.m="idle";$("#fcv").innerHTML='<div class="card note">Không có từ nào trong bộ này.</div>';fcBtn();return}
p=shuf(p).sort(function(a,b){return (FB[a[1]]||0)-(FB[b[1]]||0)});
F.set=p.slice();F.q=p.slice();F.m="card";F.flip=0;F.wr={};F.first=0;F.res=null;F.hint=0;F.val="";fcv()}
function fcBtn(){$("#fcn").textContent=(F.m=="type"||F.m=="done")?"Flashcard":"Test"}
function fcTest(){var p=fcPool();if(!p.length){F.m="idle";$("#fcv").innerHTML='<div class="card note">Không có từ nào trong bộ này.</div>';fcBtn();return}
F.set=p.slice();F.q=shuf(p.slice());F.m="type";F.wr={};F.first=0;F.res=null;F.hint=0;F.val="";fcv()}
function fcv(){var v=F.q[0],h="",r=F.res;
if(F.m=="idle")h='<div class="card note">Chọn bộ từ để bắt đầu.</div>';
else if(F.m=="card")h='<p class="note">Thẻ còn lại: '+F.q.length+'</p><div class="card fcc" data-a="flip"><div class="big jp">'+(v[2]||v[1])+'</div>'+(F.flip?'<div class="jp" style="font-size:1.3rem">'+v[1]+'</div><div>'+v[3]+'</div>':'<div class="note">Bấm vào thẻ để lật</div>')+'</div><div class="row"><button class="go alt" data-a="say">🔊 Nghe</button>'+(F.flip?'<button class="go alt" data-a="again">Chưa nhớ</button><button class="go" data-a="know">Đã nhớ</button>':'')+'</div>';
else if(F.m=="ready")h='<div class="card fcc"><div class="big">Xong vòng thẻ</div><div class="note">Giờ gõ lại '+F.set.length+' từ vừa học dựa trên nghĩa.</div><div class="row"><button class="go" data-a="typ">Bắt đầu gõ lại</button></div></div>';
else if(F.m=="type")h='<p class="note">Còn lại: '+F.q.length+' từ</p><div class="card"><h3>'+v[3]+'</h3><span class="tag" style="--h:'+G[v[0]][1]+'">'+G[v[0]][0]+'</span><input class="ti jp" id="fci" lang="ja" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Gõ từ tiếng Nhật (kana hoặc kanji)"'+(r?' disabled':'')+'>'+(F.hint&&!r?'<p class="note">Gợi ý: bắt đầu bằng 「'+v[1].charAt(0)+'」, '+nz(v[1]).length+' chữ kana</p>':'')+(r?'<p class="msg '+(r.ok?'ok':'no')+'">'+(r.ok?'Chính xác!':'Chưa đúng. Đáp án: <span class="jp">'+(v[2]?v[2]+'（'+v[1]+'）':v[1])+'</span>')+'</p>':'')+'<div class="row">'+(r?'<button class="go" data-a="next">Tiếp tục</button>':'<button class="go alt" data-a="hint">Gợi ý</button><button class="go" data-a="chk">Kiểm tra</button>')+'</div></div>';
else{var bad=F.set.filter(function(w){return F.wr[w[1]]}).map(function(w){return w[2]||w[1]}).join("、");h='<div class="card fcc"><div class="big">'+F.first+' / '+F.set.length+'</div><div class="note">từ gõ đúng ngay lần đầu</div>'+(bad?'<div class="jp">Cần ôn lại: '+bad+'</div>':'')+'<div class="row"><button class="go" data-a="new">Học lại thẻ</button></div></div>'}
$("#fcv").innerHTML=h;fcBtn();
if(F.m=="type"){var i=$("#fci");if(i){i.value=F.val||"";if(!r)i.focus()}}}
$("#fcn").onclick=function(){if(F.m=="type"||F.m=="done")fcStart();else fcTest()};$("#fcg").onchange=fcStart;
$("#fcv").onclick=function(e){var b=e.target.closest("[data-a]");if(!b)return;var a=b.dataset.a,v=F.q[0],k=v&&v[1];
if(a=="flip")F.flip=1;
else if(a=="say"){say(v[1]);return}
else if(a=="know"||a=="again"){FB[k]=a=="know"?Math.min((FB[k]||0)+1,3):0;fsave();F.q.shift();if(a=="again")F.q.push(v);F.flip=0;if(!F.q.length)F.m="ready"}
else if(a=="typ"){F.q=shuf(F.set.slice());F.m="type";F.wr={};F.first=0;F.res=null;F.hint=0;F.val=""}
else if(a=="hint"){F.hint=1;F.val=$("#fci").value}
else if(a=="chk"){var raw=$("#fci").value,x=nz(raw);if(!x)return;F.val=raw;var ok=x==nz(v[1])||(v[2]&&x==nz(v[2]));F.res={ok:!!ok};
if(!ok){F.wr[k]=1;FB[k]=0}else if(!F.wr[k]){F.first++;FB[k]=Math.min((FB[k]||0)+1,3)}fsave()}
else if(a=="next"){if(F.res.ok)F.q.shift();else F.q.push(F.q.shift());F.res=null;F.hint=0;F.val="";if(!F.q.length)F.m="done"}
else if(a=="new"){fcStart();return}
fcv()};
$("#fcv").onkeydown=function(e){if(e.key=="Enter"&&!e.isComposing&&F.m=="type"){var b=$("#fcv [data-a="+(F.res?"next":"chk")+"]");if(b)b.click()}};
var kc=KT[0][0],seg=[],L=0,au=$("#au");
function fur(s){return s.replace(/\{([^|}]+)\|([^}]+)\}/g,"<ruby>$1<rt>$2</rt></ruby>")}
function kr(k){kc=k;seg=SG[k];L=0;au.src=AU[k];au.playbackRate=+$("#ksp").value;
$("#kt").innerHTML=KT.map(function(t){return '<button class="chip" aria-pressed="'+(t[0]==k)+'" data-k="'+t[0]+'">'+t[1]+'</button>'}).join("");
$("#ks").innerHTML='<h3 class="jp" style="margin:0 0 6px">'+KS[k].t+'</h3>'+KS[k].l.map(function(l){return '<div class="ex"><b class="sp jp">'+l[0]+'</b><div class="jp jl">'+fur(l[1])+'</div><span class="vl">'+l[2]+'</span></div>'}).join("");
$("#kinfo").textContent="Có "+seg.length+" đoạn nghe trong bài này."}
function ksi(t){for(var i=seg.length-1;i>=0;i--)if(t>=seg[i][0]-.05)return i;return 0}
function kgo(i){i=Math.max(0,Math.min(seg.length-1,i));L=i;au.currentTime=seg[i][0];au.play();$("#kinfo").textContent="Đoạn "+(i+1)+" / "+seg.length}
function kpress(id,v){var b=$(id);b.setAttribute("aria-pressed",v)}
$("#kt").onclick=function(e){var k=e.target.dataset.k;if(k)kr(k)};
$("#ksp").onchange=function(){au.playbackRate=+this.value};
$("#kp").onclick=function(){var i=ksi(au.currentTime);kgo(au.currentTime-seg[i][0]>.7?i:i-1)};
$("#kn").onclick=function(){kgo(ksi(au.currentTime)+1)};
$("#kl").onclick=function(){var on=this.getAttribute("aria-pressed")!="true";kpress("#kl",on);if(on){L=ksi(au.currentTime);kpress("#ka",false);au.loop=false}};
$("#ka").onclick=function(){var on=this.getAttribute("aria-pressed")!="true";kpress("#ka",on);au.loop=on;if(on)kpress("#kl",false)};
au.ontimeupdate=function(){if($("#kl").getAttribute("aria-pressed")=="true"&&seg[L]&&au.currentTime>seg[L][1]){au.currentTime=seg[L][0]}};
$("#kf").onchange=function(){$("#ks").classList.toggle("nofur",!this.checked)};
$("#kj").onchange=function(){$("#ks").classList.toggle("hj",this.checked)};
$("#kv").onchange=function(){$("#ks").classList.toggle("hv",this.checked)};
$("#ks").onclick=function(e){var x=e.target.closest(".ex");if(x)x.classList.toggle("rv")};

fcInit();
kr(KT[0][0]);
chips();rows();qdef();

save();try{localStorage.setItem("mnnlast",LESSON.n)}catch(e){}
