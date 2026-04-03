import React from 'react'
import { Link } from 'react-router-dom'

function SignUp() {
    return (
        <main className="integrationsPortal-main">
            <div data-container="spa" id="spa">
                <div>
                    <div className="verifyPage section section--mid">
                        <div className="checkout-content section-container">
                            <div className="verifyPage-body">
                                <div className="verifyPage-card">
                                    <div>
                                        <form method="post" name="authentication-form">
                                            <div className="checkout-card-content signupForm-card checkout-card-content--auth"><div>
                                                <h2 className="checkout-heading">Create an account on Escrow.com</h2>
                                                <fieldset>
                                                    <div className="field">
                                                        <label htmlFor="username" className="field-label">Please enter your email address<span className="field-required">*</span>
                                                        </label>
                                                        <div className="field-input">
                                                            <div className="field-prefix">
                                                                <div>
                                                                    <div>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="17px" height="14px" viewBox="0 0 17 14" version="1.1" className="injected-svg icon icon--email" data-src="../../../../build/images/global/icons/ui-email-alt.svg">
                                                                            <g id="Page-1" stroke="none" stroke-width="1" fill-rule="evenodd">
                                                                                <g id="ui-email-alt" fill-rule="nonzero">
                                                                                    <path d="M1.02,0 C0.476,0 0,0.476 0,1.02 L0,12.512 C0,13.124 0.476,13.6 1.02,13.6 L15.64,13.6 C16.184,13.6 16.66,13.124 16.66,12.58 L16.66,1.02 C16.66,0.476 16.184,0 15.64,0 L1.02,0 Z M15.164,1.564 L15.164,1.972 L8.364,7.684 L1.564,1.972 L1.564,1.564 L15.164,1.564 Z M1.564,12.036 L1.564,4.012 L7.684,9.18 C7.888,9.316 8.092,9.452 8.364,9.452 C8.636,9.452 8.84,9.384 9.044,9.18 L15.164,4.012 L15.164,12.036 L1.564,12.036 Z" id="Shape-6"></path>
                                                                                </g>
                                                                            </g>
                                                                        </svg>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <input name="username" id="username" className="defaultInput" value="" />
                                                        </div>
                                                    </div>
                                                    <div className="field">
                                                        <label htmlFor="password" className="field-label">Please enter your password<span className="field-required">*</span>
                                                        </label>
                                                        <div className="field-input">
                                                            <div className="field-prefix">
                                                                <div>
                                                                    <div>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 20.1 24.7" enable-background="new 0 0 20.1 24.7" xmlSpace="preserve" className="icon icon--secure injected-svg" data-src="../../../../build/images/global/icons/ui-secure.svg">
                                                                            <path d="M16.2,9.3V6.2C16.2,2.8,13.4,0,10,0C6.6,0,3.9,2.8,3.9,6.2v3.1H1.5C0.7,9.3,0,10,0,10.8v12.3c0,0.9,0.7,1.5,1.5,1.5h17     c0.9,0,1.5-0.7,1.5-1.5V10.8c0-0.9-0.7-1.5-1.5-1.5H16.2z M6.2,6.2C6.2,4,7.9,2.3,10,2.3c2.1,0,3.9,1.7,3.9,3.9v3.1H6.2V6.2z      M17.8,22.4H2.3V11.6h15.4V22.4z"></path>
                                                                        </svg>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <input name="password" id="password" className="defaultInput" type="password" value="" />
                                                        </div>
                                                    </div>
                                                </fieldset>
                                                <div className="signupForm-suggestion">
                                                    <div className="signupForm-suggestion-list">
                                                        <h3 className="signupForm-suggestion-title">Strong passwords have:</h3>
                                                        <ul className="signupForm-suggestion-list">
                                                            <li className="signupForm-suggestion-item">
                                                                <div>
                                                                    <div>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" className="icon injected-svg signupForm-suggestion-icon" width="25" height="25" viewBox="0 0 25 25" data-src="../../../../build/images/global/icons/tick.svg">
                                                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M24.7,4l-15,15c0,0,0,0,0,0c-0.1,0.1-0.1,0.2-0.2,0.3c-0.9,0.9-2.4,0.9-3.2,0      l-5.5-4.7c-0.9-0.9-0.9-2.4,0-3.2c0.9-0.9,2.4-0.9,3.2,0l3.7,3.2L21.4,0.7c0.9-0.9,2.4-0.9,3.3,0C25.6,1.6,25.6,3.1,24.7,4z"></path>
                                                                        </svg>
                                                                    </div>
                                                                </div>At least 7 characters</li>
                                                            <li className="signupForm-suggestion-item">
                                                                <div>
                                                                    <div>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" className="icon injected-svg signupForm-suggestion-icon" width="25" height="25" viewBox="0 0 25 25" data-src="../../../../build/images/global/icons/tick.svg">
                                                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M24.7,4l-15,15c0,0,0,0,0,0c-0.1,0.1-0.1,0.2-0.2,0.3c-0.9,0.9-2.4,0.9-3.2,0      l-5.5-4.7c-0.9-0.9-0.9-2.4,0-3.2c0.9-0.9,2.4-0.9,3.2,0l3.7,3.2L21.4,0.7c0.9-0.9,2.4-0.9,3.3,0C25.6,1.6,25.6,3.1,24.7,4z">

                                                                            </path>
                                                                        </svg>
                                                                    </div>
                                                                </div>At least one UPPER case and one lower case character</li>
                                                            <li className="signupForm-suggestion-item">
                                                                <div>
                                                                    <div>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" className="icon injected-svg signupForm-suggestion-icon" width="25" height="25" viewBox="0 0 25 25" data-src="../../../../build/images/global/icons/tick.svg">
                                                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M24.7,4l-15,15c0,0,0,0,0,0c-0.1,0.1-0.1,0.2-0.2,0.3c-0.9,0.9-2.4,0.9-3.2,0      l-5.5-4.7c-0.9-0.9-0.9-2.4,0-3.2c0.9-0.9,2.4-0.9,3.2,0l3.7,3.2L21.4,0.7c0.9-0.9,2.4-0.9,3.3,0C25.6,1.6,25.6,3.1,24.7,4z"></path>
                                                                        </svg>
                                                                    </div>
                                                                </div>At least one number or special character</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <button type="submit" className="checkout-card-btn checkout-card-btn--auth btn btn--secondary" data-e2e-target="checkout-signup-btn" data-tracking-name="signup">Sign Up</button>
                                                <div className="signupForm-agreement">By registering you agree to the Escrow.com's
                                                    <a href="/legal" role="button" tabIndex={0} className="checkout-terms-link" target="_blank">
                                                        Terms of Using the Escrow Platform
                                                    </a> and
                                                    <a href="/legal" role="button" tabIndex={0} className="checkout-terms-link" target="_blank">
                                                        Privacy Policy
                                                    </a>
                                                </div>
                                            </div>
                                            </div>
                                        </form>
                                        <div className="checkout-switcher checkout-card-content checkout-card-content--small">
                                            <Link to="/login" role="button" tabIndex={0} className="checkout-card-secondaryAction" data-e2e-target="checkout-switch-login" data-tracking-name="login" data-tracking-label="switch-auth-form">
                                                Login to escrow.com
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <footer className="simpleFooter">
                        <div className="section-container">
                            <nav className="simpleFooter-nav">
                                <a href="/legal" target="_blank" className="simpleFooter-nav-link">
                                    Privacy Policy
                                </a>
                                <a href="/escrow-licenses" target="_blank" className="simpleFooter-nav-link">
                                    Licenses and Complaints
                                </a>
                                <a href="/legal" target="_blank" className="simpleFooter-nav-link">
                                    Legal
                                </a>
                            </nav>
                            <p className="simpleFooter-copyright">
                                Copyright © 1999-2023 Escrow.com, Inc. All rights reserved
                            </p>
                        </div>
                    </footer>
                </div>
            </div>
        </main>
    )
}

export default SignUp