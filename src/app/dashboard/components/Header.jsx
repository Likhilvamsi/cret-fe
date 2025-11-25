export default function DashboardPage() {
    return (
        <div className="space-y-10">
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-5xl font-heading">Swarnandhra  </h1>
                    <div className="flex gap-18 mt-8">
                        <div className="flex flex-col gap-1">
                            <p className="text-sm text-text-secondary ">Views</p>
                            <h2 className="text-2xl ">27,6m</h2>
                        </div>
                        <div className="flex flex-col gap-1">
                            <p className="text-sm text-text-secondary">Followers</p>
                            <h2 className="text-2xl ">219,3k</h2>
                        </div>
                        <div className="flex flex-col gap-1">
                            <p className="text-sm text-text-secondary">Reposts</p>
                            <h2 className="text-2xl ">1,5k</h2>
                        </div>
                    </div>
                </div>
                <div className="bg-sidebar-bg rounded-3xl p-6 w-[350px] shadow-xl shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
                    <div className="flex items-center gap-3 mb-3">
                        <img src="/avatar.png" className="w-8 h-8 rounded-full" />
                        <p className="text-sm text-text-secondary">Siva Doodi</p>
                    </div>
                    <h3 className="text-xl font-heading text-text-primary">Mechanical Engineering</h3>
                    <p className="text-text-secondary text-sm">1 year c section</p>
                    <div className="mt-5 flex gap-2 justify-between items-center">
                        <div className="flex gap-2">
                            <div className="w-4 h-2 rounded-full bg-accent-teal"></div>
                            <div className="w-4 h-2 rounded-full bg-accent-orange"></div>
                            <div className="w-4 h-2 rounded-full bg-accent-blue"></div>
                        </div>
                        <div className="w-25 h-10 text-[11px] bg-accent-red rounded-full text-white flex items-center justify-center font-semibold">
                            19A25B0347
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
