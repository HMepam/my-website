import { createOptimizedPicture } from '../../scripts/lib-franklin.js';

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    li.innerHTML = row.innerHTML;
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) {
        div.className = 'menu-item-icon';
      } else {
        div.className = 'menu-item-body';
      }
    });
    ul.append(li);
  });
  ul.querySelectorAll('img')
    .forEach((img) => (
      img.closest('picture')
        .replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ with: 1 }]))
    ));
  block.textContent = '';
  block.append(ul);
}
