import fb from "./assets/fb.png"
import * as firebase from 'firebase/auth'
import Modal from "react-modal/lib/components/Modal";
import { useState } from "react";
import { Button } from "bootstrap";
import './style.css';
import { errorMessage } from "./errorMessage";

export default function Login(){
  const [info, setInfo] = useState({error: null});
  const [loading, setLoading] = useState(false);

  function closeModal() {
    setInfo({error: null});
  }

  const handleEmailSigning = async (e) => {
    e.preventDefault()
    const auth = firebase.getAuth();
    const email = document.getElementById("Email").value;
    const password = document.getElementById("pass").value;

    setLoading(true);

    await firebase.signInWithEmailAndPassword(auth, email, password).catch(
      (error)=>{
        console.log(error)
        setInfo({error});
      }
    );

    setLoading(false);
    return false;
  }
  return (
    <>
      <Modal className="modal"
        isOpen={info.error != null}
        //onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        //style={customStyles}
        contentLabel="Example Modal"
      >
        {info.error ? errorMessage(info.error) : ""}
        <button className="closeModal" onClick={closeModal}>Close</button>
      </Modal>
      <form onSubmit={handleEmailSigning}>
            <div className="form-group mt-4 ">
              <label className="form-label go" htmlFor="Email">Email address</label>
              <input type="email" className="form-control" id="Email" placeholder="Enter your Email " />
            </div>
            <div className="form-group">
              <label className="form-label mt-4 go" htmlFor="pass">Password</label>
              <input type="password" name="password" className="form-control" id="pass" placeholder="Enter your Password" />
            </div>
            <div className="d-grid gap-2 mt-5" id="sub">
                <button type="submit" className="btn btn-dark go">Login</button>
                <div className="b"></div>
                <button type="button" disabled={loading} className="btn btn-primary go"><img id="fb" src={fb} alt="" /> Login with Facebook</button>
              </div>
      </form>
    </>
  )
}