import Image from 'next/image'
import Header from "@/components/Header";
import AccountBalance from "@/components/AccountBalance";
import History from "@/components/History";

export default function Home() {
  return (
    <main className="">
      <Header />
        <div className={'grid grid-cols-10'}>
            <section className={'col-span-3 pt-14 px-6'}>
                <AccountBalance />
            </section>
            <section className={'col-span-7 pt-14 px-6 hidden xl:inline-flex xl:min-w-[600px]'}>
                <History />
            </section>
        </div>
    </main>
  )
}
