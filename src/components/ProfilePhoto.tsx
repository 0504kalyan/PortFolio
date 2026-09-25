import { useState, type ReactNode } from 'react';
import { profile } from '../data/resume';

/** Shows profile.photo when it is set and loads; otherwise renders the fallback. */
export function ProfilePhoto({ className, fallback = null }: { className: string; fallback?: ReactNode }) {
  const [failed, setFailed] = useState(false);

  if (!profile.photo || failed) return <>{fallback}</>;

  return (
    <div className={className}>
      <img src={profile.photo} alt={profile.name} onError={() => setFailed(true)} />
    </div>
  );
}
