import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, useForm} from '@inertiajs/react';

export default function NewTicket({ auth,categories,error }) {

    const { data, setData, post, progress,processing, errors, reset } = useForm({
        title: '',
        category: '',
        message: '',
        files: '',
    });
    const submit = (e) => {
        e.preventDefault();
        // console.log(data)
        post(route('post.newticket'));
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">NewTicket</h2>}
        >
            <Head title="NewTicket" />

            <div className="py-12">
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

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={submit} encType={"multipart/form-data"}>
                                <div className="space-y-12">
                                    <div className="border-b border-gray-900/10 pb-12">
                                        <h2 className="text-base font-semibold leading-7 text-gray-900">Новая заявка</h2>
                                        <p className="mt-1 text-sm leading-6 text-gray-600">
                                        </p>
                                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                            <div className="sm:col-span-4">

                                                <label htmlFor="theme" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Тема
                                                </label>
                                                <div className="mt-2">
                                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                                        <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
                                                        <input
                                                            type="text"
                                                            name="theme"
                                                            id="theme"
                                                            autoComplete="theme"
                                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                            placeholder="Тема"
                                                            onChange={(e) => setData('title', e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="sm:col-span-4">
                                                <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Категория
                                                </label>
                                                <div className="mt-2">
                                                    <select
                                                        id="category"
                                                        name="category"
                                                        autoComplete="category"
                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                                        onChange={(e) => setData('category', e.target.value)}
                                                        defaultValue={''}
                                                    >

                                                        <option value="" disabled>Выбрать...</option>
                                                        {
                                                            categories.map((category) =>{
                                                                return <option value={category.id}>{category.title}</option>
                                                            })
                                                        }
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-span-full">
                                                <label htmlFor="message" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Сообщение
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
                                            </div>
                                        <div>
                                            <label htmlFor="attachment" className="block text-sm font-medium leading-6 text-gray-900">
                                                Файлы
                                            </label>
                                            <input type="file" id="attachment" multiple name="attachment" onChange={e => setData('files', e.target.files)}/>
                                            {progress && (
                                                <progress value={progress.percentage} max="100">
                                                    {progress.percentage}%
                                                </progress>
                                            )}
                                        </div>
                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Отправить
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
