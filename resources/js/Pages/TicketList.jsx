import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, useForm} from '@inertiajs/react';

export default function TicketList({ auth ,error,tickets}) {
    console.log(tickets);
    const {get } = useForm({});
    const exactTicket = (id) => {
        get(route('ticket',id));
    }
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">TicketList</h2>}
        >
            <Head title="TicketList" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8" style={{paddingLeft:"80%",margin:"1.5rem 0"}}>
                    <div>
                        <a href={route('newticket')} className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            Новый тикет
                        </a>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {
                        error &&
                        <div className="bg-white mb-5 overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900">
                                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                                    <strong className="font-bold">Ошибка!</strong>
                                    <span className="block sm:inline"> {error}</span>
                                </div>
                            </div>
                        </div>

                    }
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-5">
                        <ul role="list" className="divide-y divide-gray-100">
                            {
                                tickets.length?false:<h2 className="font-semibold text-xl text-gray-800 leading-tight">Список пуст</h2>
                            }
                            {tickets.map((ticket) => (
                                <li style={{cursor:"pointer"}} key={ticket.id} onClick={()=>exactTicket(ticket.id)} className="flex justify-between gap-x-6 py-5">
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
