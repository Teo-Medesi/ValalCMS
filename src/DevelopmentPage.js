import React from 'react'
import FacebookIcon from "./assets/images/svgs/facebookIcon.svg"
import TwitterIcon from "./assets/images/svgs/twitterIcon.svg"
import InstagramIcon from "./assets/images/svgs/instagramIcon.svg"
import YoutubeIcon from "./assets/images/svgs/youtubeIcon.svg"


const DevelopmentPage = () => {
  return (
    <div className='overflow-scroll h-[2000px]'>

      <div className='flex justify-center items-center bg-black-900 text-black-200 h-screen max-h-screen w-full'>
        <div className='w-[60%] rounded-md justify-between p-[5%] h-[80%] bg-[#000000] flex flex-col'>

          <div className='flex text-center flex-col basis-1/2 gap-6'>
            <h1 className='text-4xl'>Subscribe to our Newsletter</h1>
            <p className='text-sm text-black-700'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea</p>
          </div>
          
          <div className='basis-1/2 flex flex-col gap-14'>

            <div className='flex flex-row justify-between'>
              <div className='flex flex-col basis-1/3 gap-2'>
                <label htmlFor="firstName">First Name</label>
                <input className='rounded p-1 bg-black-200 outline-none text-black-900 px-3' type="text" name="firstName"/>
              </div>

              <div className='flex flex-col basis-1/3 gap-2'>
                <label htmlFor="lastName">Last Name</label>
                <input className='rounded p-1 bg-black-200 outline-none text-black-900 px-3' type="text" name='lastName' />
              </div>
            </div>

            <div className='flex flex-col gap-2'>
              <label htmlFor="email">E-mail</label>  
              <input className='rounded p-1 bg-black-200  outline-none text-black-900 px-3' type="text" name="email" />
            </div>
          </div>

        </div>
      </div>

      <div className='w-full h-[50vh] flex justify-center items-center bg-black-900'>
        <div className='flex justify-between items-center flex-row p-0 lg:px-[5%] xl:px-[10%]'>

          <div className='flex flex-col gap-8 text-black-200 text-sm text-center basis-1/4 items-center px-[5%]'>
            <img className="w-24 h-24" src={FacebookIcon} alt="facebook link" />
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit e consectur el patrano.</p>
          </div>

          <div className='flex flex-col gap-8 text-black-200 text-sm text-center basis-1/4 items-center px-[5%]'>
            <img className="w-24 h-24" src={TwitterIcon} alt="twitter link" />
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit e consectur el patrano.</p>
          </div>

          <div className='flex flex-col gap-8 text-black-200 text-sm text-center basis-1/4 items-center px-[5%]'>
            <img className="w-24 h-24" src={InstagramIcon} alt="instagram link" />
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit e consectur el patrano.</p>
          </div>
          
          <div className='flex flex-col gap-8 text-black-200 text-sm text-center basis-1/4 items-center px-[5%]'>
            <img className="w-24 h-24" src={YoutubeIcon} alt="youtube link" />
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit e consectur el patrano.</p>
          </div>

        </div>
      </div>


    </div>
  )
}

export default DevelopmentPage