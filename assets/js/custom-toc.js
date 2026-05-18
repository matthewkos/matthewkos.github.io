(function () {
  document.addEventListener('DOMContentLoaded', function () {
    // 根據實際結構調整容器選擇器：Chirpy 一般是 .post-content 或 .content
    const content = document.querySelector('.post-content, .content');
    const tocContainer = document.querySelector('#custom-toc');

    if (!content || !tocContainer) return;

    const headings = content.querySelectorAll('h1, h2, h3, h4, h5, h6');
    if (!headings.length) return;

    const list = document.createElement('ul');
    list.className = 'custom-toc-list';

    headings.forEach((h) => {
      if (!h.id) {
        h.id = h.textContent
          .trim()
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-');
      }

      const level = parseInt(h.tagName.substring(1), 10);

      const li = document.createElement('li');
      li.className = 'toc-level-' + level;

      const a = document.createElement('a');
      a.href = '#' + h.id;
      a.textContent = h.textContent;

      li.appendChild(a);
      list.appendChild(li);
    });

    tocContainer.appendChild(list);
  });
})();
