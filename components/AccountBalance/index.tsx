'use client';
import React, {useEffect, useState} from 'react';
import { AnimatePresence } from 'framer-motion';
import Card from "@/components/AccountBalance/Card";
import axios from "axios";
import {useRecoilState} from "recoil";
import {balanceState} from "@/atoms/balanceAtoms";


const Index = () => {
    const [card, setCard] = useState("balance");
    const [balance, setBalance] = useRecoilState(balanceState);
    const [amount, setAmount] = useState(0);

    useEffect(() => {
        // Simula obtener el número de cuenta del usuario autenticado
        const accountNumber = '123456789';
        axios.post(
            `/api/accounts`,
            { params: { accountNumber} })
            .then(res => {
                setBalance(res.data.balance);
            })
            .catch(err => {
                alert('cuenta no encontrada')
            });
    }, []);

    const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(Number(event.target.value));
    };

    const handleClick = (cardName: string) => {
        if(card === "deposit") {
            handleDeposit();
        }
        if(card === "withdrawal") {
            handleWithdrawal();
        }
        setCard(cardName);
    };

    const handleDeposit = () => {
        const accountNumber = '123456789';
        return axios.post(`/api/transactions`, {
            accountNumber: accountNumber,
            type: 'DEPOSITO',
            amount: amount
        })
            .then(res => {
                setBalance(res.data.balance);
                setCard('balance');
            });
    };

    const handleWithdrawal = () => {
        const accountNumber = '123456789';
        return axios.post(`/api/transactions`, {
            accountNumber: accountNumber,
            type: 'RETIRO',
            amount: amount
        })
            .then(res => {
                setBalance(res.data.balance);
                setCard('balance');
            });
    };



    return (
        <div data-testid="account-balance-component">
            <AnimatePresence mode='wait'>

                {card === "balance" && (
                    <Card key="balance">
                        <div className="px-4 py-5 text-center">
                            <h2 className="text-gray-600 text-sm font-thin uppercase">Account Balance</h2>
                            <h1  className="text-4xl font-thin">${balance}</h1>
                            <p className="text-gray-500 font-thin">US Dollars</p>
                        </div>
                        <div className="px-4 pb-4">
                            <button onClick={() => handleClick("deposit")} className="bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-2xl w-full mb-2">Deposit</button>
                            <button onClick={() => handleClick("withdrawal")} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-2xl w-full">Withdrawal</button>
                        </div>
                    </Card>
                )}

                {card === "deposit" && (
                    <Card key="deposit">
                        <div className="px-4 py-5 text-center">
                            <h2 className="text-gray-600 text-sm font-thin uppercase">Deposit</h2>
                            <input className="border border-gray-300 rounded px-3 py-2 w-full mb-4" type="text" placeholder="Amount"  onChange={handleAmountChange} />
                            <button onClick={() => handleClick("balance")} className="bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-2xl w-full">Deposit</button>
                        </div>
                    </Card>
                )}

                {card === "withdrawal" && (
                    <Card key="withdrawal">
                        <div className="px-4 py-5 text-center">
                            <h2 className="text-gray-600 text-sm font-thin uppercase">Withdrawal</h2>
                            <input className="border border-gray-300 rounded px-3 py-2 w-full mb-4" type="text" placeholder="Amount"  onChange={handleAmountChange} />
                            <button onClick={() => handleClick("balance")} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-2xl w-full">Withdrawal</button>
                        </div>
                    </Card>
                )}

            </AnimatePresence>
        </div>
    );
};

export default Index;