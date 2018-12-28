import React, {Component} from 'react';


class WhyAnkr extends Component {
    render() {
        return ( 
            <div>
                <h2>
                    Why Ankr?
                </h2>
                
                <div>
                    <div class='col-md-3'>
                        <h3>
                            Higher Availbility
                        </h3>
                        
                        <p>
                            Deploy from the closest computing resources available across the 
                            globe
                        </p>
                    </div>
                        
                    < div class = 'col-md-3' >
                        <h3>
                            Cheaper Price 
                        </h3>
                        
                        <p>
                            Sharing Economy’ s asset - light nature
                            results in fairer pricing
                        </p>
                    </div>

                    < div class = 'col-md-3' >
                        <h3>
                            Easier Integration
                        </h3>
                        <p>
                            Build from the tools and languages
                            you already know
                        </p>
                    </div>

                    < div class = 'col-md-3' >
                        <h3>
                            Securer Communication
                        </h3>
                        <p>
                            Leverage cryptographic primitives and
                            TEEs to protect computation integrity
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default WhyAnkr;