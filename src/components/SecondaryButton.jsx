import { Link } from 'react-router-dom';

export default function SecondaryButton({ to, children, onClick, type = 'button' }) {
  const className =
    'inline-flex items-center justify-center rounded-full border border-[#d7c9e8] bg-white/70 px-5 py-3 text-sm font-medium text-[#3a3250] transition hover:bg-white';

  if (to) {
    return (
      <Link to={to} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={className}>
      {children}
    </button>
  );
}
