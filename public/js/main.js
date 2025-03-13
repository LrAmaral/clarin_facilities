class MobileNavBar {
  constructor(mobileMenu, menuItems) {
    this.mobileMenu = document.querySelector(mobileMenu);
    this.menuItems = document.querySelector(menuItems);
    this.activeClass = "active";

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.menuItems.classList.toggle(this.activeClass);
  }

  addClickEvent() {
    this.mobileMenu.addEventListener("click", this.handleClick);
  }

  init() {
    if (this.mobileMenu) {
      this.addClickEvent();
    }
    return this;
  }
}

const mobileNavBar = new MobileNavBar(".mobile-menu", ".nav-list");
mobileNavBar.init();