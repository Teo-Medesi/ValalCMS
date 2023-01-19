import React from 'react'
import FacebookIcon from "../../../../assets/images/svgs/facebookIcon.svg"
import TwitterIcon from "../../../../assets/images/svgs/twitterIcon.svg"
import InstagramIcon from "../../../../assets/images/svgs/instagramIcon.svg"
import YoutubeIcon from "../../../../assets/images/svgs/youtubeIcon.svg"


const Contact1 = () => {
  return (
    <div className='w-full h-[50vh] flex justify-center items-center bg-black-900'>
    <div className='flex justify-between items-center flex-row p-0 lg:px-[5%] w-full xl:px-[10%]'>

      <div className='flex flex-col gap-8 text-black-200 text-sm text-center basis-1/4 items-center px-[5%]'>
        <img className="w-24 h-24" src={FacebookIcon} alt="facebook link" />
        <p>Lorem ipsum dolor sit amet</p>
      </div>

      <div className='flex flex-col gap-8 text-black-200 text-sm text-center basis-1/4 items-center px-[5%]'>
        <img className="w-24 h-24" src={TwitterIcon} alt="twitter link" />
        <p>Lorem ipsum dolor sit amet</p>
      </div>

      <div className='flex flex-col gap-8 text-black-200 text-sm text-center basis-1/4 items-center px-[5%]'>
        <img className="w-24 h-24" src={InstagramIcon} alt="instagram link" />
        <p>Lorem ipsum dolor sit amet</p>
      </div>
      
      <div className='flex flex-col gap-8 text-black-200 text-sm text-center basis-1/4 items-center px-[5%]'>
        <img className="w-24 h-24" src={YoutubeIcon} alt="youtube link" />
        <p>Lorem ipsum dolor sit amet</p>
      </div>

    </div>
  </div>
  )
}

export default Contact1