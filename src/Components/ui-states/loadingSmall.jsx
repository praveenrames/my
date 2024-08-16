import React from 'react'

const loadingSmall = () => {
  return (
    <div className='py-14 flex'>
        <div className='m-auto'>
            <div className='lds-ring-small'>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    </div>
  )
}

export default loadingSmall