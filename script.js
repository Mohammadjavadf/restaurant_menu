const STORAGE_KEY = "restaurantFoods";
const SETTINGS_KEY = "restaurantSettings";
const CATEGORIES_KEY = "restaurantCategories";

/* ---------- تنظیمات و داده‌های پیش‌فرض (بدون تغییر) ---------- */
const defaultSettings = {
  restaurantName: "رستوران خوش",
  subtitle: "لذت واقعی غذاهای ایرانی و فرنگی",
  heroTitle: "منوی غذا",
  description: "غذاهای تازه، باکیفیت و خوش‌طعم برای یک انتخاب لذت‌بخش",
  phone: "02112345678",
  phoneDisplay: "۰۲۱-۱۲۳۴۵۶۷۸",
  footer: "تمامی حقوق این سایت محفوظ است © ۱۴۰۵",
  heroImage: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1800&q=85"
};

const defaultCategories = [
  { id: "iranian", name: "غذاهای ایرانی", active: true },
  { id: "foreign", name: "غذاهای فرنگی", active: true },
  { id: "starter", name: "پیش غذا", active: true },
  { id: "salad", name: "سالاد", active: true },
  { id: "dessert", name: "نوشیدنی و دسر", active: true }
];

const defaultFoods = [
  {id:1,name:"کباب کوبیده",category:"iranian",categoryName:"غذاهای ایرانی",price:"۳۸۰,۰۰۰ تومان",short:"کوبیده مخلوط گوشت گوسفندی و گوساله همراه با برنج ایرانی و گوجه کبابی",description:"کباب کوبیده مخصوص رستوران خوش با ترکیبی متعادل از گوشت تازه، ادویه‌های مخصوص و پیاز تهیه می‌شود و همراه با برنج ایرانی و گوجه کبابی سرو می‌شود.",ingredients:["گوشت گوسفندی","گوشت گوساله","پیاز","نمک","فلفل سیاه","زعفران","روغن","برنج ایرانی","گوجه تازه"],image:"https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=85",active:true},
  {id:2,name:"چلو جوجه کباب",category:"iranian",categoryName:"غذاهای ایرانی",price:"۳۵۰,۰۰۰ تومان",short:"جوجه کباب زعفرانی همراه با برنج ایرانی و کره مخصوص",description:"تکه‌های تازه مرغ در ترکیبی از زعفران، آبلیمو و ادویه مخصوص مزه‌دار شده و همراه با برنج ایرانی سرو می‌شود.",ingredients:["سینه مرغ","زعفران","آبلیمو","پیاز","نمک","فلفل","کره","برنج ایرانی"],image:"https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=900&q=85",active:true},
  {id:3,name:"قورمه سبزی",category:"iranian",categoryName:"غذاهای ایرانی",price:"۳۴۰,۰۰۰ تومان",short:"خورشت قورمه سبزی با گوشت گوساله همراه با برنج ایرانی",description:"قورمه سبزی جاافتاده با سبزی تازه، لوبیا قرمز و گوشت گوساله که با روش سنتی و زمان کافی پخته شده است.",ingredients:["گوشت گوساله","سبزی قورمه","لوبیا قرمز","لیمو عمانی","پیاز","روغن","نمک","برنج ایرانی"],image:"https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=85",active:true},
  {id:4,name:"پاستا بلونز",category:"foreign",categoryName:"غذاهای فرنگی",price:"۳۲۰,۰۰۰ تومان",short:"پاستا با سس گوشت چرخ‌کرده، پنیر پارمزان و سبزیجات تازه",description:"پاستای ایتالیایی با سس بلونز خانگی، گوشت تازه و پنیر پارمزان که با سبزیجات معطر تکمیل می‌شود.",ingredients:["پاستا","گوشت چرخ‌کرده","گوجه","پیاز","سیر","سس مخصوص","پنیر پارمزان","ریحان"],image:"https://images.unsplash.com/photo-1556761223-4c4282c73f77?auto=format&fit=crop&w=900&q=85",active:true},
  {id:5,name:"برگر مخصوص",category:"foreign",categoryName:"غذاهای فرنگی",price:"۳۶۰,۰۰۰ تومان",short:"برگر ۲۰۰ گرمی مخصوص رستوران با سیب‌زمینی سرخ‌کرده",description:"برگر دست‌ساز با گوشت تازه و نان مخصوص، همراه با پنیر، سبزیجات تازه و سیب‌زمینی ترد سرو می‌شود.",ingredients:["گوشت گوساله","نان برگر","پنیر","کاهو","گوجه","خیارشور","سس مخصوص","سیب‌زمینی"],image:"https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=85",active:true},
  {id:6,name:"سالاد سزار",category:"salad",categoryName:"سالاد",price:"۲۸۰,۰۰۰ تومان",short:"کاهو، مرغ گریل شده، نان تست، پنیر پارمزان و سس مخصوص",description:"سالاد سزار تازه با مرغ گریل شده، کاهوی ترد، کروتان و سس سزار مخصوص رستوران خوش.",ingredients:["کاهو","مرغ گریل","نان تست","پنیر پارمزان","سس سزار","فلفل سیاه"],image:"https://images.unsplash.com/photo-1551248429-40975aa4de74?auto=format&fit=crop&w=900&q=85",active:true},
  {id:7,name:"سوپ قارچ",category:"starter",categoryName:"پیش غذا",price:"۱۸۰,۰۰۰ تومان",short:"سوپ قارچ خامه‌ای با عطر گیاهان معطر و نان تست",description:"سوپ گرم و خامه‌ای قارچ با قارچ تازه، شیر و گیاهان معطر که انتخابی مناسب برای شروع غذاست.",ingredients:["قارچ تازه","شیر","خامه","پیاز","کره","آویشن","نمک","فلفل","نان تست"],image:"https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=900&q=85",active:true},
  {id:8,name:"تیرامیسو",category:"dessert",categoryName:"نوشیدنی و دسر",price:"۱۹۰,۰۰۰ تومان",short:"دسر ایتالیایی با بیسکویت، ماسکارپونه و پودر قهوه",description:"تیرامیسوی لطیف و تازه با لایه‌های بیسکویت آغشته به قهوه و کرم ماسکارپونه.",ingredients:["بیسکویت","قهوه","ماسکارپونه","خامه","شکر","پودر کاکائو"],image:"https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=900&q=85",active:true}
];

/* ---------- fallback تصویر (SVG درون‌خطی، هیچ درخواستی نمی‌فرستد) ---------- */
const FALLBACK_IMAGE = `data:image/svg+xml;charset=UTF-8,` + encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#2a1d12"/>
      <stop offset="1" stop-color="#c89432"/>
    </linearGradient>
  </defs>
  <rect width="800" height="600" fill="url(#g)"/>
  <text x="50%" y="48%" fill="#f5e7c9" font-family="Tahoma, sans-serif" font-size="46" text-anchor="middle">♨</text>
  <text x="50%" y="60%" fill="#f5e7c9" font-family="Tahoma, sans-serif" font-size="22" text-anchor="middle">تصویر در دسترس نیست</text>
</svg>`);

/* ---------- storage helpers ---------- */
function readStorage(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    return value ?? fallback;
  } catch {
    return fallback;
  }
}

function getFoods() {
  const foods = readStorage(STORAGE_KEY, null);
  if (Array.isArray(foods)) return foods;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultFoods));
  return [...defaultFoods];
}

function getSettings() {
  return { ...defaultSettings, ...readStorage(SETTINGS_KEY, {}) };
}

function getCategories() {
  const cats = readStorage(CATEGORIES_KEY, null);
  if (Array.isArray(cats) && cats.length) return cats;
  localStorage.setItem(CATEGORIES_KEY, JSON.stringify(defaultCategories));
  return [...defaultCategories];
}

/* ---------- state ---------- */
let allFoods = [];
let currentList = [];
let visibleCount = 0;
const PAGE_SIZE = 4; // هر بار ۴ تا اضافه شود

/* ---------- اعمال تصویر با fallback ---------- */
function applyImageWithFallback(imgEl, src) {
  imgEl.onerror = () => {
    imgEl.onerror = null;
    imgEl.src = FALLBACK_IMAGE;
    imgEl.classList.add("img-fallback");
  };
  imgEl.src = src || FALLBACK_IMAGE;
}

/* ---------- رندر تنظیمات ---------- */
function renderSiteSettings() {
  const settings = getSettings();
  const cats = getCategories();

  document.title = settings.restaurantName || "منوی رستوران";
  const brand = document.querySelector(".brand span:last-child");
  const subtitle = document.querySelector(".brand-subtitle");
  const heroTitle = document.querySelector(".hero-title");
  const heroDesc = document.querySelector(".hero-content > p");
  const phoneLink = document.querySelector(".phone-box a");
  const phoneText = document.querySelector(".phone-box > span");
  const footer = document.querySelector("footer");
  const hero = document.querySelector(".hero");

  if (brand) brand.textContent = settings.restaurantName;
  if (subtitle) subtitle.textContent = settings.subtitle;
  if (heroTitle) heroTitle.innerHTML = `<span>منوی</span><strong>غذا</strong>`;
  if (heroDesc) heroDesc.textContent = settings.description;
  if (phoneLink) {
    phoneLink.href = `tel:${settings.phone}`;
    phoneLink.textContent = `☎ ${settings.phoneDisplay}`;
  }
  if (phoneText) phoneText.textContent = "برای سفارش غذا با ما تماس بگیرید";
  if (footer) footer.textContent = settings.footer;
  if (hero && settings.heroImage) {
    hero.style.backgroundImage =
      `linear-gradient(90deg, rgba(15,10,6,.82), rgba(15,10,6,.22)), url("${settings.heroImage}")`;
  }

  const categoryContainer = document.getElementById("categories");
  if (categoryContainer) {
    categoryContainer.innerHTML =
      `<button class="category active" data-category="all">همه غذاها</button>` +
      cats.filter(c => c.active !== false)
        .map(c => `<button class="category" data-category="${c.id}">${c.name}</button>`)
        .join("");
  }
}

/* ---------- ساخت یک کارت ---------- */
function createFoodCard(food, index) {
  const card = document.createElement("article");
  card.className = "food-card";
  card.style.animationDelay = `${index * 60}ms`;
  card.innerHTML = `
    <div class="food-image-wrap">
      <img class="food-image" alt="${food.name}" loading="lazy" decoding="async">
    </div>
    <div class="food-info">
      <h2 class="food-name">${food.name}</h2>
      <div class="food-price">${food.price}</div>
      <p class="food-short">${food.short}</p>
      <button class="details-btn" data-id="${food.id}">جزئیات بیشتر</button>
    </div>`;
  applyImageWithFallback(card.querySelector(".food-image"), food.image);
  return card;
}

/* ---------- رندر تدریجی + دکمه مشاهده بیشتر ---------- */
function renderFoods(list) {
  const foodGrid = document.getElementById("foodGrid");
  const showMore = document.getElementById("showMore");
  if (!foodGrid) return;

  currentList = list.filter(f => f.active !== false);
  visibleCount = Math.min(PAGE_SIZE, currentList.length);
  foodGrid.innerHTML = "";

  appendVisibleCards();

  if (showMore) {
    if (currentList.length <= PAGE_SIZE) {
      showMore.classList.add("hidden");
    } else {
      showMore.classList.remove("hidden");
      showMore.disabled = false;
      updateShowMoreLabel(showMore);
    }
  }
}

function appendVisibleCards() {
  const foodGrid = document.getElementById("foodGrid");
  if (!foodGrid) return;
  const start = foodGrid.children.length;
  const end = Math.min(visibleCount, currentList.length);
  for (let i = start; i < end; i++) {
    foodGrid.appendChild(createFoodCard(currentList[i], i));
  }
}

function updateShowMoreLabel(btn) {
  const remaining = currentList.length - visibleCount;
  const label = btn.querySelector("span:first-child");
  if (label) {
    label.textContent = remaining > 0
      ? `مشاهده بیشتر (${remaining})`
      : "همه غذاها نمایش داده شد";
  }
  btn.classList.toggle("done", remaining <= 0);
}

function loadMore() {
  const showMore = document.getElementById("showMore");
  if (!currentList.length) return;
  if (visibleCount >= currentList.length) return;

  visibleCount = Math.min(visibleCount + PAGE_SIZE, currentList.length);
  appendVisibleCards();

  if (visibleCount >= currentList.length) {
    if (showMore) {
      updateShowMoreLabel(showMore);
      showMore.disabled = true;
      // با تأخیر کوتاه، دکمه را محو کن
      setTimeout(() => showMore.classList.add("hidden"), 400);
    }
  } else if (showMore) {
    updateShowMoreLabel(showMore);
  }
}

/* ---------- modal ---------- */
function openModal(food) {
  const modal = document.getElementById("foodModal");
  if (!modal) return;

  const img = document.getElementById("modalImage");
  applyImageWithFallback(img, food.image);
  img.alt = food.name;

  document.getElementById("modalTitle").textContent = food.name;
  document.getElementById("modalCategory").textContent =
    getCategories().find(c => c.id === food.category)?.name || food.categoryName || "";
  document.getElementById("modalPrice").textContent = food.price;
  document.getElementById("modalDescription").textContent = food.description;

  const list = document.getElementById("modalIngredients");
  list.innerHTML = "";
  (food.ingredients || []).forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    list.appendChild(li);
  });

  const settings = getSettings();
  const modalPhone = document.querySelector(".modal-phone");
  if (modalPhone) modalPhone.href = `tel:${settings.phone}`;

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  const modal = document.getElementById("foodModal");
  if (!modal) return;
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

/* ---------- init ---------- */
function initMenu() {
  const foodGrid = document.getElementById("foodGrid");
  const categories = document.getElementById("categories");
  const modal = document.getElementById("foodModal");
  const modalClose = document.getElementById("modalClose");
  const showMore = document.getElementById("showMore");

  renderSiteSettings();
  allFoods = getFoods();
  renderFoods(allFoods);

  categories?.addEventListener("click", event => {
    const button = event.target.closest(".category");
    if (!button) return;

    document.querySelectorAll(".category").forEach(item => item.classList.remove("active"));
    button.classList.add("active");

    const selected = button.dataset.category;
    renderFoods(selected === "all" ? allFoods : allFoods.filter(f => f.category === selected));
  });

  foodGrid?.addEventListener("click", event => {
    const button = event.target.closest(".details-btn");
    if (!button) return;
    const food = allFoods.find(item => item.id === Number(button.dataset.id));
    if (food) openModal(food);
  });

  // ⭐ فعال‌سازی دکمه مشاهده بیشتر
  showMore?.addEventListener("click", loadMore);

  modalClose?.addEventListener("click", closeModal);
  modal?.addEventListener("click", event => {
    if (event.target === modal) closeModal();
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && modal?.classList.contains("open")) closeModal();
  });

  window.addEventListener("storage", event => {
    if (![STORAGE_KEY, SETTINGS_KEY, CATEGORIES_KEY].includes(event.key)) return;
    renderSiteSettings();
    allFoods = getFoods();
    renderFoods(allFoods);
  });
}

document.addEventListener("DOMContentLoaded", initMenu);