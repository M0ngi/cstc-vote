import fb from "./assets/fb.png"


export  default function Login(){
    return (
        <form>
              <div className="form-group mt-4 ">
                <label className="form-label go" htmlFor="Email">Email address</label>
                <input type="email" className="form-control" id="Email" placeholder="Enter your Email " />
              </div>
              <div className="form-group">
                <label className="form-label mt-4 go" htmlFor="pass">Password</label>
                <input type="password" name="password"  className="form-control" id="pass" placeholder="Enter your Password" />
              </div>
              <div className="d-grid gap-2 mt-5" id="sub">
                  <button type="submit" className="btn btn-dark go">Login</button>
                  <div className="b"></div>
                  <button type="button" disabled className="btn btn-primary go"><img id="fb" src={fb} alt="" /> Login with Facebook</button>
                </div>
        </form>
    )
}