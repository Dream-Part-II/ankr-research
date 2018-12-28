import React, { Component } from 'react';


class LatestNews extends Component {
    render() {
        return ( 
            <div>
                <h2>
                    Latest News
                </h2>

                <div>
                    <h4>
                        Ankr Network Bi - weekly Update 5
                    </h4>

                    <p>
                        Over the past two weeks, we have made remarkable progress on 
                        technology development.Meanwhile we have planned...
                    </p>
                </div>

                <div>
                    <h4>
                        Ankr Network Bi - weekly Update 4
                    </h4>

                    <p>
                        Over the past two weeks, we have been focusing on solutions
                        for utilising idle resources in data centers...
                    </p>
                </div>

                <div>
                    <h4>
                        Ankr Network Bi - weekly Update 3
                    </h4>

                    <p>
                        Welcome to Ankr Bi - weekly!This is our third issue, and 
                        we appreciate your attention.First of all, we want to 
                        express...
                    </p>
                </div>
                <button>
                    More News
                </button>
            </div>
        );
    }
}

export default LatestNews;