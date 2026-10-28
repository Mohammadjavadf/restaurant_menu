const STORAGE_KEY = "restaurantFoods";
const SETTINGS_KEY = "restaurantSettings";
const CATEGORIES_KEY = "restaurantCategories";
const LOGIN_KEY = "restaurantAdminLoggedIn";
const ADMIN_PASSWORD = "123456";

const defaultSettings = {
  restaurantName: "رستوران خوش",
  subtitle: "لذت واقعی غذاهای ایرانی و فرنگی",
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

let foods = read(STORAGE_KEY, []);
let categories = read(CATEGORIES_KEY, defaultCategories);
let settings = { ...defaultSettings, ...read(SETTINGS_KEY, {}) };

const $ = id => document.getElementById(id);

function read(key, fallback) {
  try {
    const data = JSON.parse(localStorage.getItem(key));
    return data ?? fallback;
  } catch {
    return fallback;
  }
}

function saveAll() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(foods));
  localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

function toast(message) {
  const el = $("toast");
  el.textContent = message;
  el.classList.add("show");
  setTimeout(() => el.classList.remove("show"), 2500);
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function updateStats() {
  $("totalFoods").textContent = foods.length;
  $("activeFoods").textContent = foods.filter(f => f.active !== false).length;
  $("inactiveFoods").textContent = foods.filter(f => f.active === false).length;
  $("categoryCount").textContent = categories.filter(c => c.active !== false).length;
}

function categoryName(id) {
  return categories.find(c => c.id === id)?.name || "بدون دسته";
}

function renderTable() {
  $("foodsTable").innerHTML = "";

  if (!foods.length) {
    $("foodsTable").innerHTML = `<tr><td colspan="6" style="text-align:center;padding:35px;color:#8b8076">هنوز غذایی ثبت نشده است.</td></tr>`;
    return;
  }

  foods.forEach(food => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td><img class="food-thumb" src="${escapeHtml(food.image)}" alt=""></td>
      <td><strong>${escapeHtml(food.name)}</strong></td>
      <td>${escapeHtml(categoryName(food.category))}</td>
      <td>${escapeHtml(food.price)}</td>
      <td><span class="status ${food.active !== false ? "active" : "inactive"}">${food.active !== false ? "فعال" : "غیرفعال"}</span></td>
      <td>
        <div class="actions">
          <button class="action-btn edit" data-action="edit" data-id="${food.id}">ویرایش</button>
          <button class="action-btn" data-action="toggle" data-id="${food.id}">${food.active !== false ? "غیرفعال" : "فعال"}</button>
          <button class="action-btn delete" data-action="delete" data-id="${food.id}">حذف</button>
        </div>
      </td>`;
    $("foodsTable").appendChild(row);
  });
}

function renderCategorySelect() {
  $("foodCategory").innerHTML = categories
    .filter(c => c.active !== false)
    .map(c => `<option value="${c.id}">${escapeHtml(c.name)}</option>`)
    .join("");
}

function renderCategories() {
  $("categoryList").innerHTML = categories.map(cat => `
    <div class="category-admin-card">
      <strong>${escapeHtml(cat.name)}</strong>
      <small style="color:#8a7d72">${cat.active !== false ? "فعال در منوی سایت" : "غیرفعال"}</small>
      <div class="category-admin-actions" style="margin-top:12px">
        <button class="toggle ${cat.active !== false ? "on" : "off"}" data-cat-action="toggle" data-id="${cat.id}">
          ${cat.active !== false ? "غیرفعال کردن" : "فعال کردن"}
        </button>
        <button data-cat-action="edit" data-id="${cat.id}">ویرایش</button>
        <button data-cat-action="delete" data-id="${cat.id}">حذف</button>
      </div>
    </div>
  `).join("");
}

function fillSettings() {
  $("settingName").value = settings.restaurantName;
  $("settingSubtitle").value = settings.subtitle;
  $("settingDescription").value = settings.description;
  $("settingPhone").value = settings.phone;
  $("settingPhoneDisplay").value = settings.phoneDisplay;
  $("settingFooter").value = settings.footer;
  $("settingHeroImage").value = settings.heroImage;
  previewImage($("heroPreview"), settings.heroImage);
}

function previewImage(img, src) {
  if (!src) {
    img.style.display = "none";
    return;
  }
  img.src = src;
  img.style.display = "block";
  img.onerror = () => img.style.display = "none";
}

function openDrawer(food = null) {
  $("drawerBackdrop").classList.add("open");
  $("formTitle").textContent = food ? "ویرایش غذا" : "افزودن غذا";
  $("foodId").value = food?.id || "";
  $("foodName").value = food?.name || "";
  renderCategorySelect();
  $("foodCategory").value = food?.category || categories.find(c => c.active !== false)?.id || "";
  $("foodPrice").value = food?.price || "";
  $("foodImage").value = food?.image?.startsWith("data:") ? "" : (food?.image || "");
  $("foodShort").value = food?.short || "";
  $("foodDescription").value = food?.description || "";
  $("foodIngredients").value = food?.ingredients?.join("، ") || "";
  $("foodActive").checked = food ? food.active !== false : true;
  previewImage($("foodPreview"), food?.image || "");
}

function closeDrawer() {
  $("drawerBackdrop").classList.remove("open");
  $("foodForm").reset();
  $("foodId").value = "";
  $("foodPreview").style.display = "none";
}

function switchSection(name) {
  document.querySelectorAll(".section").forEach(s => s.classList.remove("active"));
  document.querySelectorAll(".side-link").forEach(s => s.classList.remove("active"));
  $(`${name}Section`)?.classList.add("active");
  document.querySelector(`[data-section="${name}"]`)?.classList.add("active");
  $("pageTitle").textContent = {
    dashboard: "داشبورد",
    foods: "مدیریت غذاها",
    categories: "دسته‌بندی‌ها",
    settings: "تنظیمات منو"
  }[name] || "داشبورد";
}

$("loginForm").addEventListener("submit", e => {
  e.preventDefault();
  if ($("password").value !== ADMIN_PASSWORD) {
    toast("رمز ورود اشتباه است.");
    return;
  }
  sessionStorage.setItem(LOGIN_KEY, "true");
  $("loginScreen").style.display = "none";
  $("adminApp").classList.add("active");
  initialize();
});

$("logoutBtn").addEventListener("click", () => {
  sessionStorage.removeItem(LOGIN_KEY);
  $("adminApp").classList.remove("active");
  $("loginScreen").style.display = "grid";
  $("password").value = "";
});

document.querySelectorAll(".side-link").forEach(link => {
  link.addEventListener("click", () => switchSection(link.dataset.section));
});

document.querySelectorAll(".quick-action").forEach(btn => {
  btn.addEventListener("click", () => switchSection(btn.dataset.go));
});

$("quickAddBtn").addEventListener("click", () => {
  switchSection("foods");
  openDrawer();
});

$("addFoodBtn").addEventListener("click", () => openDrawer());
$("closeDrawer").addEventListener("click", closeDrawer);

$("drawerBackdrop").addEventListener("click", e => {
  if (e.target === $("drawerBackdrop")) closeDrawer();
});

$("foodsTable").addEventListener("click", e => {
  const btn = e.target.closest("[data-action]");
  if (!btn) return;

  const id = Number(btn.dataset.id);
  const food = foods.find(f => f.id === id);
  if (!food) return;

  if (btn.dataset.action === "edit") openDrawer(food);

  if (btn.dataset.action === "toggle") {
    food.active = food.active === false;
    saveAll();
    renderTable();
    updateStats();
    toast(food.active ? "غذا فعال شد." : "غذا غیرفعال شد.");
  }

  if (btn.dataset.action === "delete") {
    if (!confirm(`آیا از حذف «${food.name}» مطمئن هستید؟`)) return;
    foods = foods.filter(f => f.id !== id);
    saveAll();
    renderTable();
    updateStats();
    toast("غذا حذف شد.");
  }
});

$("foodForm").addEventListener("submit", e => {
  e.preventDefault();

  const id = Number($("foodId").value);
  const category = $("foodCategory").value;

  let image = $("foodImage").value.trim();
  if (!image && $("foodPreview").src && $("foodPreview").style.display !== "none") {
    image = $("foodPreview").src;
  }

  if (!image) {
    toast("لطفاً تصویر غذا را انتخاب یا آدرس آن را وارد کنید.");
    return;
  }

  const data = {
    name: $("foodName").value.trim(),
    category,
    categoryName: categoryName(category),
    price: $("foodPrice").value.trim(),
    image,
    short: $("foodShort").value.trim(),
    description: $("foodDescription").value.trim(),
    ingredients: $("foodIngredients").value.split(/[،,]/).map(x => x.trim()).filter(Boolean),
    active: $("foodActive").checked
  };

  if (!data.name || !data.price || !data.short || !data.description) {
    toast("لطفاً فیلدهای ضروری را تکمیل کنید.");
    return;
  }

  if (id) {
    const index = foods.findIndex(f => f.id === id);
    if (index !== -1) foods[index] = { ...foods[index], ...data };
    toast("اطلاعات غذا ویرایش شد.");
  } else {
    foods.unshift({ id: Date.now(), ...data });
    toast("غذای جدید اضافه شد.");
  }

  saveAll();
  renderTable();
  updateStats();
  closeDrawer();
});

$("foodImage").addEventListener("input", e => previewImage($("foodPreview"), e.target.value));

$("foodImageFile").addEventListener("change", e => {
  const file = e.target.files[0];
  if (!file) return;

  if (file.size > 3 * 1024 * 1024) {
    toast("حجم تصویر باید کمتر از ۳ مگابایت باشد.");
    e.target.value = "";
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    $("foodImage").value = "";
    $("foodPreview").src = reader.result;
    $("foodPreview").style.display = "block";
  };
  reader.readAsDataURL(file);
});

$("heroImageFile").addEventListener("change", e => {
  const file = e.target.files[0];
  if (!file) return;

  if (file.size > 4 * 1024 * 1024) {
    toast("حجم تصویر هدر باید کمتر از ۴ مگابایت باشد.");
    e.target.value = "";
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    $("settingHeroImage").value = reader.result;
    previewImage($("heroPreview"), reader.result);
  };
  reader.readAsDataURL(file);
});

$("settingsForm").addEventListener("submit", e => {
  e.preventDefault();

  settings = {
    restaurantName: $("settingName").value.trim(),
    subtitle: $("settingSubtitle").value.trim(),
    description: $("settingDescription").value.trim(),
    phone: $("settingPhone").value.trim(),
    phoneDisplay: $("settingPhoneDisplay").value.trim(),
    footer: $("settingFooter").value.trim(),
    heroImage: $("settingHeroImage").value.trim()
  };

  saveAll();
  toast("تنظیمات منو ذخیره شد.");
});

$("resetSettingsBtn").addEventListener("click", () => {
  if (!confirm("تنظیمات منو به حالت اولیه برگردد؟")) return;
  settings = { ...defaultSettings };
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  fillSettings();
  toast("تنظیمات بازگردانی شد.");
});

$("addCategoryBtn").addEventListener("click", () => openCategoryModal());

$("closeCategoryModal").addEventListener("click", closeCategoryModal);

$("categoryModal").addEventListener("click", e => {
  if (e.target === $("categoryModal")) closeCategoryModal();
});

function openCategoryModal(category = null) {
  $("categoryModal").classList.add("open");
  $("categoryModalTitle").textContent = category ? "ویرایش دسته‌بندی" : "افزودن دسته‌بندی";
  $("categoryOldId").value = category?.id || "";
  $("categoryName").value = category?.name || "";
  $("categoryName").focus();
}

function closeCategoryModal() {
  $("categoryModal").classList.remove("open");
  $("categoryForm").reset();
}

$("categoryForm").addEventListener("submit", e => {
  e.preventDefault();

  const oldId = $("categoryOldId").value;
  const name = $("categoryName").value.trim();
  if (!name) return;

  if (oldId) {
    const category = categories.find(c => c.id === oldId);
    if (!category) return;

    category.name = name;

    foods.forEach(food => {
      if (food.category === oldId) food.categoryName = name;
    });

    toast("دسته‌بندی ویرایش شد.");
  } else {
    let id = name
      .toLowerCase()
      .replace(/[^\w\u0600-\u06FF]+/g, "-")
      .replace(/^-+|-+$/g, "");

    if (!id) id = `category-${Date.now()}`;
    if (categories.some(c => c.id === id)) id = `${id}-${Date.now()}`;

    categories.push({ id, name, active: true });
    toast("دسته‌بندی جدید اضافه شد.");
  }

  saveAll();
  renderCategories();
  renderCategorySelect();
  updateStats();
  closeCategoryModal();
});

$("categoryList").addEventListener("click", e => {
  const btn = e.target.closest("[data-cat-action]");
  if (!btn) return;

  const id = btn.dataset.id;
  const action = btn.dataset.catAction;
  const category = categories.find(c => c.id === id);
  if (!category) return;

  if (action === "toggle") {
    category.active = category.active === false;
    saveAll();
    renderCategories();
    renderCategorySelect();
    updateStats();
    toast(category.active ? "دسته‌بندی فعال شد." : "دسته‌بندی غیرفعال شد.");
  }

  if (action === "edit") openCategoryModal(category);

  if (action === "delete") {
    const used = foods.some(f => f.category === id);
    if (used) {
      toast("این دسته‌بندی دارای غذا است؛ ابتدا غذاها را جابه‌جا یا حذف کنید.");
      return;
    }

    if (!confirm(`دسته‌بندی «${category.name}» حذف شود؟`)) return;

    categories = categories.filter(c => c.id !== id);
    saveAll();
    renderCategories();
    renderCategorySelect();
    updateStats();
    toast("دسته‌بندی حذف شد.");
  }
});

function initialize() {
  foods = read(STORAGE_KEY, []);
  categories = read(CATEGORIES_KEY, defaultCategories);
  settings = { ...defaultSettings, ...read(SETTINGS_KEY, {}) };

  renderTable();
  renderCategories();
  renderCategorySelect();
  fillSettings();
  updateStats();
  switchSection("dashboard");
}

if (sessionStorage.getItem(LOGIN_KEY) === "true") {
  $("loginScreen").style.display = "none";
  $("adminApp").classList.add("active");
  initialize();
}
