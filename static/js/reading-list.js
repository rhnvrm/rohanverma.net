(function() {
  'use strict';

  const section = document.querySelector('[data-reading-list-feed], [data-reading-list-notes-feed], [data-reading-list-digests-feed]');
  if (!section || !window.DOMParser || !window.fetch) return;

  const feedUrl = section.getAttribute('data-reading-list-feed');
  const notesFeedUrl = section.getAttribute('data-reading-list-notes-feed');
  const digestsFeedUrl = section.getAttribute('data-reading-list-digests-feed');
  const splitFeeds = Boolean(notesFeedUrl && digestsFeedUrl);
  const lists = {
    notes: section.querySelector('[data-reading-list-items="notes"]'),
    digests: section.querySelector('[data-reading-list-items="digests"]')
  };
  const limits = { notes: 6, digests: 4 };

  function text(node, selector) {
    const match = node.querySelector(selector);
    return match ? match.textContent.trim() : '';
  }

  function formatDate(value) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return '';

    return new Intl.DateTimeFormat('en', {
      month: 'short',
      day: 'numeric'
    }).format(date);
  }

  function readFeed(xmlText, fallbackKind) {
    const doc = new DOMParser().parseFromString(xmlText, 'application/xml');
    if (doc.querySelector('parsererror')) {
      throw new Error('Could not parse reading-list feed');
    }

    return Array.from(doc.querySelectorAll('item')).map((item) => {
      const link = text(item, 'link');
      const kind = fallbackKind || (link.includes('/digests/') ? 'digests' : 'notes');

      return {
        kind,
        title: text(item, 'title'),
        href: link,
        date: text(item, 'pubDate'),
      };
    });
  }

  function renderItem(item) {
    const row = document.createElement('li');
    row.className = 'recent-update-item';

    const time = document.createElement('time');
    time.dateTime = item.date;
    time.textContent = formatDate(item.date);

    const link = document.createElement('a');
    link.href = item.href;
    link.textContent = item.title;

    const kind = document.createElement('span');
    kind.className = 'update-type';
    kind.textContent = item.kind === 'digests' ? 'digest' : 'note';

    row.append(time, link);
    if (!splitFeeds) row.appendChild(kind);
    return row;
  }

  function render(items) {
    Object.entries(lists).forEach(([kind, list]) => {
      if (!list) return;

      const entries = items.filter((item) => item.kind === kind).slice(0, limits[kind]);
      if (!entries.length) {
        list.replaceChildren(statusItem('No recent reading found.'));
        return;
      }

      list.replaceChildren(...entries.map(renderItem));
    });
  }

  function statusItem(message) {
    const item = document.createElement('li');
    item.className = 'recent-update-item reading-list-status';
    item.textContent = message;
    return item;
  }

  function renderFailure() {
    Object.values(lists).forEach((list) => {
      if (list) list.replaceChildren(statusItem('Reading list unavailable.'));
    });
  }

  function fetchFeed(url, kind) {
    return fetch(url, { mode: 'cors' })
      .then((response) => {
        if (!response.ok) throw new Error('Reading-list feed request failed');
        return response.text();
      })
      .then((xml) => readFeed(xml, kind));
  }

  const requests = [];
  if (notesFeedUrl) requests.push(fetchFeed(notesFeedUrl, 'notes'));
  if (digestsFeedUrl) requests.push(fetchFeed(digestsFeedUrl, 'digests'));
  if (!requests.length && feedUrl) requests.push(fetchFeed(feedUrl, null));
  if (!requests.length) {
    renderFailure();
    return;
  }

  Promise.allSettled(requests)
    .then((results) => {
      const items = results
        .filter((result) => result.status === 'fulfilled')
        .flatMap((result) => result.value);
      if (!items.length) throw new Error('No reading-list feeds loaded');
      render(items);
    })
    .catch(renderFailure);
})();
