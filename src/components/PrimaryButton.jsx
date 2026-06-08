import { Link } from 'react-router-dom';

export default function PrimaryButton({ to, children, onClick, type = 'button' }) {
  const className =
    'inline-flex items-center justify-center rounded-full bg-[#28173f] px-5 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-[#352055]';

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
