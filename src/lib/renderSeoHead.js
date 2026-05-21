import { seo } from '../data/seo.js';

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

export function renderSeoHead() {
  const keywords = seo.keywords.join(', ');
  const jsonLd = JSON.stringify(seo.jsonLd).replace(/</g, '\\u003c');

  return [
    `<meta name="viewport" content="width=device-width, initial-scale=1.0" />`,
    `<meta name="description" content="${escapeHtml(seo.description)}" />`,
    `<meta name="keywords" content="${escapeHtml(keywords)}" />`,
    `<meta name="author" content="${escapeHtml(seo.author)}" />`,
    `<meta name="robots" content="index, follow, max-image-preview:large" />`,
    `<meta name="theme-color" content="${seo.themeColor}" />`,
    `<link rel="canonical" href="${seo.canonicalUrl}" />`,
    `<title>${escapeHtml(seo.title)}</title>`,
    `<link rel="icon" type="image/png" href="/chrono.png" />`,
    `<link rel="apple-touch-icon" href="/og/jon-marien.jpg" />`,
    `<link rel="alternate" type="application/pdf" href="${seo.resumePdf.href}" title="${escapeHtml(seo.resumePdf.title)}" />`,
    `<link rel="me" href="https://github.com/jondmarien" />`,
    `<link rel="me" href="https://linkedin.com/in/jondmarien" />`,
    `<meta property="og:type" content="${seo.og.type}" />`,
    `<meta property="og:url" content="${seo.canonicalUrl}" />`,
    `<meta property="og:locale" content="${seo.locale}" />`,
    `<meta property="og:title" content="${escapeHtml(seo.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(seo.description)}" />`,
    `<meta property="og:site_name" content="${escapeHtml(seo.siteName)}" />`,
    `<meta property="og:image" content="${seo.og.image}" />`,
    `<meta property="og:image:secure_url" content="${seo.og.image}" />`,
    `<meta property="og:image:alt" content="${escapeHtml(seo.og.imageAlt)}" />`,
    `<meta property="og:image:width" content="${seo.og.imageWidth}" />`,
    `<meta property="og:image:height" content="${seo.og.imageHeight}" />`,
    `<meta name="twitter:card" content="${seo.twitter.card}" />`,
    `<meta name="twitter:url" content="${seo.canonicalUrl}" />`,
    `<meta name="twitter:title" content="${escapeHtml(seo.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(seo.description)}" />`,
    `<meta name="twitter:image" content="${seo.og.image}" />`,
    `<meta name="twitter:image:alt" content="${escapeHtml(seo.og.imageAlt)}" />`,
    `<script type="application/ld+json">${jsonLd}</script>`,
  ].join('\n  ');
}
