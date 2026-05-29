document.addEventListener("DOMContentLoaded", () => {

  const header = document.querySelector(".header");
  const toggle = document.querySelector(".header__toggle");
  const navLinks = document.querySelectorAll(".header__nav a");
  const contactForm = document.querySelector("#contactForm");

  // ハンバーガー開閉
  if (toggle && header) {
    toggle.addEventListener("click", () => {
      header.classList.toggle("open");

      if (header.classList.contains("open")) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    });
  }

  // メニュークリックで閉じる
  if (navLinks.length > 0 && header) {
    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        header.classList.remove("open");
        document.body.style.overflow = "";
      });
    });
  }

  // 外クリックで閉じる
  document.addEventListener("click", (e) => {
    if (header && toggle) {
      if (!header.contains(e.target) && header.classList.contains("open")) {
        header.classList.remove("open");
        document.body.style.overflow = "";
      }
    }
  });

  // Escキーで閉じる（UX強化）
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && header) {
      header.classList.remove("open");
      document.body.style.overflow = "";
    }
  });

  if (window.location.hash) {
    const target = document.querySelector(window.location.hash);
    if (target) {
      const scrollToTarget = () => target.scrollIntoView({ behavior: "auto", block: "start" });
      setTimeout(scrollToTarget, 300);
      window.addEventListener("load", () => {
        setTimeout(scrollToTarget, 800);
      });
    }
  }

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const formData = new FormData(contactForm);
      const name = String(formData.get("name") || "").trim();
      const email = String(formData.get("email") || "").trim();
      const type = String(formData.get("type") || "").trim();
      const message = String(formData.get("message") || "").trim();

      if (!name || !email || !type || !message) {
        contactForm.reportValidity();
        return;
      }

      const subject = `【Web制作のご相談】${type}について`;
      const body = [
        "KOTA Web Design 末次様",
        "",
        "ポートフォリオサイトを拝見し、下記内容で相談したくご連絡いたしました。",
        "",
        "■ お名前 / 店舗名",
        name,
        "",
        "■ メールアドレス",
        email,
        "",
        "■ ご相談内容",
        type,
        "",
        "■ 詳細",
        message,
        "",
        "------------------------------",
        "送信元：KOTA Web Design ポートフォリオ",
      ].join("\n");

      const mailtoUrl = `mailto:kota.webdesign.contact@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      window.location.href = mailtoUrl;
    });
  }

});
