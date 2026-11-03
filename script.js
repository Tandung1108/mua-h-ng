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
 ['Ốp lưng MagSafe',8,390000,35,'🛡️',4.4,13400],['Router WiFi 7 TP-Link',8,3990000,22,'📡',4.7,1700],
 // --- Điện thoại ---
 ['iPhone 17 Air',1,28990000,7,'📱',4.7,1400],['Samsung Galaxy A57',1,9990000,16,'📱',4.5,7200],
 ['Xiaomi Redmi Note 15 Pro',1,7490000,14,'📱',4.6,9400],['realme GT 8 Pro',1,16990000,20,'📱',4.6,1300],
 // --- Laptop ---
 ['MacBook Pro M5 14"',2,44990000,6,'💻',4.9,980],['Acer Nitro V 16',2,22990000,17,'💻',4.5,2100],
 ['MSI Katana 15',2,26990000,15,'💻',4.6,1250],['Microsoft Surface Laptop 7',2,31990000,9,'💻',4.7,420],
 // --- Âm thanh ---
 ['Bose QuietComfort Ultra',3,9490000,14,'🎧',4.8,1600],['Loa Marshall Emberton III',3,4990000,18,'🔊',4.7,2300],
 ['Tai nghe Sony WF-1000XM6',3,6990000,12,'🎧',4.8,2700],['Loa Harman Kardon Onyx 9',3,8990000,21,'🔊',4.6,540],
 // --- Đồng hồ ---
 ['Apple Watch Ultra 3',4,22990000,6,'⌚',4.9,1200],['Huawei Watch GT 6',4,5990000,15,'⌚',4.6,2400],
 ['Amazfit Balance 2',4,5490000,22,'⌚',4.5,1800],['Pixel Watch 4',4,9990000,10,'⌚',4.7,610],
 ['Coros Pace 4',4,5990000,12,'⌚',4.7,730],['Đồng hồ trẻ em định vị Kidcare',4,1490000,28,'⌚',4.4,6200],
 // --- Gaming ---
 ['Xbox Series X',5,12990000,11,'🎮',4.8,1800],['Tay cầm DualSense Edge',5,5490000,15,'🎮',4.7,2200],
 ['Tai nghe gaming HyperX Cloud III',5,2490000,26,'🎧',4.6,3900],['Card đồ họa RTX 5070',5,16990000,8,'🖥️',4.8,760],
 // --- Máy ảnh ---
 ['Fujifilm X100VI',6,38990000,5,'📷',4.9,310],['Nikon Z6 III',6,53990000,8,'📷',4.8,190],
 ['Insta360 X5',6,13990000,12,'📹',4.7,970],['Máy ảnh lấy liền Instax Mini 12',6,2290000,25,'📷',4.6,8300],
 ['Gimbal DJI RS 4 Mini',6,7990000,15,'🎥',4.7,640],['Ống kính Sigma 35mm f/1.4',6,16990000,10,'🔭',4.8,280],
 // --- Nhà thông minh ---
 ['Chuông cửa video Ring',7,2990000,25,'🔔',4.5,2800],['Ổ cắm thông minh WiFi',7,290000,30,'🔌',4.6,17000],
 ['Máy lọc không khí Xiaomi 4',7,3490000,22,'🌬️',4.7,3300],['Khóa cửa vân tay Samsung',7,6990000,18,'🔐',4.7,1100],
 ['Màn hình thông minh Nest Hub',7,2990000,20,'📺',4.5,1500],['Nồi chiên không dầu thông minh',7,2490000,32,'🍳',4.6,4900],
 // --- Phụ kiện ---
 ['Hub USB-C 9 trong 1',8,1190000,28,'🔌',4.6,6700],['Thẻ nhớ SanDisk 256GB',8,690000,24,'💾',4.7,14500],
 ['Giá đỡ laptop nhôm',8,490000,30,'🧰',4.5,8700],['AirTag bộ 4 chiếc',8,2790000,10,'📍',4.7,4200]
];
const GRADS = ['#6a5cff,#b18cff','#12c2e9,#7be0ff','#ff7a59,#ffb36b','#16c79a,#7af0c8','#ff5d9e,#ffa3c8','#2f80ed,#7ab3ff','#f7b733,#ffe27a'];
let PRODUCTS = RAW.map((r,i)=>({id:i+1,name:r[0],cat:r[1],old:r[2],sale:r[3],price:Math.round(r[2]*(100-r[3])/100/1000)*1000,emoji:r[4],rate:r[5],sold:r[6],grad:GRADS[i%GRADS.length]}));
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
// ===== Kết nối Supabase (điền khóa trong supabase-config.js) =====
const SB_ON = typeof supabase!=='undefined' && typeof SUPABASE_URL!=='undefined' && !SUPABASE_URL.includes('YOUR-PROJECT');
const sb = SB_ON ? supabase.createClient(SUPABASE_URL,SUPABASE_ANON_KEY) : null;
const prod = id => PRODUCTS.find(p=>p.id==id);
let cart = store.get('tz_cart',{});            // {id: qty}
let user = SB_ON ? null : store.get('tz_session',null);
let state = {cat:0,q:'',sort:'',wish:false};
let wish = store.get('tz_wish',[]);
let coupon = null;
let authMode = 'login';
const FREE_SHIP = 500000;

function toast(msg){const t=document.createElement('div');t.className='toast';t.textContent=msg;$('toasts').append(t);setTimeout(()=>t.remove(),2400)}

// ===== Hiển thị sản phẩm =====
function cardHTML(p){
  const stars = '★'.repeat(Math.round(p.rate));
  const liked = wish.includes(p.id);
  return `<article class="card">
    <span class="badge">-${p.sale}%</span>
    <button class="heart ${liked?'on':''}" onclick="toggleLike(${p.id},event)" aria-label="Yêu thích">${liked?'❤️':'🤍'}</button>
    <div class="pic" style="background:linear-gradient(135deg,${p.grad});cursor:pointer" onclick="openDetail(${p.id})">${p.emoji}</div>
    <div class="info"><div class="name" style="cursor:pointer" onclick="openDetail(${p.id})">${p.name}</div>
      <div class="meta"><span style="color:#f7a600">${stars}</span> ${p.rate} · Đã bán ${p.sold.toLocaleString('vi-VN')}</div>
      <div><span class="price">${money(p.price)}</span><span class="old">${money(p.old)}</span></div>
      <button class="add" onclick="addToCart(${p.id})">Thêm vào giỏ</button></div></article>`;
}
function renderGrid(){
  let list = PRODUCTS.filter(p=>(!state.cat||p.cat===state.cat)&&matchQ(p,state.q)&&(!state.wish||wish.includes(p.id)));
  const s = {asc:(a,b)=>a.price-b.price,desc:(a,b)=>b.price-a.price,sale:(a,b)=>b.sale-a.sale,rate:(a,b)=>b.rate-a.rate}[state.sort];
  if(s) list.sort(s);
  $('listTitle').textContent = (state.q?`Kết quả cho “${state.q}”`:(state.cat?CATS[state.cat]:'Tất cả sản phẩm')) + ` (${list.length})`;
$('backBtn').hidden = !(state.cat||state.q||state.wish||state.sort);
  $('grid').innerHTML = list.length ? list.map(cardHTML).join('') : '<p class="empty">Không tìm thấy sản phẩm phù hợp. Hãy thử từ khóa khác.</p>';
}
function renderCats(){
  $('cats').innerHTML = CATS.map((c,i)=>`<button class="chip ${i===state.cat?'on':''}" onclick="setCat(${i})">${c}</button>`).join('');
}
function setCat(i){if(state.cat!==i)pushHist();state.cat=i;renderCats();renderGrid();$('grid').scrollIntoView({block:'start'})}
function resetAll(){hist.length=0;closeSuggest();hist.length=0;closeSuggest();hist.length=0;closeSuggest();state={cat:0,q:'',sort:'',wish:false};$('search').value='';$('sort').value='';renderCats();renderGrid();scrollTo(0,0)}
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
  toast('Đã thêm "'+prod(id).name+'" vào giỏ');
}
function changeQty(id,d){cart[id]+=d; if(cart[id]<=0) delete cart[id]; saveCart()}
function removeItem(id){delete cart[id];saveCart()}
function calc(){
  const sub = Object.entries(cart).reduce((t,[id,q])=>t+prod(id).price*q,0);
  let ship = sub===0||sub>=FREE_SHIP ? 0 : 30000, disc = 0;
  if(coupon&&sub){
    if(coupon.type==='pct') disc=Math.round(sub*coupon.v/100);
    if(coupon.type==='amt') disc=Math.min(coupon.v,sub);
    if(coupon.type==='ship') ship=0;
  }
  return {sub,ship,disc,total:sub+ship-disc};
}
function renderCart(){
  const ids = Object.keys(cart);
  $('cartCount').textContent = Object.values(cart).reduce((a,b)=>a+b,0);
  $('cartItems').innerHTML = ids.length ? ids.map(id=>{const p=prod(id);return `<div class="item">
    <div class="pic" style="background:linear-gradient(135deg,${p.grad})">${p.emoji}</div>
    <div><b>${p.name}</b><span class="price" style="font-size:.95rem">${money(p.price)}</span>
    <div class="qty"><button onclick="changeQty(${id},-1)" aria-label="Giảm">−</button><span>${cart[id]}</span><button onclick="changeQty(${id},1)" aria-label="Tăng">+</button></div></div>
    <button class="del" onclick="removeItem(${id})">Xóa</button></div>`}).join('')
    : '<p class="empty">Giỏ hàng đang trống.<br>Chọn sản phẩm bạn thích để thêm vào nhé!</p>';
  const c = calc();
  $('subtotal').textContent = money(c.sub);
  $('ship').textContent = c.ship ? money(c.ship) : (c.sub ? 'Miễn phí' : '0₫');
  $('discRow').hidden = !c.disc; $('disc').textContent = '-'+money(c.disc);
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
const AUTH_MSG = {'Invalid login credentials':'Sai email hoặc mật khẩu.','User already registered':'Email này đã được đăng ký. Hãy đăng nhập.','Email not confirmed':'Email chưa được xác nhận. Hãy kiểm tra hộp thư.'};
function setUser(u){user={id:u.id,email:u.email,name:u.user_metadata?.name||u.email.split('@')[0]};renderUser()}
function afterLogin(){closeAll();toast('Xin chào '+user.name+'! 🎉');loadWish();if(pendingCheckout){pendingCheckout=false;startCheckout()}}
async function submitAuth(){
  const name=$('aName').value.trim(), email=$('aEmail').value.trim().toLowerCase(), pass=$('aPass').value, err=$('authErr');
  if(!/^\S+@\S+\.\S+$/.test(email)) return err.textContent='Email chưa đúng định dạng.';
  if(pass.length<6) return err.textContent='Mật khẩu cần ít nhất 6 ký tự.';
  if(authMode==='reg'&&!name) return err.textContent='Vui lòng nhập họ và tên.';
  err.textContent='';
  if(sb){
    $('authSubmit').disabled=true;
    try{
      const r = authMode==='reg' ? await sb.auth.signUp({email,password:pass,options:{data:{name}}}) : await sb.auth.signInWithPassword({email,password:pass});
      if(r.error) throw r.error;
      if(!r.data.session){closeAll();return toast('Kiểm tra email để xác nhận tài khoản rồi đăng nhập nhé 📧')}
      setUser(r.data.user); afterLogin();
    }catch(e){err.textContent=AUTH_MSG[e.message]||e.message}
    finally{$('authSubmit').disabled=false}
    return;
  }
  // Chế độ thử nghiệm (chưa cấu hình Supabase): lưu trong trình duyệt
  const users=store.get('tz_users',{}), enc=btoa(unescape(encodeURIComponent(pass)));
  if(authMode==='reg'){
    if(users[email]) return err.textContent=AUTH_MSG['User already registered'];
    users[email]={name,pass:enc}; store.set('tz_users',users);
  } else if(!users[email]||users[email].pass!==enc) return err.textContent=AUTH_MSG['Invalid login credentials'];
  user={name:users[email].name,email}; store.set('tz_session',user); renderUser(); afterLogin();
}
async function logout(){
  if(sb) await sb.auth.signOut();
  user=null; wish=[]; store.set('tz_session',null); store.set('tz_wish',[]);
  renderUser(); updateWish(); renderGrid(); renderFlash(); toast('Bạn đã đăng xuất');
}

// ===== Dữ liệu từ Supabase =====
async function loadProducts(){
  const {data,error}=await sb.from('products').select('*').order('id');
  if(error||!data?.length) return console.warn('Đang dùng sản phẩm mẫu:',error?.message||'bảng products trống');
  PRODUCTS = data.map(r=>({id:r.id,name:r.name,cat:r.cat,old:r.old_price,sale:r.sale,price:Math.round(r.old_price*(100-r.sale)/100/1000)*1000,emoji:r.emoji,rate:Number(r.rate),sold:r.sold,grad:GRADS[(r.id-1)%GRADS.length]}));
  renderGrid(); renderFlash(); renderCart();
}
async function loadWish(){
  if(!sb||!user) return;
  const {data}=await sb.from('wishlist').select('product_id');
  if(data){wish=data.map(r=>r.product_id);store.set('tz_wish',wish);updateWish();renderGrid();renderFlash()}
}
async function syncWish(id){
  if(!sb||!user) return;
  const {error}=await (wish.includes(id) ? sb.from('wishlist').upsert({user_id:user.id,product_id:id}) : sb.from('wishlist').delete().match({user_id:user.id,product_id:id}));
  if(error) toast('Chưa đồng bộ được mục yêu thích');
}
async function initSupabase(){
  if(!sb) return console.info('Chưa cấu hình Supabase: đang chạy chế độ thử nghiệm.');
  const {data}=await sb.auth.getSession();
  if(data.session) setUser(data.session.user);
  sb.auth.onAuthStateChange((ev)=>{if(ev==='SIGNED_OUT'&&user){user=null;renderUser()}});
  await loadProducts(); await loadWish();
}

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
async function placeOrder(){
  const n=$('pName').value.trim(), ph=$('pPhone').value.trim(), ad=$('pAddr').value.trim();
  if(!n||!/^0\d{9}$/.test(ph.replace(/\s/g,''))||ad.length<8) return $('payErr').textContent='Vui lòng nhập tên, số điện thoại 10 số và địa chỉ đầy đủ.';
  const method=document.querySelector('input[name=pay]:checked').value, c=calc();
  const code='TZ'+Date.now().toString().slice(-7);
  if(sb){
    const items=Object.entries(cart).map(([id,q])=>({id:+id,name:prod(id).name,price:prod(id).price,qty:q}));
    const {error}=await sb.from('orders').insert({user_id:user.id,code,customer:n,phone:ph,address:ad,method,items,subtotal:c.sub,discount:c.disc,shipping:c.ship,total:c.total});
    if(error) return $('payErr').textContent='Không lưu được đơn hàng: '+error.message;
  } else {
    const orders=store.get('tz_orders',[]); orders.push({code,email:user.email,items:cart,total:c.total,method,at:Date.now()}); store.set('tz_orders',orders);
  }
  cart={}; coupon=null; $('coupon').value=''; saveCart();
  $('doneMsg').innerHTML = `Mã đơn <b>${code}</b> · ${money(c.total)}<br>${method}. Dự kiến giao trong 2 giờ.`;
  openModal('doneModal');
}

// ===== Mã giảm giá =====
const COUPONS = {GIAM10:{type:'pct',v:10,txt:'Giảm 10%'},TECH50K:{type:'amt',v:50000,txt:'Giảm 50.000₫'},FREESHIP:{type:'ship',v:0,txt:'Miễn phí vận chuyển'}};
function applyCoupon(){
  const c = COUPONS[$('coupon').value.trim().toUpperCase()];
  if(!c) return toast('Mã không hợp lệ hoặc đã hết hạn');
  coupon = c; renderCart(); toast('Đã áp dụng: '+c.txt);
}

// ===== Yêu thích =====
function toggleLike(id,e){
  e.stopPropagation();
  wish = wish.includes(id) ? wish.filter(x=>x!==id) : [...wish,id];
  store.set('tz_wish',wish); syncWish(id); updateWish(); renderGrid(); renderFlash();
  toast(wish.includes(id)?'Đã lưu vào yêu thích':'Đã bỏ khỏi yêu thích');
}
function updateWish(){$('wishCount').textContent=wish.length}
function toggleWish(){
  pushHist(); state.wish=!state.wish; renderGrid();
  $('listTitle').textContent = state.wish ? '❤️ Sản phẩm yêu thích ('+document.querySelectorAll('#grid .card').length+')' : $('listTitle').textContent;
  $('grid').scrollIntoView({block:'start'});
  if(state.wish&&!wish.length) toast('Bạn chưa thích sản phẩm nào. Bấm 🤍 để lưu nhé!');
}

// ===== Chi tiết sản phẩm =====
const SPECS = {
 1:['Màn hình OLED 120Hz','Chip thế hệ mới, AI trên máy','Camera 48MP, quay 4K','Pin dùng cả ngày, sạc nhanh'],
 2:['Màn hình 2K sắc nét','Chip hiệu năng cao','RAM 16GB, SSD 512GB','Pin 15–20 giờ, mỏng nhẹ'],
 3:['Chống ồn chủ động','Kết nối Bluetooth 5.4','Pin 24–40 giờ','Âm thanh Hi-Res'],
 4:['Theo dõi sức khỏe 24/7','GPS chính xác','Chống nước 5ATM','Pin 2–14 ngày'],
 5:['Hiệu năng mạnh mẽ','Độ trễ cực thấp','Thiết kế công thái học','Tương thích nhiều nền tảng'],
 6:['Cảm biến độ nhạy cao','Quay video 4K','Chống rung ổn định','Kết nối WiFi/Bluetooth'],
 7:['Điều khiển qua ứng dụng','Tương thích Google/Alexa','Tự động hóa theo lịch','Tiết kiệm điện'],
 8:['Chuẩn kết nối mới nhất','Chất liệu bền bỉ','An toàn quá tải, quá nhiệt','Bảo hành 12 tháng']
};
let dq = 1;
function openDetail(id){
  const isOpen=$('detailModal').classList.contains('on');
if(!isOpen) detailStack=[]; else if(curDetail&&curDetail!==id) detailStack.push(curDetail);
curDetail=id;
const p=prod(id); dq=1;
  const rel=PRODUCTS.filter(x=>x.cat===p.cat&&x.id!==id).slice(0,4);
  const reviews=[['Minh Anh','Giao nhanh, máy đẹp, đúng mô tả.'],['Quốc Bảo','Dùng rất ổn, giá tốt hơn ngoài tiệm.'],['Thu Hà','Đóng gói kỹ, nhân viên tư vấn nhiệt tình.']];
  $('detailBody').innerHTML = `${detailStack.length?'<button class="btn back" onclick="detailBack()">← Quay lại</button>':''}<div class="dgrid">
    <div class="pic big2" style="background:linear-gradient(135deg,${p.grad})">${p.emoji}</div>
    <div class="dinfo"><h3>${p.name}</h3>
      <div class="meta"><span style="color:#f7a600">${'★'.repeat(Math.round(p.rate))}</span> ${p.rate} · Đã bán ${p.sold.toLocaleString('vi-VN')}</div>
      <div><span class="price" style="font-size:1.6rem">${money(p.price)}</span><span class="old">${money(p.old)}</span> <span class="badge" style="position:static">-${p.sale}%</span></div>
      <ul class="specs">${SPECS[p.cat].map(s=>'<li>✔ '+s+'</li>').join('')}</ul>
      <div class="qty"><button onclick="dqty(-1)">−</button><span id="dq">1</span><button onclick="dqty(1)">+</button></div>
      <div class="dbtns"><button class="btn add" onclick="addMany(${id})">Thêm vào giỏ</button><button class="btn buy" style="margin:0" onclick="addMany(${id},true)">Mua ngay</button></div>
    </div></div>
    <h4 style="margin:16px 0 8px">Đánh giá nổi bật</h4>
    ${reviews.map(r=>`<div class="review"><b>${r[0]}</b> <span style="color:#f7a600">★★★★★</span><br>${r[1]}</div>`).join('')}
    <h4 style="margin:16px 0 8px">Sản phẩm liên quan</h4>
    <div class="relrow">${rel.map(x=>`<div class="rel" onclick="openDetail(${x.id})"><div class="pic" style="background:linear-gradient(135deg,${x.grad});height:70px;font-size:2.2rem">${x.emoji}</div><small>${x.name}</small><b class="price" style="font-size:.9rem">${money(x.price)}</b></div>`).join('')}</div>`;
  openModal('detailModal');
}
function dqty(d){dq=Math.max(1,dq+d);$('dq').textContent=dq}
function addMany(id,buyNow){
  cart[id]=(cart[id]||0)+dq; saveCart(); closeAll();
  toast('Đã thêm '+dq+' sản phẩm vào giỏ');
  if(buyNow) startCheckout();
}

// ===== Lịch sử đơn hàng =====
async function openOrders(){
  if(!user){toast('Hãy đăng nhập để xem đơn hàng');return openAuth()}
  let list;
  if(sb){
    const {data,error}=await sb.from('orders').select('*').order('created_at',{ascending:false});
    if(error) return toast('Không tải được đơn hàng');
    list=data.map(o=>({code:o.code,at:new Date(o.created_at).getTime(),method:o.method,total:o.total,lines:o.items.map(i=>i.name+' ×'+i.qty)}));
  } else {
    list=store.get('tz_orders',[]).filter(o=>o.email===user.email).reverse().map(o=>({code:o.code,at:o.at,method:o.method,total:o.total,lines:Object.entries(o.items).map(([id,q])=>prod(id).emoji+' '+prod(id).name+' ×'+q)}));
  }
  $('ordersBody').innerHTML = list.length ? list.map(o=>{
    const step=Math.min(3,Math.floor((Date.now()-o.at)/20000));
    return `<div class="order"><div class="row"><b>#${o.code}</b><span class="state s${step}">${['Đã đặt','Đang chuẩn bị','Đang giao','Đã giao'][step]}</span></div>
      <small>${new Date(o.at).toLocaleString('vi-VN')} · ${o.method}</small><p>${o.lines.join('<br>')}</p><b class="price">${money(o.total)}</b></div>`;
  }).join('') : '<p class="empty">Bạn chưa có đơn hàng nào.</p>';
  openModal('ordersModal');
}

// ===== Giao diện sáng/tối, cuộn trang, bản tin =====
function toggleTheme(){
  const dark = document.documentElement.dataset.theme==='dark' || (!document.documentElement.dataset.theme && matchMedia('(prefers-color-scheme:dark)').matches);
  document.documentElement.dataset.theme = dark?'light':'dark'; store.set('tz_theme',dark?'light':'dark');
}
if(store.get('tz_theme',null)) document.documentElement.dataset.theme = store.get('tz_theme');
addEventListener('scroll',()=>$('toTop').classList.toggle('show',scrollY>600),{passive:true});
function subscribe(){
  if(!/^\S+@\S+\.\S+$/.test($('nlMail').value.trim())) return toast('Email chưa đúng định dạng');
  $('nlMail').value=''; toast('Đăng ký thành công! Dùng mã GIAM10 cho đơn đầu tiên 🎁');
}
// ===== Gợi ý tìm kiếm + nút quay lại =====
const HOT = ['iPhone','MacBook','Tai nghe','PS5','Apple Watch','Laptop gaming'];
const hist = [];                       // lịch sử bộ lọc để quay lại
let sgItems = [], sgActive = -1, detailStack = [], curDetail = null;
const esc = s => String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
// Bỏ dấu tiếng Việt, giữ nguyên độ dài từng ký tự để tô sáng đúng chỗ
function norm(s){return [...String(s).normalize('NFC')].map(c=>c.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[đĐ]/g,'d').toLowerCase()).join('')}
function tokens(q){return norm(q).split(/\s+/).filter(Boolean)}
function matchQ(p,q){const t=tokens(q), n=norm(p.name);return t.every(x=>n.includes(x))}
function hl(name,tok){
  const i=tok?norm(name).indexOf(tok):-1;
  return i<0 ? esc(name) : esc(name.slice(0,i))+'<mark>'+esc(name.slice(i,i+tok.length))+'</mark>'+esc(name.slice(i+tok.length));
}
function pushHist(){hist.push({...state});if(hist.length>20)hist.shift()}
function goBack(){
  const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b); let prev;
  do{prev=hist.pop()}while(prev&&same(prev,state));
  state=prev?{...prev}:{cat:0,q:'',sort:'',wish:false};
  $('search').value=state.q; $('sort').value=state.sort;
  closeSuggest(); renderCats(); renderGrid(); $('grid').scrollIntoView({block:'start'});
}
function detailBack(){const id=detailStack.pop();if(id){curDetail=null;openDetail(id)}}

function addRecent(q){store.set('tz_recent',[q,...store.get('tz_recent',[]).filter(x=>x!==q)].slice(0,6))}
function removeRecent(i,e){e.stopPropagation();const r=store.get('tz_recent',[]);r.splice(i,1);store.set('tz_recent',r);renderSuggest()}
function clearRecent(e){e.stopPropagation();store.set('tz_recent',[]);renderSuggest()}
function logSearch(q){if(sb&&q.length>1) sb.from('search_logs').insert({keyword:q}).then(()=>{},()=>{})}

function renderSuggest(){
  const q=$('search').value.trim(), box=$('suggest'); sgItems=[]; sgActive=-1;
  const add=(it,h)=>{sgItems.push(it);const k=sgItems.length-1;return `<div class="sg" role="option" onclick="pickSuggest(${k})">${h}</div>`};
  let html='';
  if(!q){
    const rec=store.get('tz_recent',[]);
    if(rec.length) html+='<div class="sgh">Tìm kiếm gần đây<button onclick="clearRecent(event)">Xóa tất cả</button></div>'
      +rec.map((r,i)=>add({t:'kw',q:r},`<span class="ic">🕘</span><span class="tx">${esc(r)}</span><button class="rm" aria-label="Xóa" onclick="removeRecent(${i},event)">✕</button>`)).join('');
    html+='<div class="sgh">Tìm nhiều nhất</div><div class="hot">'+HOT.map(h=>add({t:'kw',q:h},'🔥 '+esc(h))).join('')+'</div>';
  } else {
    const t=tokens(q);
    const ps=PRODUCTS.filter(p=>matchQ(p,q)).sort((a,b)=>(norm(a.name).startsWith(t[0])?0:1)-(norm(b.name).startsWith(t[0])?0:1)||b.sold-a.sold);
    const cs=CATS.map((c,i)=>({c,i})).filter(x=>x.i&&t.every(k=>norm(x.c).includes(k))).slice(0,2);
    html+=add({t:'kw',q},`<span class="ic">🔍</span><span class="tx">Tìm “<b>${esc(q)}</b>” trong tất cả sản phẩm<small>${ps.length} kết quả</small></span>`);
    cs.forEach(x=>html+=add({t:'cat',i:x.i},`<span class="ic">📂</span><span class="tx">Danh mục <b>${esc(x.c)}</b></span>`));
    ps.slice(0,6).forEach(p=>html+=add({t:'prod',id:p.id},`<span class="ic pe" style="background:linear-gradient(135deg,${p.grad})">${p.emoji}</span><span class="tx">${hl(p.name,t[0])}<small>${esc(CATS[p.cat]||'')}</small></span><b class="pr">${money(p.price)}</b>`));
    if(!ps.length) html+='<div class="sgn">Không có sản phẩm khớp. Thử từ khóa ngắn hơn như “iphone”, “laptop” hoặc “tai nghe”.</div>';
  }
  box.innerHTML=html; box.hidden=!html; $('search').setAttribute('aria-expanded',String(!!html));
}
function closeSuggest(){$('suggest').hidden=true;$('search').setAttribute('aria-expanded','false');sgActive=-1}
function commitSearch(q){
  q=q.trim(); if(!q) return closeSuggest();
  if(state.q!==q) pushHist();
  state.q=q; $('search').value=q; addRecent(q); logSearch(q);
  closeSuggest(); renderGrid(); $('grid').scrollIntoView({block:'start'});
}
function pickSuggest(i){
  const it=sgItems[i]; if(!it) return;
  if(it.t==='kw') commitSearch(it.q);
  else if(it.t==='cat'){ const q=$('search').value.trim(); if(q) addRecent(q); pushHist(); state.q=''; $('search').value=''; closeSuggest(); state.cat=0; setCat(it.i); }
  else { const q=$('search').value.trim(); if(q) addRecent(q); closeSuggest(); openDetail(it.id); }
}
function markActive(){
  document.querySelectorAll('#suggest .sg').forEach((el,i)=>el.classList.toggle('on',i===sgActive));
  const a=document.querySelector('#suggest .sg.on'); if(a) a.scrollIntoView({block:'nearest'});
}
$('search').addEventListener('input',e=>{
  const v=e.target.value;
  if(!state.q.trim()&&v.trim()) pushHist();
  state.q=v.trim(); renderGrid(); renderSuggest();
});
$('search').addEventListener('focus',renderSuggest);
$('search').addEventListener('keydown',e=>{
  const n=sgItems.length;
  if(e.key==='ArrowDown'||e.key==='ArrowUp'){
    if(!n||$('suggest').hidden) return renderSuggest();
    e.preventDefault(); sgActive = e.key==='ArrowDown' ? (sgActive+1)%n : (sgActive<=0?n-1:sgActive-1); markActive();
  } else if(e.key==='Enter'){ e.preventDefault(); sgActive>=0 ? pickSuggest(sgActive) : commitSearch($('search').value); }
  else if(e.key==='Escape') closeSuggest();
});
document.addEventListener('click',e=>{if(!e.target.closest('.searchbox')) closeSuggest()});
// ===== Khởi động =====
renderCats(); renderGrid(); renderFlash(); renderCart(); renderUser(); updateWish();
initSupabase(); showBanner(0); startBanner(); tick(); setInterval(tick,1000);
