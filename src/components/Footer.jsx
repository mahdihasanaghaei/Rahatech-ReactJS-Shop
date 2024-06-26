import { Link } from "react-router-dom"
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa"


const Footer = () => {
    return (
        <div className='mt-32 mb-10'>
            <div className='grid grid-cols-1 lg:grid-cols-4 *:my-5 lg:*:my-0 shadow-xl divide-x'>
                <div className='*:my-3 p-5 border-e'>
                    <h3 className='font-bold text-lg'>
                        با رهاتک
                    </h3>
                    <div className='text-[#85868B]'>
                        <a href="#">اتاق خبر رهاتک</a>
                    </div>
                    <div className='text-[#85868B]'>
                        <a href="#">فروش در رهاتک</a>
                    </div>
                    <div className='text-[#85868B]'>
                        <a href="#">فرصت های شغلی در رهاتک</a>
                    </div>
                    <div className='text-[#85868B]'>
                        <a href="#">تماس با ما</a>
                    </div>
                    <div className='text-[#85868B]'>
                        <a href="#">درباره ما</a>
                    </div>
                </div>
                <div className='*:my-3 p-5'>
                    <h3 className='font-bold text-lg'>
                        خدمات مشتریان
                    </h3>
                    <div className='text-[#85868B]'>
                        <Link to='/faq'>
                            سوالات متداول
                        </Link>
                    </div>
                    <div className='text-[#85868B]'>
                        <a href="#">شرایط استفاده</a>
                    </div>
                    <div className='text-[#85868B]'>
                        <a href="#">حریم خصوصی</a>
                    </div>
                    <div className='text-[#85868B]'>
                        <a href="#">گزارش باگ</a>
                    </div>
                </div>
                <div className='*:my-3 p-5'>
                    <h3 className='font-bold text-lg'>
                        راهنمای خرید از رهاتک
                    </h3>
                    <div className='text-[#85868B]'>
                        <a href="#">نحوه ثبت سفارش</a>
                    </div>
                    <div className='text-[#85868B]'>
                        <a href="#">رویه ارسال سفارش</a>
                    </div>
                    <div className='text-[#85868B]'>
                        <a href="#">شیوه های پرداخت</a>
                    </div>
                </div>
                <div className='*:my-3 p-5'>
                    <h3 className='font-bold text-lg'>
                        توسعه داده شده توسط : مهدی حسن آقایی
                    </h3>
                    <div className='flex justify-evenly items-center *:p-5 *:rounded-full !mt-10 *:bg-slate-100 *:shadow-[0px_0px_5px_1px_rgba(0,0,0,0.75)]'>
                        <div>
                            <a className='flex text-3xl' href="https://github.com/mahdihasanaghaei"><FaGithub /></a>
                        </div>
                        <div>
                            <a className='flex text-3xl' href="https://www.instagram.com/mahdihasanaghaei.web/"><FaInstagram /></a>
                        </div>
                        <div>
                            <a className='flex text-3xl' href="https://www.linkedin.com/in/mahdi-hasanaghaei/"><FaLinkedin /></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer