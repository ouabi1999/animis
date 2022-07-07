import React from 'react';
class Header extends React.Component {
    render() {
      return (
        <div className="social-call" >
          <div className="social-call" >
          {/* social link */}
          <div className="social">
            <a href="#"><i className="fab fa-facebook-f" /></a>
            <a href="#"><i className="fab fa-instagram" /></a>
            <a href="#"><i className="fab fa-twitter" /></a>
            <a href="#"><i className="fab fa-youtube" /></a>
            {/* phone number*/}
            <p className="phone"> Call us +21289027499</p>
          </div>
        </div >
        </div >
      )
    }
  }

  export default Header