import Image from 'next/image'
import Header from "@/components/Header";
import AccountBalance from "@/components/AccountBalance";
import History from "@/components/History";

export default function Home() {
  return (
    <main className="">
      <Header />
        <div className={'grid sm:grid-cols-2 md:grid-cols-10'}>
            <section className={'sm:col-span-1 md:col-span-3 pt-14 px-6'}>
                <AccountBalance />
            </section>
            <section className={'sm:col-span-1 md:col-span-7 pt-14 px-6  xl:inline-flex xl:min-w-[600px]'}>
                <History />
            </section>
        </div>
    </main>
  )
}
