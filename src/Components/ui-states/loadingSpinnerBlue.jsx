import React from 'react'

const loadingSpinnerBlue = () => {
  return (
    <div className='py-14 flex justify-center'>
        <div className='m-auto'>
            <div className='lds-ring'>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    </div>
  )
}

export default loadingSpinnerBlue