import './mailList.css'

const MailList = () => {
  return (
    <div className='mail'>
        <h3 className="mailTitle">Save Time, save money</h3>
        <span className="mailDesc">Sign up and we'll send the best deals to you</span>
        <div className="mailInputContainer">
            <input type="text"  placeholder='Your email' />
            <button>Subscribe</button>
        </div>
    </div>
  )
}

export default MailList
