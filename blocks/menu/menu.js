import { createOptimizedPicture } from '../../scripts/lib-franklin.js';

export default function decorate(block) {
  /* change to ul, li */
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
        elem.className = 'display-none';
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
  block.textContent = '';
  block.append(ul);
}
