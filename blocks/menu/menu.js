import { createOptimizedPicture } from '../../scripts/lib-franklin.js';

export default function decorate(block) {
  const logo = block.firstElementChild.children[0].cloneNode(true);
  logo.className = 'logo';
  const menuIcon = block.lastElementChild.children[0].cloneNode(true);
  menuIcon.className = 'icon';
  const hamburger = document.createElement('div');
  hamburger.className = 'hamburger';
  const iconWrapper = document.createElement('div');
  iconWrapper.className = 'icon-wrapper';
  iconWrapper.append(menuIcon);
  const resources = document.createElement('div');
  resources.className = 'resources';
  const span = document.createElement('span');
  resources.append(span);
  span.innerText = 'RESOURCES';
  hamburger.append(resources, iconWrapper);
  block.removeChild(block.lastElementChild);

  const mobileMenu = document.createElement('div');
  mobileMenu.className = 'mobile-menu';
  mobileMenu.append(logo, hamburger);

  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const div = document.createElement('div');
    div.innerHTML = row.innerHTML;
    div.className = 'menu-item';
    let link;
    [...div.children].forEach((elem) => {
      if (elem.children.length === 1 && elem.querySelector('picture')) {
        if (elem.children[0].hasAttribute('href')) {
          link = elem.children[0].href;
        }
        elem.className = 'menu-item-icon';
      } else if (elem.children.length === 0) {
        elem.className = 'G-none';
      } else {
        elem.className = 'menu-item-body';
      }
    });
    const li = document.createElement('li');
    li.append(div);
    if (link) {
      li.addEventListener('click', () => {
        window.location.href = link;
      });
    }
    ul.append(li);
  });
  ul.querySelectorAll('img')
    .forEach((img) => (
      img.closest('picture')
        .replaceWith(
          createOptimizedPicture(img.src, img.alt, false, [{ with: 1 }]),
        )
    ));

  const mobileView = document.createElement('div');
  mobileView.className = 'mobile';
  const desktopView = document.createElement('div');
  desktopView.className = 'desktop';

  const menuList = document.createElement('div');
  menuList.className = 'list';

  const listCover = document.createElement('div');
  const listWrapper = document.createElement('div');
  listCover.className = 'list-cover';
  listWrapper.className = 'list-wrapper';

  listCover.addEventListener('click', () => {
    document.body.classList.remove('modal-open');
    const list = document.getElementsByClassName('list-wrapper');
    list[0].style.display = 'none';
  });

  hamburger.addEventListener('click', () => {
    const list = document.getElementsByClassName('list-wrapper');
    list[0].style.display = 'unset';
    document.body.classList.add('modal-open');
  });

  desktopView.append(ul.cloneNode(true));
  menuList.append(ul.cloneNode(true));
  listWrapper.append(menuList, listCover);
  mobileView.append(mobileMenu, listWrapper);

  block.textContent = '';
  block.append(desktopView, mobileView);
}
