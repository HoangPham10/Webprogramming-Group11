import React from 'react'
import {Link} from 'react-router-dom'

export default function NotFound() {
    return( 
        <div className="small-container thank-you-page">
            <div className="row">
                <h2>Error</h2>
            </div>
            <div className="row">
                <Link to="/" className="button">Back to Home Page</Link>
            </div>
        </div>
    )

}
