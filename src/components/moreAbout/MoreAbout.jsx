import "./moreabout.scss"
import BackHomeButton from "../backHomeButton/BackHomeButton"
export default function MoreAbout(){
    return(
        <div id="moreabout">
            <BackHomeButton/>
            <h1>More about</h1>
            <div className="moreabout__para-container">
                <p>
                    We are a strongly motivated team, from different countries, and with you, highly motivated too, whoever you are from, we will build or renovate step by step our new creative world 2.0, the one we wish, we imagine.
                    Yes, the driver is a French architect, who can easily imagine building a new world from nothing or restoring an historic world ; impossible is not French !
                    Together, ready to post ?
                </p>
            </div>
        </div>
)
}
