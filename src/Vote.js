import { useEffect, useState } from "react";
import Modal from "react-modal/lib/components/Modal";
import { errorMessage } from "./errorMessage";
import * as firebase from "firebase/database"
import * as auth from "firebase/auth"

export default function Vote(props){

    const [universities, setUniversities] = useState([]);
    const [choosed, setchoosed] = useState(null);
    const [voted, setVoted] = useState(0);
    const [loading, setLoading] = useState(true);
    const [info, setInfo] = useState({error: null});

    const voteHandler = async ()=>{
        if(voted === 0){
            return;
        }

        if(choosed === null){
            setInfo({error: {message: "Pick a vote!", code: "no-vote"}})
            return;
        }
        setLoading(true);
        const rtdb = firebase.getDatabase();

        let obj = {}
        obj["users/"+props.user] = {};
        obj["participants/"+choosed] = {};

        if(voted != null){ // User is changing vote
            obj["participants/"+voted] = {};
            obj["participants/"+voted].votes = firebase.increment(-1);
        }
    
        obj["participants/"+choosed].votes = firebase.increment(1);
        obj["users/"+props.user].votedFor = choosed;

        await firebase.update(firebase.ref(rtdb), obj).catch((error)=>{
            setInfo({error});
            setLoading(false);
        }).then(()=>{
            setVoted(choosed);
            console.log(props.user + " vote for "+choosed);
            setLoading(false);
        });
    }

    const getUserVote = async ()=>{
        const rtdb = firebase.getDatabase();
        let userPath = firebase.ref(rtdb, "users/" + props.user);
        let data = await firebase.get(userPath)
            .catch((error)=>{
                setInfo({error});
            });

        if(!data.exists()){
            setVoted(null)
            return;
        }
        setVoted(data.toJSON().votedFor);
    }

    const getParticipantList = async ()=>{
        const rtdb = firebase.getDatabase();
        let partPath = firebase.ref(rtdb, "participants/");
        let data = await firebase.get(partPath)
            .catch((error)=>{
                setInfo({error});
            });
        if(!data){
            setInfo({error:{message: "Unable to fetch participants", code: "unknown"}});
            return;
        }
        return Object.keys(data.toJSON())
    }

    const closeModal = () => {
        setInfo({error: null});
    }

    useEffect(()=>{
        getUserVote()
            .catch((error)=>{
                setInfo({error});
            });
        
        getParticipantList()
            .then((arr)=>{
                console.log(arr);
                setUniversities(arr);
                setLoading(false);
            })
            .catch(error => {
                setInfo({ error });
                console.log(error);
                setLoading(false);
            });
    }, [])

    return (
        <><Modal className="modal"
        ariaHideApp={false}
        isOpen={info.error != null}
        onRequestClose={closeModal}
        >
            {info.error ? errorMessage(info.error) : ""}
            <button className="closeModal" onClick={closeModal}>Close</button>
         </Modal>
        <div className="d-grid mt-5" id="sub">
            {universities.map((value, index)=>{
                return (<><input key={index+"inp"} type="checkbox" class="btn-check p-2" onClick={() => setchoosed(value)} checked={choosed === value} id={"btn-check-outlined "+value} autocomplete="off" />
                <label key={index+"lab"} class="btn btn-outline-secondary" style={{ fontSize: 25, fontWeight: "bold" }} for={"btn-check-outlined "+value}>{value}</label><br/>
                </>)
            })}
            {/* <input type="checkbox" class="btn-check p-2" onClick={() => setchoosed("INSAT")} checked={choosed === "INSAT"} id="btn-check-outlined INSAT" autocomplete="off" />
            <label class="btn btn-outline-secondary" style={{ fontSize: 25, fontWeight: "bold" }} for="btn-check-outlined INSAT">INSAT</label><br/>
            <input type="checkbox" class="btn-check p-2" onClick={() => setchoosed("ESPRIT")} checked={choosed === "ESPRIT"} id="btn-check-outlined ESPRIT" autocomplete="off" />
            <label class="btn btn-outline-secondary" style={{ fontSize: 25, fontWeight: "bold" }} for="btn-check-outlined ESPRIT">ESPRIT</label><br/> */}

            <div className="d-grid gap-2 mt-5" id="sub">
                    <button disabled={loading} onClick={voteHandler} type="submit" className="btn btn-dark go p-2">Vote</button>
                    </div>
        </div>
        </>)
}