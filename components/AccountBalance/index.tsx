'use client';
import React, {useState} from 'react';
import { AnimatePresence } from 'framer-motion';
import Card from "@/components/Card";

const Index = () => {
    const [card, setCard] = useState("balance");

    const handleClick = (cardName: string) => {
        setCard(cardName);
    };

    return (
        <AnimatePresence mode='wait'>

                {card === "balance" && (
                    <Card key="balance">
                        <div className="px-4 py-5 text-center">
                            <h2 className="text-gray-600 text-sm font-thin uppercase">Account Balance</h2>
                            <h1 className="text-4xl font-thin">$200</h1>
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
                            <input className="border border-gray-300 rounded px-3 py-2 w-full mb-4" type="text" placeholder="Amount" />
                            <button onClick={() => handleClick("balance")} className="bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-2xl w-full">Deposit</button>
                        </div>
                    </Card>
                )}

                {card === "withdrawal" && (
                    <Card key="withdrawal">
                        <div className="px-4 py-5 text-center">
                            <h2 className="text-gray-600 text-sm font-thin uppercase">Withdrawal</h2>
                            <input className="border border-gray-300 rounded px-3 py-2 w-full mb-4" type="text" placeholder="Amount" />
                            <button onClick={() => handleClick("balance")} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-2xl w-full">Withdrawal</button>
                        </div>
                    </Card>
                )}

        </AnimatePresence>

    );
};

export default Index;