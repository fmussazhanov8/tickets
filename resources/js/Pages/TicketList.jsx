import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function TicketList({ auth ,list,tickets}) {
    console.log(tickets);
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">TicketList</h2>}
        >
            <Head title="TicketList" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-5">
                        <ul role="list" className="divide-y divide-gray-100">
                            {tickets.map((ticket) => (
                                <li key={ticket.id} className="flex justify-between gap-x-6 py-5">
                                    <div className="flex min-w-0 gap-x-4">
                                        <div className="min-w-0 flex-auto">
                                            <p className="text font-semibold leading-6 text-gray-900">{ticket.FirstName} {ticket.LastName} <span className="mt-1 truncate text-xs leading-5 text-gray-500">{ticket.email}</span></p>
                                            <p className="text-sm font-semibold leading-6 text-gray-900">{ticket.title}</p>
                                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">{ticket.message}</p>
                                        </div>
                                    </div>
                                    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                        <p className="text-sm leading-6 text-gray-900">{ticket.category_name}</p>

                                            <div className="mt-1 flex items-center gap-x-1.5">
                                                <p className="text-xs leading-5 text-gray-500">{ticket.created_at}</p>
                                                {
                                                    ticket.isClosed == 0 ? <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                                                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                                    </div> :  <div className="flex-none rounded-full bg-red-500/20 p-1">
                                                        <div className="h-1.5 w-1.5 rounded-full bg-red-500" />
                                                    </div>
                                                }

                                            </div>

                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
