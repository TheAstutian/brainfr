import React from 'react';
import './Imagelinkform.css'

const ImageLinkForm =({onInputChange, onButtonSubmit})=>{
  const  handleKeyPress=(e)=>{
        if(e.key==='Enter'){
           return onButtonSubmit()
        }
    }
    return(
        <div className=''>
            <p className='f3'>
                {'This Magic Brain will detect faces in your photos. Give it a try!'}
            </p>
            <div className='center'>
                <div className='center form pa4 br3 shadow-5'>
                    <input className='f4 p2 w-70 center' type='text' onChange={onInputChange} onKeyDown={handleKeyPress}/>
                    <button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple' onClick={onButtonSubmit} >Detect</button>
                </div>
                
            </div>
        </div>
    )
}

export default ImageLinkForm;