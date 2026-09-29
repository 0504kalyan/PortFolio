import { Component, type ReactNode } from 'react';

type Props = { children: ReactNode; fallback: ReactNode };

/** Shows `fallback` instead of a blank page if rendering throws (e.g. malformed content). */
export class ErrorBoundary extends Component<Props, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: unknown) {
    console.error('Portfolio failed to render', error);
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

export function ContentUnavailable() {
  return (
    <main className="section">
      <div className="container">
        <h2>This portfolio is temporarily unavailable.</h2>
        <p>Please try again in a few minutes.</p>
      </div>
    </main>
  );
}
