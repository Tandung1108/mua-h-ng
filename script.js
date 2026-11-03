'use strict';
// ===== Dữ liệu sản phẩm: [tên, danh mục, giá gốc, % giảm, emoji, đánh giá, đã bán] =====
const CATS = ['Tất cả','📱 Điện thoại','💻 Laptop','🎧 Âm thanh','⌚ Đồng hồ','🎮 Gaming','📷 Máy ảnh','🏠 Nhà thông minh','🔌 Phụ kiện'];
const RAW = [
 ['iPhone 17 Pro 256GB',1,34990000,8,'📱',4.9,5200],['Samsung Galaxy S26 Ultra',1,31990000,12,'📱',4.8,3800],
 ['Xiaomi 15T Pro',1,14990000,15,'📱',4.7,6100],['OPPO Find X9',1,22990000,10,'📱',4.6,1900],
 ['Google Pixel 10',1,19990000,9,'📱',4.7,980],['Galaxy Z Flip7',1,25990000,18,'📱',4.6,1500],
 ['MacBook Air M4 13"',2,27990000,7,'💻',4.9,2700],['Dell XPS 14',2,42990000,11,'💻',4.8,640],
 ['ASUS Zenbook S14',2,29990000,14,'💻',4.7,880],['Lenovo ThinkPad X1',2,38990000,6,'💻',4.8,520],
 ['HP Pavilion 15',2,15990000,20,'💻',4.4,3100],['iPad Pro M5 11"',2,28990000,5,'📲',4.9,1700],
 ['AirPods Pro 3',3,6490000,10,'🎧',4.9,8400],['Sony WH-1000XM6',3,8990000,16,'🎧',4.8,2300],
 ['Loa Bluetooth JBL Flip 7',3,3290000,25,'🔊',4.7,5600],['Tai nghe Galaxy Buds 4',3,3990000,22,'🎧',4.5,4300],
 ['Soundbar Samsung Q-Series',3,7990000,30,'🔊',4.6,760],['Micro thu âm Rode Wireless',3,5490000,12,'🎙️',4.7,430],
 ['Apple Watch Series 11',4,11990000,8,'⌚',4.8,3400],['Galaxy Watch 8',4,6990000,17,'⌚',4.6,2100],
 ['Garmin Forerunner 970',4,13990000,10,'⌚',4.8,540],['Xiaomi Band 10',4,1290000,20,'⌚',4.5,12000],
 ['PlayStation 5 Slim',5,13490000,9,'🎮',4.9,2900],['Nintendo Switch 2',5,11990000,5,'🕹️',4.9,3600],
 ['Chuột Logitech G Pro X',5,3190000,28,'🖱️',4.8,4100],['Bàn phím cơ Keychron Q1',5,4290000,15,'⌨️',4.8,1900],
 ['Màn hình LG UltraGear 27"',5,9490000,19,'🖥️',4.7,1100],['Ghế gaming Secretlab',5,12990000,12,'💺',4.6,310],
 ['Sony Alpha A7 IV',6,54990000,6,'📷',4.9,260],['Canon EOS R50',6,19990000,13,'📷',4.7,540],
 ['GoPro Hero 13',6,9990000,18,'📹',4.7,1300],['DJI Osmo Pocket 4',6,12990000,10,'📹',4.8,870],
 ['Camera an ninh Imou 2K',7,690000,35,'📹',4.5,9800],['Robot hút bụi Roborock S9',7,17990000,24,'🤖',4.8,1200],
 ['Đèn thông minh Philips Hue',7,1490000,20,'💡',4.6,3400],['Loa thông minh Echo Dot',7,1290000,30,'🔈',4.5,5200],
 ['Sạc nhanh Anker 140W',8,1490000,25,'🔌',4.8,9100],['Pin dự phòng 20.000mAh',8,690000,30,'🔋',4.7,15000],
 ['Cáp USB-C 240W',8,290000,40,'🧵',4.6,21000],['SSD di động Samsung T9 2TB',8,4490000,18,'💾',4.9,2600],
 ['Ốp lưng MagSafe',8,390000,35,'🛡️',4.4,13400],['Router WiFi 7 TP-Link',8,3990000,22,'📡',4.7,1700]
];
const GRADS = ['#6a5cff,#b18cff','#12c2e9,#7be0ff','#ff7a59,#ffb36b','#16c79a,#7af0c8','#ff5d9e,#ffa3c8','#2f80ed,#7ab3ff','#f7b733,#ffe27a'];
const PRODUCTS = RAW.map((r,i)=>({id:i+1,name:r[0],cat:r[1],old:r[2],sale:r[3],price:Math.round(r[2]*(100-r[3])/100/1000)*1000,emoji:r[4],rate:r[5],sold:r[6],grad:GRADS[i%GRADS.length]}));
const BANNERS = [
 {t:'Siêu sale iPhone 17',d:'Giảm đến 8% + tặng ốp MagSafe',e:'📱',bg:'#2a1b8f,#9b5cff',cat:1},
 {t:'Laptop mỏng nhẹ, pin 20 giờ',d:'Trả góp 0% cho sinh viên',e:'💻',bg:'#0b6fa4,#12c2e9',cat:2},
 {t:'Âm thanh đỉnh cao',d:'Tai nghe và loa giảm đến 30%',e:'🎧',bg:'#d6336c,#ff8fab',cat:3},
 {t:'Game thủ vào cuộc',d:'PS5, Switch 2 và gear gaming',e:'🎮',bg:'#0f9b6c,#6be3b0',cat:5}
];
// ===== Tiện ích =====
const $ = id => document.getElementById(id);
const money = n => n.toLocaleString('vi-VN') + '₫';
const store = {get:(k,d)=>{try{return JSON.parse(localStorage.getItem(k))??d}catch{return d}},set:(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch{}}};
let cart = store.get('tz_cart',{});            // {id: qty}
let user = store.get('tz_session',null);
let state = {cat:0,q:'',sort:''};
let authMode = 'login';
const FREE_SHIP = 500000;

function toast(msg){const t=document.createElement('div');t.className='toast';t.textContent=msg;$('toasts').append(t);setTimeout(()=>t.remove(),2400)}

// ===== Hiển thị sản phẩm =====
function cardHTML(p){
  const stars = '★'.repeat(Math.round(p.rate)) ;
  return `<article class="card">
    <span class="badge">-${p.sale}%</span>
    <div class="pic" style="background:linear-gradient(135deg,${p.grad})">${p.emoji}</div>
    <div class="info"><div class="name">${p.name}</div>
      <div class="meta"><span style="color:#f7a600">${stars}</span> ${p.rate} · Đã bán ${p.sold.toLocaleString('vi-VN')}</div>
      <div><span class="price">${money(p.price)}</span><span class="old">${money(p.old)}</span></div>
      <button class="add" onclick="addToCart(${p.id})">Thêm vào giỏ</button></div></article>`;
}
function renderGrid(){
  let list = PRODUCTS.filter(p=>(!state.cat||p.cat===state.cat)&&p.name.toLowerCase().includes(state.q));
  const s = {asc:(a,b)=>a.price-b.price,desc:(a,b)=>b.price-a.price,sale:(a,b)=>b.sale-a.sale,rate:(a,b)=>b.rate-a.rate}[state.sort];
  if(s) list.sort(s);
  $('listTitle').textContent = (state.cat?CATS[state.cat]:'Tất cả sản phẩm') + ` (${list.length})`;
  $('grid').innerHTML = list.length ? list.map(cardHTML).join('') : '<p class="empty">Không tìm thấy sản phẩm phù hợp. Hãy thử từ khóa khác.</p>';
}
function renderCats(){
  $('cats').innerHTML = CATS.map((c,i)=>`<button class="chip ${i===state.cat?'on':''}" onclick="setCat(${i})">${c}</button>`).join('');
}
function setCat(i){state.cat=i;renderCats();renderGrid();$('grid').scrollIntoView({block:'start'})}
function resetAll(){state={cat:0,q:'',sort:''};$('search').value='';$('sort').value='';renderCats();renderGrid();scrollTo(0,0)}
$('search').addEventListener('input',e=>{state.q=e.target.value.trim().toLowerCase();renderGrid()});
$('sort').addEventListener('change',e=>{state.sort=e.target.value;renderGrid()});

// ===== Banner tự chạy =====
let bi = 0, bt;
function showBanner(i){
  bi = i; const b = BANNERS[i];
  const s = $('slide'); s.style.animation='none'; void s.offsetWidth; s.style.animation='';
  s.style.background = `linear-gradient(120deg,${b.bg})`;
  s.innerHTML = `<div><h1>${b.t}</h1><p>${b.d}</p><button class="btn" onclick="setCat(${b.cat})">Mua ngay</button></div><div class="big">${b.e}</div>`;
  $('dots').innerHTML = BANNERS.map((_,k)=>`<i class="${k===i?'on':''}" onclick="showBanner(${k});startBanner()"></i>`).join('');
}
function startBanner(){clearInterval(bt);bt=setInterval(()=>showBanner((bi+1)%BANNERS.length),4500)}

// ===== Flash sale + đếm ngược =====
function renderFlash(){
  const top = [...PRODUCTS].sort((a,b)=>b.sale-a.sale).slice(0,8);
  $('flashRow').innerHTML = top.map(cardHTML).join('');
}
function tick(){
  const end = new Date(); end.setHours(23,59,59,999);
  let s = Math.max(0,Math.floor((end-new Date())/1000));
  const p = n=>String(n).padStart(2,'0');
  $('timer').textContent = `${p(Math.floor(s/3600))}:${p(Math.floor(s%3600/60))}:${p(s%60)}`;
}

// ===== Giỏ hàng =====
function saveCart(){store.set('tz_cart',cart);renderCart()}
function addToCart(id){
  cart[id]=(cart[id]||0)+1; saveCart();
  const b=document.querySelector('.cartbtn'); b.classList.remove('bump'); void b.offsetWidth; b.classList.add('bump');
  toast('Đã thêm "'+PRODUCTS[id-1].name+'" vào giỏ');
}
function changeQty(id,d){cart[id]+=d; if(cart[id]<=0) delete cart[id]; saveCart()}
function removeItem(id){delete cart[id];saveCart()}
function calc(){
  const sub = Object.entries(cart).reduce((t,[id,q])=>t+PRODUCTS[id-1].price*q,0);
  const ship = sub===0||sub>=FREE_SHIP ? 0 : 30000;
  return {sub,ship,total:sub+ship};
}
function renderCart(){
  const ids = Object.keys(cart);
  $('cartCount').textContent = Object.values(cart).reduce((a,b)=>a+b,0);
  $('cartItems').innerHTML = ids.length ? ids.map(id=>{const p=PRODUCTS[id-1];return `<div class="item">
    <div class="pic" style="background:linear-gradient(135deg,${p.grad})">${p.emoji}</div>
    <div><b>${p.name}</b><span class="price" style="font-size:.95rem">${money(p.price)}</span>
    <div class="qty"><button onclick="changeQty(${id},-1)" aria-label="Giảm">−</button><span>${cart[id]}</span><button onclick="changeQty(${id},1)" aria-label="Tăng">+</button></div></div>
    <button class="del" onclick="removeItem(${id})">Xóa</button></div>`}).join('')
    : '<p class="empty">Giỏ hàng đang trống.<br>Chọn sản phẩm bạn thích để thêm vào nhé!</p>';
  const c = calc();
  $('subtotal').textContent = money(c.sub);
  $('ship').textContent = c.ship ? money(c.ship) : (c.sub ? 'Miễn phí' : '0₫');
  $('total').textContent = money(c.total);
}
function toggleCart(on){closeAll(true);$('drawer').classList.toggle('on',on);$('overlay').classList.toggle('on',on)}
function closeAll(keep){
  document.querySelectorAll('.modal,.drawer').forEach(m=>m.classList.remove('on'));
  if(!keep) $('overlay').classList.remove('on');
}
function openModal(id){closeAll(true);$('overlay').classList.add('on');$(id).classList.add('on')}
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeAll()});

// ===== Đăng nhập / đăng ký / đăng xuất =====
function renderUser(){
  $('userBtn').textContent = user ? '👤 ' + user.name.split(' ').pop() : '👤 Đăng nhập';
  $('userBtn').onclick = user ? ()=>toast('Xin chào ' + user.name + '!') : openAuth;
  $('logoutBtn').hidden = !user;
}
function openAuth(){authTab('login');openModal('authModal')}
function authTab(m){
  authMode = m;
  $('tLogin').classList.toggle('on',m==='login'); $('tReg').classList.toggle('on',m==='reg');
  $('aName').hidden = m!=='reg';
  $('authSubmit').textContent = m==='login' ? 'Đăng nhập' : 'Tạo tài khoản';
  $('authErr').textContent = '';
}
function submitAuth(){
  const name=$('aName').value.trim(), email=$('aEmail').value.trim().toLowerCase(), pass=$('aPass').value;
  const users = store.get('tz_users',{}), err=$('authErr');
  if(!/^\S+@\S+\.\S+$/.test(email)) return err.textContent='Email chưa đúng định dạng.';
  if(pass.length<6) return err.textContent='Mật khẩu cần ít nhất 6 ký tự.';
  if(authMode==='reg'){
    if(!name) return err.textContent='Vui lòng nhập họ và tên.';
    if(users[email]) return err.textContent='Email này đã được đăng ký. Hãy đăng nhập.';
    users[email]={name,pass:btoa(unescape(encodeURIComponent(pass)))}; store.set('tz_users',users);
  } else {
    const u = users[email];
    if(!u || u.pass!==btoa(unescape(encodeURIComponent(pass)))) return err.textContent='Sai email hoặc mật khẩu. Nếu chưa có tài khoản, hãy đăng ký.';
  }
  user = {name: users[email].name, email}; store.set('tz_session',user);
  renderUser(); closeAll(); toast('Xin chào ' + user.name + '! 🎉');
  if(pendingCheckout){pendingCheckout=false;startCheckout()}
}
function logout(){user=null;store.set('tz_session',null);renderUser();toast('Bạn đã đăng xuất')}

// ===== Mua hàng =====
let pendingCheckout = false;
function startCheckout(){
  if(!Object.keys(cart).length) return toast('Giỏ hàng đang trống');
  if(!user){pendingCheckout=true;toast('Vui lòng đăng nhập để mua hàng');return openAuth()}
  $('pName').value = $('pName').value || user.name;
  $('payTotal').textContent = money(calc().total);
  $('payErr').textContent='';
  openModal('payModal');
}
function placeOrder(){
  const n=$('pName').value.trim(), ph=$('pPhone').value.trim(), ad=$('pAddr').value.trim();
  if(!n||!/^0\d{9}$/.test(ph.replace(/\s/g,''))||ad.length<8) return $('payErr').textContent='Vui lòng nhập tên, số điện thoại 10 số và địa chỉ đầy đủ.';
  const method=document.querySelector('input[name=pay]:checked').value, c=calc();
  const code='TZ'+Date.now().toString().slice(-7);
  const orders=store.get('tz_orders',[]); orders.push({code,email:user.email,items:cart,total:c.total,method,at:Date.now()}); store.set('tz_orders',orders);
  cart={}; saveCart();
  $('doneMsg').innerHTML = `Mã đơn <b>${code}</b> · ${money(c.total)}<br>${method}. Dự kiến giao trong 2 giờ.`;
  openModal('doneModal');
}

// ===== Khởi động =====
renderCats(); renderGrid(); renderFlash(); renderCart(); renderUser();
showBanner(0); startBanner(); tick(); setInterval(tick,1000);
