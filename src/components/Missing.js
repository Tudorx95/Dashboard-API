import { Link } from "react-router-dom"

const Missing = () => {
    return (
        <div className="App">
        <article style={{ padding: "100px" }}>
            <h1>Oops!</h1>
            <p>Page Not Found</p>
            <div className="flexGrow">
                <Link to="/login">Visit Our Homepage</Link>
            </div>
        </article>
        </div>
    )
}

export default Missing;