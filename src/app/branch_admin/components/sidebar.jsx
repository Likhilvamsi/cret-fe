import Link from "next/link";
export default function Sidebar() {
  return (
    <div className="flex flex-col justify-between h-full">

      <div>
        {/* Profile */}
        <div className="flex items-center gap-3 mb-12">
          <img src="/avatar.png" className="w-12 h-12 rounded-full" />
          <div>
            <h3 className="font-bold text-text-primary">CRT Platform</h3>
            <p className="text-text-secondary text-sm">Admin</p>
          </div>
        </div>

        {/* Menu */}
        <ul className="space-y-4 text-[17px] cursor-pointer">
          <li className="text-accent-red font-semibold"><Link href="/dashboard">Dashboard</Link></li>
        </ul>
      </div>

      <button className="text-text-secondary mt-10 cursor-pointer"><Link href="/login">Log out</Link></button>
    </div>
  );
}
