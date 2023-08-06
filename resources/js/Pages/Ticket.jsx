import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, useForm} from '@inertiajs/react';
import { PaperClipIcon } from '@heroicons/react/20/solid'
export default function Ticket({ auth,ticket,responses }) {

    const { data, setData, post, processing, errors, reset } = useForm({
        message: '',
        ticketId:ticket.id
    });
    const submit = (e) => {
        e.preventDefault();
        // console.log(data)
        post(route('post.newresponse'));
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div>
                                <div className="px-4 sm:px-0">
                                    <h3 className="text-base font-semibold leading-7 text-gray-900">Ticket {ticket.id}</h3>
                                    <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">{ticket.created_at}</p>
                                    <div className="mt-1 flex items-center gap-x-1.5">
                                        {
                                            ticket.isClosed == 0 ? <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                                                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                            </div> :  <div className="flex-none rounded-full bg-red-500/20 p-1">
                                                <div className="h-1.5 w-1.5 rounded-full bg-red-500" />
                                            </div>
                                        }
                                    </div>
                                </div>

                                <div className="mt-6 border-t border-gray-100">
                                    <dl className="divide-y divide-gray-100">
                                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                            <dt className="text-sm font-medium leading-6 text-gray-900">ФИО</dt>
                                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{ticket.FirstName} {ticket.LastName}</dd>
                                        </div>
                                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                            <dt className="text-sm font-medium leading-6 text-gray-900">Email </dt>
                                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{ticket.email}</dd>
                                        </div>
                                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                            <dt className="text-sm font-medium leading-6 text-gray-900">Тема</dt>
                                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{ticket.title}</dd>
                                        </div>
                                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                            <dt className="text-sm font-medium leading-6 text-gray-900">Текст сообщения</dt>
                                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                                {ticket.message}
                                            </dd>
                                        </div>
                                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                            <dt className="text-sm font-medium leading-6 text-gray-900">Attachments</dt>
                                            <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                                {
                                                    ticket.attachments
                                                        ?<ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
                                                        <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                                                            <div className="flex w-0 flex-1 items-center">
                                                                <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                                                <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                                                    <span className="truncate font-medium">resume_back_end_developer.pdf</span>
                                                                    <span className="flex-shrink-0 text-gray-400">2.4mb</span>
                                                                </div>
                                                            </div>
                                                            <div className="ml-4 flex-shrink-0">
                                                                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                                                    Download
                                                                </a>
                                                            </div>
                                                        </li>
                                                        <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                                                            <div className="flex w-0 flex-1 items-center">
                                                                <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                                                <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                                                    <span className="truncate font-medium">coverletter_back_end_developer.pdf</span>
                                                                    <span className="flex-shrink-0 text-gray-400">4.5mb</span>
                                                                </div>
                                                            </div>
                                                            <div className="ml-4 flex-shrink-0">
                                                                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                                                    Download
                                                                </a>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                        :""
                                                }
                                            </dd>
                                        </div>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        responses.length > 0 ? responses.map((response) => {
                            return <div key={response.id} className="bg-white overflow-hidden shadow-sm sm:rounded-lg mt-5">
                                <div className="p-6 text-gray-900">
                                    <div>
                                        <div className="px-4 sm:px-0" >
                                            <h3 className="text-base font-semibold leading-7 text-gray-900">{response.FirstName} {response.LastName}</h3>
                                            <p className="text-sm  text-green-500">{response.isManager?"Менеджер":""}</p>
                                            <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">{response.email}</p>
                                            <div className="mt-1 flex items-center gap-x-1.5">
                                            </div>
                                        </div>
                                        <div className="border-t pt-2">
                                            {response.message}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }) : ""

                    }
                    {
                        ticket.isClosed == 0 ?
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mt-5">
                                <div className="p-6 text-gray-900">
                                    <div>
                                        <form action="" onSubmit={submit}>
                                            <div className="col-span-full">
                                                <label htmlFor="message" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Отправить сообщение
                                                </label>
                                                <div className="mt-2">
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={4}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        defaultValue={''}
                                        onChange={(e) => setData('message', e.target.value)}

                                    />

                                                </div>
                                                <div className="mt-3">
                                                    <button
                                                        type="submit"
                                                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                    >
                                                        Отправить
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            : ""
                    }
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
