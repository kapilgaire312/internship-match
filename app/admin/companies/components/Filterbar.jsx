
import Link from "next/link";


export default function FilterBar({ filter, search }) {
  const navItems = [
    { name: 'All', href: '/admin/companies' },
    { name: 'Pending', href: '/admin/companies?filter=pending' },
    { name: 'Approved', href: '/admin/companies?filter=approved' },
    { name: 'Rejected', href: '/admin/companies?filter=rejected' },
    { name: 'Blacklisted', href: '/admin/companies?filter=blacklisted' },
  ];
  return (
    <nav className="flex items-center gap-4">
      {navItems.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={`text-gray-700   hover:underline ${item.name.toLowerCase() === filter ? 'font-medium text-blue-500' : 'text-gray-600'} transition-all ease-in-out duration-200`}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
}