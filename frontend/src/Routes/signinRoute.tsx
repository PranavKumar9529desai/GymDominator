import { Auth } from '@components/Auth/Auth'
import Quote from '@components/Auth/Quote'

export function SignIn() {
  return (
      <div className='lg:grid grid-cols-2 flex justify-center items-center h-screen bg-slate-200 
      lg:bg-gradient-to-tr from-gray-300 to-black'>
        
          <div className='flex justify-center items-center '><Auth type='signin'/></div>
          <div className='hidden lg:block'><Quote /></div>
          
      </div> 
   
  )
}

