import "./mainmenu.scss"
export default function MainMenu({mainMenuOpen, setMainMenuOpen}){
    return(
        <div className={"menu " + (mainMenuOpen && "active")}>
            <ul>
                <li onClick={()=>setMainMenuOpen(false)}>
                    <a href="#moreabout">more about us</a>
                </li>
                <li onClick={()=>setMainMenuOpen(false)}>
                    <a href="#privacy">Privacy</a>
                </li>
                <li onClick={()=>setMainMenuOpen(false)}>
                    <a href="#faq">faq</a>
                </li>
                <li onClick={()=>setMainMenuOpen(false)}>
                    <a href="#bepart">Join project</a>
                </li>
            </ul>
        </div>
    )
}