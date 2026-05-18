document.addEventListener('DOMContentLoaded', () => {
  if (typeof tocbot === 'undefined') return;

  const articleContent = document.querySelector('.content');
  const tocContent =
    document.querySelector('#toc') ||
    document.querySelector('#toc-wrapper') ||
    document.querySelector('#toc-popup-content');

  if (!articleContent || !tocContent) return;

  try {
    tocbot.destroy();
  } catch (e) {}

  tocbot.init({
    tocSelector: '#toc',
    contentSelector: '.content',
    headingSelector: 'h1, h2, h3, h4, h5, h6',
    collapseDepth: 6,
    orderedList: false,
    scrollSmooth: false,
    hasInnerContainers: true,
  });
});
