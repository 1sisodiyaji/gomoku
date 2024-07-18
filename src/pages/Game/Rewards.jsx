import React from 'react'

const Rewards = () => {
  return (
    <div className="container-fluid design g-0 vh-100">
        <h1 className='text-center py-lg-5 py-3'>Rewards <i className="fi fi-sr-divophy-star"></i></h1>

      <div className="container g-0">
        <div className="card p-3 py-lg-5"> 
            <div className='row'>
                <div className='col-6 text-center'> <h3>Wins</h3> </div>
                <div className='col-6 text-center'> <h3>Reward</h3></div>
            </div> 
            <div className='bg-success row py-2'>
                <div className='col-4 text-center'><h1> 1 </h1> </div>
                <div className='col-8 text-center '> <h3 className='heading2'>Achiever Badge <i className="fi fi-ss-leadership"></i> </h3></div>
            </div>
            <div className='bg-secondary row py-2'>
                <div className='col-4 text-center'><h1> 3 </h1> </div>
                <div className='col-8 text-center'> <h2 className='heading2'>Trailblazer Ribbon <i className="fi fi-sr-badge"></i></h2></div>
            </div>
            <div className='bg-primary row py-2'>
                <div className='col-4 text-center'><h1> 5 </h1> </div>
                <div className='col-8 text-center'><h2 className='heading2'> Champion's Laurel <i className="fi fi-sr-ranking-star"></i></h2></div>
            </div>
            <div className='bg-dark row py-2'>
                <div className='col-4 text-center'><h1> 10 </h1> </div>
                <div className='col-8 text-center'> <h2 className='heading2'>Legendary Crown <i className="fi fi-sr-award"></i> </h2></div>
            </div>
            <div className='bg-warning row py-2'>
                <div className='col-4 text-center'><h1> 11+ </h1> </div>
                <div className='col-8 text-center'> <h2 className='heading2'>Ultimate Badge of Honor <i className="fi fi-sr-dragon"></i>  </h2> </div>
            </div>
            
        </div>
      </div>
    </div>
  )
}

export default Rewards