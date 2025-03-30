"use client";

export default function UsersPanel({
    allUsers = [],
    properties = [],
    orders = [],
    allLeaseOrders = [],
}) {
    return (
        <div className="h-screen flex flex-col p-4 gap-4">
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Chats</h2>
                <div className="w-full flex gap-4">
                    <input
                        type="text"
                        placeholder="Buscar por nombre, apellido, email o room..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="border rounded px-3 py-2 w-96"
                    />

                    <button
                        onClick={handleOpenModalCreate}
                        className="w-[10rem] h-12 bg-[#0E1863] rounded-lg text-white flex justify-center items-center font-normal text-base self-center"
                    >
                        Crear chat
                    </button>
                </div>
            </div>
        </div>
    );
}
