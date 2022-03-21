import { useState } from "react";


export default function Vote(){

    const [universities, setUniversities] = useState([]);
    const [choosed, setchoosed] = useState(null);
    const [voted, setVoted] = useState(null);
    const [loading, setLoading] = useState(false);
/*
    useEffect(()=>{
        getParticipantList()
            .then((arr)=>{
                setUniversities(arr);
            })
            .catch(error => {
                dispatchInfo({ payload : { error } });
                console.log(error);
                setLoading(false);
            });
    }, [])*/

    const handleSubmit = () => {
        setLoading(true);
        /*voteForParticipant(choosed)
            .then(() => {
                setVoted(choosed);
                setLoading(false);
            })
            .catch(error => {
                dispatchInfo({ payload : { error } });
                console.log(error);
                setLoading(false);
            } )
        */
    }

    return (
    <div className="d-grid mt-5" id="sub">
        <input type="checkbox" class="btn-check p-2" onClick={() => setchoosed("INSAT")} checked={choosed === "INSAT"} id="btn-check-outlined INSAT" autocomplete="off" />
        <label class="btn btn-outline-secondary" style={{ fontSize: 25, fontWeight: "bold" }} for="btn-check-outlined INSAT">INSAT</label><br/>
        <input type="checkbox" class="btn-check p-2" onClick={() => setchoosed("ESPRIT")} checked={choosed === "ESPRIT"} id="btn-check-outlined ESPRIT" autocomplete="off" />
        <label class="btn btn-outline-secondary" style={{ fontSize: 25, fontWeight: "bold" }} for="btn-check-outlined ESPRIT">ESPRIT</label><br/>

        <div className="d-grid gap-2 mt-5" id="sub">
                  <button type="submit" className="btn btn-dark go p-2">Vote</button>
                </div>
    </div>)
}