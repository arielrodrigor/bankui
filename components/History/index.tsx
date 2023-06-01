import React from 'react';

const Index = () => {
    return (
        <div>

            <section className={'col-span-3 hidden xl:inline-flex xl:min-w-[600px]'}>
                <div className="w-full bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="px-4 py-5 text-center">
                        <h2 className="text-gray-600 text-2xl font-thin uppercase">History</h2>
                    </div>
                    <div className="px-4 pb-4">
                        <table className="table-fixed w-full text-left">
                            <thead className="border-b-2 border-gray-300">
                            <tr>
                                <th className="w-1/4 py-2 text-gray-700">Date</th>
                                <th className="w-1/4 py-2 text-gray-700">Operation</th>
                                <th className="w-1/4 py-2 text-gray-700">Amount</th>
                                <th className="w-1/4 py-2 text-gray-700">Balance</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr className="border-b border-gray-200">
                                <td className="py-2">23/05/2023<br/><span className="text-xs text-gray-500">13:45</span></td>
                                <td className="py-2">Withdrawal</td>
                                <td className="py-2 text-red-600">-$50</td>
                                <td className="py-2">$150</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                                <td className="py-2">22/05/2023<br/><span className="text-xs text-gray-500">16:30</span></td>
                                <td className="py-2">Deposit</td>
                                <td className="py-2 text-green-600">+$100</td>
                                <td className="py-2">$200</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>


        </div>
    );
};

export default Index;