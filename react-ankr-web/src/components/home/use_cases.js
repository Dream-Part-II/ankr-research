import React, {Component} from 'react';


class UseCases extends Component {
    render() {
        return ( 
            <div>
                <h2>
                    Use Cases
                </h2>

                <p>
                    Ankr is versatile in various types of computing jobs.
                </p>

                <ul>
                    < li > Computation - heavy applications where computation 
                    offsets communications
                    </li> 

                    <li> 
                        Monte Carlo simulations(e.g., medical / geological research)
  
                    </li> 

                    <li> 
                        Time - sensitive signal processing offloading(e.g., rendering
                            for AR / VR)

                    </li> 

                    <li>
                        Offline data analytics without strict deadlines
                    </li>
                </ul>
            </div>
        );
    }
}

export default UseCases;