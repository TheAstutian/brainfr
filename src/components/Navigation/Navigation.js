import React from 'react';


const Navigation =({onRouteChange, isSignedIn})=>{
    
      if(isSignedIn) {
        return(
            <nav style={{display:'flex', justifyContent:'flex-end'}}>
            <p onClick={()=>onRouteChange('signin')} className='f3 link underline-hover no-underline black pa3 pointer'>Sign Out</p>
            </nav>
        )
        
      } else{
        return(
            <nav style={{display:'flex', justifyContent:'flex-end'}}>
            <p onClick={()=>onRouteChange('signin')} className='f3 link black no-underline underline-hover pa3 pointer'>Sign In</p>
            <p onClick={()=>onRouteChange('register')} className='f3 link black underline-hover no-underline pa3 pointer'>Register</p>
            </nav>
        )
      }

}

export default Navigation;