'use client';
import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Timestamp} from "@firebase/firestore-types";
import {useRecoilState} from "recoil";
import {balanceState} from "@/atoms/balanceAtoms";


const Index = () => {
    const [transacciones, setTransacciones] = useState([]);
    const [balance, setBalance] = useRecoilState(balanceState);

    useEffect(() => {
        // Simula obtener el número de cuenta del usuario autenticado
        const accountNumber = '123456789';

        axios.get(
            `/api/transactions`,
            { params: { accountNumber} })
            .then(res => {
                setTransacciones(res.data.transacciones);
            })
            .catch(err => {
                console.error(err);
            });
    }, [balance]);

    function formatearFecha(timestamp: { _seconds: number; _nanoseconds: number }) {
        const dateObject = new Date();
        dateObject.setTime(timestamp._seconds * 1000 + timestamp._nanoseconds / 1000000);
        return dateObject.toLocaleDateString('es-419', {day: 'numeric', month: 'long'});
    }


    function formatearHora(timestamp: { _seconds: number; _nanoseconds: number }) {
        const dateObject = new Date();
        dateObject.setTime(timestamp._seconds * 1000 + timestamp._nanoseconds / 1000000);
        return dateObject.toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit'});
    }


    return (
        <div data-testid="history-component">
            <section className={'col-span-3  xl:inline-flex xl:min-w-[600px]'}>
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
                            {transacciones.map((transaccion, index) => (
                                <tr key={index} className="border-b border-gray-200">
                                    <td className="py-2">{formatearFecha(transaccion.Date)}<br/><span className="text-xs text-gray-500">{formatearHora(transaccion.Date)}</span></td>
                                    <td className="py-2">{transaccion.tipo === 'DEPOSITO' ? 'Deposit' : 'Withdrawal'}</td>
                                    <td className={`py-2 ${transaccion.tipo === 'DEPOSITO' ? 'text-green-600' : 'text-red-600'}`}>
                                        {transaccion.tipo === 'DEPOSITO' ? '+' : '-'}${transaccion.monto}
                                    </td>
                                    <td className="py-2">${transaccion.balance}</td>
                                </tr>
                            ))}
                            </tbody>

                        </table>
                    </div>
                </div>
            </section>


        </div>
    );
};

export default Index;