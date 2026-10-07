// The Home "quote of the day". The visitor's browser picks one from the local date, so it changes
// every day without a rebuild or a content change.
import type { HomeContent } from './types.js';

export type Quote = HomeContent['quote'];

const QUOTES: Quote[] = [
  { text: 'First, solve the problem. Then, write the code.', author: 'John Johnson' },
  { text: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.', author: 'Martin Fowler' },
  { text: 'Programs must be written for people to read, and only incidentally for machines to execute.', author: 'Harold Abelson' },
  { text: 'Simplicity is prerequisite for reliability.', author: 'Edsger W. Dijkstra' },
  { text: 'Premature optimization is the root of all evil.', author: 'Donald Knuth' },
  { text: 'Talk is cheap. Show me the code.', author: 'Linus Torvalds' },
  { text: 'Make it work, make it right, make it fast.', author: 'Kent Beck' },
  { text: "Code is like humor. When you have to explain it, it's bad.", author: 'Cory House' },
  { text: 'Before software can be reusable it first has to be usable.', author: 'Ralph Johnson' },
  { text: 'Fix the cause, not the symptom.', author: 'Steve Maguire' },
  { text: 'Optimism is an occupational hazard of programming: feedback is the treatment.', author: 'Kent Beck' },
  { text: 'Deleted code is debugged code.', author: 'Jeff Sickel' },
  { text: 'Walking on water and developing software from a specification are easy if both are frozen.', author: 'Edward V. Berard' },
  { text: 'Measuring programming progress by lines of code is like measuring aircraft building progress by weight.', author: 'Bill Gates' },
  { text: "Programming isn't about what you know; it's about what you can figure out.", author: 'Chris Pine' },
  { text: 'Truth can only be found in one place: the code.', author: 'Robert C. Martin' },
  { text: 'Clean code always looks like it was written by someone who cares.', author: 'Michael Feathers' },
  { text: 'The only way to go fast is to go well.', author: 'Robert C. Martin' },
  { text: 'Good code is its own best documentation.', author: 'Steve McConnell' },
  { text: 'Computers are good at following instructions, but not at reading your mind.', author: 'Donald Knuth' },
  { text: 'The function of good software is to make the complex appear to be simple.', author: 'Grady Booch' },
  { text: 'If debugging is the process of removing software bugs, then programming must be the process of putting them in.', author: 'Edsger W. Dijkstra' },
  { text: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.', author: 'Brian Kernighan' },
  { text: 'Controlling complexity is the essence of computer programming.', author: 'Brian Kernighan' },
  { text: 'The best error message is the one that never shows up.', author: 'Thomas Fuchs' },
  { text: "Don't comment bad code — rewrite it.", author: 'Brian Kernighan & P. J. Plauger' },
  { text: 'One of my most productive days was throwing away 1,000 lines of code.', author: 'Ken Thompson' },
  { text: 'When in doubt, use brute force.', author: 'Ken Thompson' },
  { text: 'Simple things should be simple, complex things should be possible.', author: 'Alan Kay' },
  { text: 'Learning to write programs stretches your mind, and helps you think better.', author: 'Bill Gates' },
  { text: 'Everybody should learn to program a computer, because it teaches you how to think.', author: 'Steve Jobs' },
  { text: 'Without requirements or design, programming is the art of adding bugs to an empty text file.', author: 'Louis Srygley' },
  { text: "It's harder to read code than to write it.", author: 'Joel Spolsky' },
  { text: 'Software and cathedrals are much the same — first we build them, then we pray.', author: 'Sam Redwine' },
  { text: 'Code never lies, comments sometimes do.', author: 'Ron Jeffries' },
  { text: "A language that doesn't affect the way you think about programming is not worth knowing.", author: 'Alan Perlis' },
  { text: 'Simplicity does not precede complexity, but follows it.', author: 'Alan Perlis' },
  { text: 'Bad programmers worry about the code. Good programmers worry about data structures and their relationships.', author: 'Linus Torvalds' },
  { text: 'Every great developer you know got there by solving problems they were unqualified to solve until they actually did it.', author: 'Patrick McKenzie' },
  { text: 'The most important property of a program is whether it accomplishes the intention of its user.', author: 'C. A. R. Hoare' },
  { text: 'Inside every large program, there is a small program trying to get out.', author: 'C. A. R. Hoare' },
  { text: 'Copy and paste is a design error.', author: 'David Parnas' },
  { text: 'Great software today is often preferable to perfect software tomorrow.', author: 'Andrew Hunt & David Thomas' },
  { text: "Don't live with broken windows.", author: 'Andrew Hunt & David Thomas' },
  { text: 'The art of programming is the art of organizing complexity.', author: 'Edsger W. Dijkstra' },
  { text: 'Program testing can be used to show the presence of bugs, but never to show their absence.', author: 'Edsger W. Dijkstra' },
  { text: 'Adding manpower to a late software project makes it later.', author: 'Fred Brooks' },
  { text: 'Plan to throw one away; you will, anyhow.', author: 'Fred Brooks' },
  { text: 'There are only two hard things in Computer Science: cache invalidation and naming things.', author: 'Phil Karlton' },
  { text: 'Make each program do one thing well.', author: 'Doug McIlroy' },
  { text: 'A good programmer is someone who always looks both ways before crossing a one-way street.', author: 'Doug Linder' },
  { text: 'If you think good architecture is expensive, try bad architecture.', author: 'Brian Foote & Joseph Yoder' },
  { text: 'Working software is the primary measure of progress.', author: 'Agile Manifesto' },
  { text: 'Legacy code is simply code without tests.', author: 'Michael Feathers' },
  { text: 'Always leave the campground cleaner than you found it.', author: 'Robert C. Martin' },
  { text: 'The computer programmer is a creator of universes for which he alone is the lawgiver.', author: 'Joseph Weizenbaum' },
  { text: 'Programming is not about typing, it is about thinking.', author: 'Rich Hickey' },
  { text: 'Software is a great combination between artistry and engineering.', author: 'Bill Gates' },
  { text: 'Weeks of programming can save you hours of planning.', author: 'Unknown' },
  { text: 'Code is read much more often than it is written.', author: 'Guido van Rossum' },
  { text: 'Readability counts.', author: 'Tim Peters' },
  { text: 'Errors should never pass silently.', author: 'Tim Peters' },
  { text: 'Explicit is better than implicit.', author: 'Tim Peters' },
  { text: 'There are two ways to write error-free programs; only the third one works.', author: 'Alan Perlis' },
  { text: 'Beware of bugs in the above code; I have only proved it correct, not tried it.', author: 'Donald Knuth' },
  { text: 'Programming is the art of telling another human being what one wants the computer to do.', author: 'Donald Knuth' },
  { text: 'The best code is no code at all.', author: 'Jeff Atwood' },
  { text: 'Duplication may be the root of all evil in software.', author: 'Robert C. Martin' },
  { text: 'Functions should do one thing. They should do it well. They should do it only.', author: 'Robert C. Martin' },
  { text: 'The ratio of time spent reading versus writing code is well over 10 to 1.', author: 'Robert C. Martin' },
  { text: 'Refactoring is a controlled technique for improving the design of an existing code base.', author: 'Martin Fowler' },
  { text: "The cheapest, fastest, and most reliable components are those that aren't there.", author: 'Gordon Bell' },
  { text: 'Good programmers know what to write. Great ones know what to rewrite (and reuse).', author: 'Eric S. Raymond' },
  { text: 'Given enough eyeballs, all bugs are shallow.', author: 'Eric S. Raymond' },
  { text: 'Smart data structures and dumb code works a lot better than the other way around.', author: 'Eric S. Raymond' },
  { text: 'For each desired change, make the change easy (warning: this may be hard), then make the easy change.', author: 'Kent Beck' },
  { text: "I'm not a great programmer; I'm just a good programmer with great habits.", author: 'Kent Beck' },
  { text: "Data dominates. If you've chosen the right data structures and organized things well, the algorithms will almost always be self-evident.", author: 'Rob Pike' },
  { text: 'Clear is better than clever.', author: 'Rob Pike' },
  { text: 'Fancy algorithms are slow when n is small, and n is usually small.', author: 'Rob Pike' },
  { text: 'Always implement things when you actually need them, never when you just foresee that you need them.', author: 'Ron Jeffries' },
  { text: 'The first 90 percent of the code accounts for the first 90 percent of the development time. The remaining 10 percent of the code accounts for the other 90 percent of the development time.', author: 'Tom Cargill' },
  { text: 'Hardware eventually fails. Software eventually works.', author: 'Michael Hartung' },
];

const MS_PER_DAY = 86_400_000;

/** The quotes on offer: the list, plus the quote set in the admin when it isn't already in it. */
function quotePool(adminQuote: Quote): Quote[] {
  return adminQuote.text && !QUOTES.some((q) => q.text === adminQuote.text) ? [adminQuote, ...QUOTES] : QUOTES;
}

/**
 * Today's quote, chosen by the visitor's local date: each consecutive day gets the next quote, and
 * the list repeats after it runs out.
 */
export function quoteOfTheDay(adminQuote: Quote, date = new Date()): Quote {
  const pool = quotePool(adminQuote);
  const day = Math.floor(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / MS_PER_DAY);
  return pool[day % pool.length];
}

/** A random quote other than the one showing, for the Home refresh button. */
export function anotherQuote(adminQuote: Quote, current: Quote): Quote {
  const others = quotePool(adminQuote).filter((q) => q.text !== current.text);
  return others[Math.floor(Math.random() * others.length)] ?? current;
}
