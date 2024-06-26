import faqData from './../../FAQ'
import FAQItem from './FAQItem'

const Faq = () => {
    return (
        <div>
            <div className='w-full flex justify-start items-center my-20 border bg-[#E9364E] p-5 rounded-b-3xl'>
                <h1 className='font-bold text-3xl my-5 text-white'>
                    سوالات متداول
                </h1>
            </div>
            <div className="flex justify-center items-center">
                <div className="w-4/5">
                    {faqData.map((item) => {
                        return (
                            <FAQItem data={item} key={item.id}/>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Faq
