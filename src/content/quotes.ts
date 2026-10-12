// The Home quote comes from the Home page quote and Quotes collection, both edited in the admin.

export type QuoteView = { text: string; author: string };

const STORAGE_KEY = 'portfolio:last-home-quote';

/**
 * Picks a random quote on page load, avoiding the previous quote in this tab when possible.
 */
export function quoteOnRefresh(quotes: QuoteView[]): QuoteView | undefined {
  if (!quotes.length) return undefined;
  try {
    const previousText = sessionStorage.getItem(STORAGE_KEY);
    const previous = quotes.find((quote) => quote.text === previousText);
    if (previous) return anotherQuote(quotes, previous);
  } catch {
    // Storage may be unavailable; a random quote still works.
  }
  return quotes[Math.floor(Math.random() * quotes.length)];
}

export function rememberQuote(quote: QuoteView | undefined): void {
  if (!quote) return;
  try {
    sessionStorage.setItem(STORAGE_KEY, quote.text);
  } catch {
    // Storage is optional; quote selection still works for this page load.
  }
}

/** A random quote other than the one showing, for the Home refresh button. */
export function anotherQuote(quotes: QuoteView[], current: QuoteView): QuoteView {
  const others = quotes.filter((q) => q.text !== current.text);
  return others[Math.floor(Math.random() * others.length)] ?? current;
}
