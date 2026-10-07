// The Home "quote of the day". The quotes come from the content (the Home page quote plus the
// Quotes collection, both edited in the admin); the visitor's browser picks one from the local
// date, so it changes every day without a rebuild.

export type QuoteView = { text: string; author: string };

const MS_PER_DAY = 86_400_000;

/**
 * Today's quote, chosen by the visitor's local date: each consecutive day gets the next quote, and
 * the list repeats after it runs out. Undefined when there are no quotes.
 */
export function quoteOfTheDay(quotes: QuoteView[], date = new Date()): QuoteView | undefined {
  const day = Math.floor(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / MS_PER_DAY);
  return quotes[day % quotes.length];
}

/** A random quote other than the one showing, for the Home refresh button. */
export function anotherQuote(quotes: QuoteView[], current: QuoteView): QuoteView {
  const others = quotes.filter((q) => q.text !== current.text);
  return others[Math.floor(Math.random() * others.length)] ?? current;
}
