import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './assets/logo2.png';
import {QrReader} from "react-qr-reader";


import { useEffect, useState } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './Login';
import Vote from './Vote';

export default function App(){

    const [loading, setLoading] = useState(false);
    const [done, setDone] = useState(false);

    const [available, setAvailable] = useState([true, true, true, true]);

    const [toggle, setToggle] = useState(false);
    const [section, setSection] = useState("DEFAULT")
    const [uid, setUid] = useState(null);

    
    const onError = (error) => {
      console.log(error)
      if(typeof(error) === Error)
      toast.error(error.message);
      else
      toast.error("an Error has occurred! Try again.");
    }

    return (
        <div className="container-fluid bg-image" id="back">
               <QrReader
        onResult={(result, error) => {
          if (!!result) {
            setUid(result?.text);
            setSection("VOTE");
          }

          if (!!error) {
            console.info(error);
          }
        }}
        containerStyle={{ display:"none" }}
      />
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
             />
            {loading && (<div style={{"backgroundColor": "rgba(0, 0, 0, 0.7)",position: "fixed", zIndex : "999999",top: "0",left: "0",width: "100vw",height: "100vh"}}><div className="d-flex justify-content-center align-items-center flex-column" style={{ position:"absolute", top: "50%", left: "50%",marginRight: "-50%",transform: "translate(-50%, -50%)"  }} >
                <div className="spinner-border text-light" style={{ width:"5rem", height:"5rem" }} role="status">
                </div>
                <p className='text-light mt-2'>{loading}...</p>
            </div></div> )}
        <div className="row align-items-center" id="main">
            <div className="col-md-5 pe-xl-5">
                <div className="card p-4 mb-2" id="cc">
                    <h3 className="mb-4 ">You don't have access to your account ? No problem</h3>
                    <h2 className="card-title mb-4 font-weight-bold go">Vote for the best video</h2>
                    <p className="">identify your account by scaning your QR code or by email and password</p>

                    {
                      (section === "DEFAULT") && (<div className="d-grid gap-2 mt-5" id="sub">
                      <button type="submit" onClick={() => setSection("LOGIN")} className="btn btn-dark go p-3">By Email&Password</button>
                      <button type="button" onClick={() => setSection("VOTE")} className="btn btn-dark go p-3">By QR code</button>
                      </div>)
                    }
                    {
                      ((section === "VOTE") && (<Vote />) )
                    }
                    {
                      ((section === "LOGIN") && (<Login />) )
                    }

                </div>
              </div> 
            
             
        </div>
        </div>
    )
}