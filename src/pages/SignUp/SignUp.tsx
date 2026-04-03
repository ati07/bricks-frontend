import React from 'react'
// import Header from '../../component/Home/Header/Header'
import SignUpComponent from '../../components/SignUpComponent/SignUpComponent'


function SignUp() {
  return (
    <section className="content">
        <div className="integrationsPortal-wrapper">
            {/* <Header isSticky={true}/> */}
            <SignUpComponent/>
        </div>
    </section>
  )
}

export default SignUp