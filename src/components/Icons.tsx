type P = { size?: number };

export const Logo = ({ size = 16 }: P) => (
  <svg width={size} height={size} viewBox="0 0 16 16" aria-hidden="true">
    <path fill="currentColor" fillRule="evenodd" d="M8 0h8v8H8V0Zm3 3v2h2V3h-2ZM0 5h8v6H0V5Zm0 7h4v4H0v-4Z" />
  </svg>
);

export const MailIcon = ({ size = 32 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
    <rect x="3" y="5" width="18" height="14" rx="1.5" />
    <path d="m3.5 6 8.5 7 8.5-7" />
  </svg>
);

export const PhoneIcon = ({ size = 32 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1L6.6 10.8Z" />
  </svg>
);

export const PinIcon = ({ size = 32 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" />
  </svg>
);

export const FileIcon = ({ size = 32 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
    <path d="M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8l-5-5Z" />
    <path d="M14 3v5h5M12 11v6m-3-3 3 3 3-3" />
  </svg>
);

export const CloseIcon = ({ size = 24 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <path d="M4 4l16 16M20 4 4 20" />
  </svg>
);

export const QuoteIcon = () => (
  <svg width="26" height="21" viewBox="0 0 26 21" fill="currentColor" aria-hidden="true">
    <path d="M0 21V12.6C0 5.7 3.3 1.5 9.9 0l1.2 2.7C8 3.8 6.4 5.9 6.2 9h5v12H0Zm14.6 0V12.6C14.6 5.7 17.9 1.5 24.5 0l1.2 2.7C22.6 3.8 21 5.9 20.8 9h5v12H14.6Z" />
  </svg>
);
