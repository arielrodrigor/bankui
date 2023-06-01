import React from 'react';
import { MagnifyingGlassIcon,ShoppingCartIcon,  GlobeAltIcon, Bars3Icon, UsersIcon, UserCircleIcon } from '@heroicons/react/24/solid'

const Index = () => {
    return (
        <header className={'sticky top-0 z-50 grid grid-cols-2 bg-white shadow-md p-5 md:px-10  '}>
            {/*left*/}

            <div className={'relative flex items-center h-10 cursor-pointer my-auto text-gray-500 justify-start'}>
                <p className={'hidden md:inline cursor-pointer'}> Bank</p>
            </div>
            {/*Right*/}

            <div className={'text-gray-500 flex items-center justify-end text-xs space-x-6 mx-6 whitespace-nowrap'}>
                <div className={'link'}>
                    <p>Hello, Ariel</p>
                    <p className={'font-extrabold md:text-sm'}>$200 (USD) </p>
                </div>

                <div className={'relative link flex items-center'}>
                    <div className={'flex items-center space-x-2 border-2 p-2 rounded-full'}>
                        <p>LOGOUT</p>
                        <UserCircleIcon className={'h-6 cursor-pointer'}/>
                    </div>
                </div>
            </div>


        </header>

    );
};

export default Index;