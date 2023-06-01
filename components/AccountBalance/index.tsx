'use client';
import React, {useState} from 'react';

const Index = () => {
    const [card, setCard] = useState("balance");

    const handleClick = (cardName: string) => {
        setCard(cardName);
    };

    return (
        <div className="max-w-sm mx-auto">
            {card === "balance" && (
                <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-200">
                    <div className="px-4 py-5 text-center">
                        <h2 className="text-gray-600 text-sm font-thin uppercase">Account Balance</h2>
                        <h1 className="text-4xl font-thin">$200</h1>
                        <p className="text-gray-500 font-thin">US Dollars</p>
                    </div>
                    <div className="px-4 pb-4">
                        <button onClick={() => handleClick("deposit")} className="bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-2xl w-full mb-2">Deposit</button>
                        <button onClick={() => handleClick("withdrawal")} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-2xl w-full">Withdrawal</button>
                    </div>
                </div>
            )}

            {card === "deposit" && (
                <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-600">
                    <div className="px-4 py-5 text-center">
                        <h2 className="text-gray-600 text-sm font-thin uppercase">Deposit</h2>
                        <input className="border border-gray-300 rounded px-3 py-2 w-full mb-4" type="text" placeholder="Amount" />
                        <button onClick={() => handleClick("balance")} className="bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-2xl w-full">Deposit</button>
                    </div>
                </div>
            )}

            {card === "withdrawal" && (
                <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-200">
                    <div className="px-4 py-5 text-center">
                        <h2 className="text-gray-600 text-sm font-thin uppercase">Withdrawal</h2>
                        <input className="border border-gray-300 rounded px-3 py-2 w-full mb-4" type="text" placeholder="Amount" />
                        <button onClick={() => handleClick("balance")} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-2xl w-full">Withdrawal</button>
                    </div>
                </div>
            )}
        </div>

    );
};

export default Index;