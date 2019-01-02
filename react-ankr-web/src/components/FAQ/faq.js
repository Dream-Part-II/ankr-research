import React, { Component } from 'react';
import Footer from '../Footer';

class FAQ extends Component {

    render() {
        return(
            <div className="FAQ">
                <h1>FAQ</h1>

                <div className="faq-item">
                    <div className="faq-title">What we do?</div>
                    <div className='faq-content'>
                        <div className="faq-sub-title"><strong>For consumers:</strong></div>
                        <p>Ankr uses local data centers to offer fast & cheap computation</p>

                        <div className="faq-sub-title"><strong>For small data centers: </strong></div>
                        <p>Ankr offers new revenue stream for under-utilized data centers</p>
                    </div>
                </div>

                <div className="faq-item">
                    <div className="faq-title">Why we create Ankr?</div>
                    <div className='faq-content'>
                        <p>According to research from McKinsey and Stanford, there are nearly total of 70% “non-performing” server asset and 30% of servers (including standard server, hypervisors and VMs) in centers around the world have showed no signs of network, user, connection, memory or CPU activity in six months or more.</p>
                        <p>This is why, in 2018, we launched Ankr a distributed cloud computing platform that allows anyone with a computer to contribute their processing power to scientific researchers and enterprises. In return, participants can be rewarded for their contributions.</p>
                    </div>
                </div>

                <div className="faq-item">
                    <div className="faq-title">How Ankr utilize distributed cloud for idle data centers?</div>
                    <div className='faq-content'>
                        <p>Orchestration and containerization make Ankr distributed cloud computing network easy to integrate with resources from diverse, independent data centers into one homogeneous cloud.</p>
                        <p>Kubernetes is a general-purpose vendor-agnostic orchestration service that makes it easy to deploy containerized applications in any data center.</p>
                        <p>Docker is the de-facto standard technology for containerization of applications into micro-services to be deployed on Kubernetes clusters.</p>
                        {/*missing image here, add later*/}
                    </div>
                </div>

                <div className="faq-item">
                    <div className="faq-title">How Ankr utilize distributed cloud for idle connected device?</div>
                    <div className='faq-content'>
                        <div>We take advantage of the peer-to-peer network of computational resource providers and consumers, so that</div>
                        <ul>
                            <li>Providers and consumers run a daemon to interact with the network</li>
                            <li>Consumer uploads computational task (e.g., SGX enclave application) to the Ankr network</li>
                            <li>Providers compete to be assigned the computational task</li>
                            <li>Select provider executes the task using its computational resources</li>
                            <li>Consumer verifies the results (e.g., SGX remote attestation) and pays</li>
                        </ul>
                    </div>
                </div>

                <div className="faq-item">
                    <div className="faq-title">What are Ankr's major competitive advantages?</div>
                    <div className='faq-content'>
                        <div>
                            <span className="faq-sub-title"><strong>More Efficiency: </strong></span>
                            <p>With the novel Proof of Useful Work(PoUW) can help existing work-based blockchains to be more environment-friendly and resource-efficient.</p>
                        </div>

                        <div>
                            <span className="faq-sub-title"><strong>More Security: </strong></span>
                            <p>Ankr leverages not only the cryptographic primitives but also trusted hardware design to achieve high integrity and confidentiality</p>
                        </div>

                        <p>More Incentives: Computation contributors not only get rewarded for potentially mining	the blocks, but also get compensated for every instruction executed.</p>
                    </div>
                </div>

                <div className="faq-item">
                    <div className="faq-title">What's the future of Ankr?</div>
                    <div className='faq-content'>
                        <div className="faq-sub-title"><strong>Simulations (e.g., Pharma/bio/chemistry Industrial research)</strong></div>
                        <ul>
                            <li>Transfer few simulation parameters</li>
                            <li>Simulation engine generates input data and computes results</li>
                            <li>Transfer simulation results statistics back</li>
                        </ul>

                        <div className="faq-sub-title"><strong>Signal processing (offloading) (e.g., rendering for AR/VR)</strong></div>
                        <ul>
                            <li>Mobile (battery-powered, resource-constrained) device</li>
                            <li>Device uploads data to distributed cloud computing nodes</li>
                            <li>Data center or mesh network of nearby mobile devices compute solution</li>
                            <li>Device downloads results</li>
                        </ul>

                        <p>Offline data analytics (BOINC-style)</p>
                    </div>
                </div>

                <Footer />
            </div>
        );
    }

}

export default FAQ;