import { createOptimizedPicture } from '../../scripts/lib-franklin.js';

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    li.innerHTML = row.innerHTML;
    let link;
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) {
        if (div.children[0].hasAttribute('href')) {
          link = div.children[0].href;
        }
        div.className = 'menu-item-icon';
      } else if (div.children.length === 0) {
        div.className = 'display-none';
      } else {
        div.className = 'menu-item-body';
      }
    });
    li.addEventListener('click', () => {
      window.location.href = link;
    });
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
