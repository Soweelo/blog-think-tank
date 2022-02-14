import "./mainmenu.scss"
export default function MainMenu({mainMenuOpen, setMainMenuOpen, homeContent, setHomeContent}){
    const changeContent = (e) => {

        setHomeContent(e.target.id)
        console.log(e.target);
        setMainMenuOpen(false)
    }
    return(
        <div className={"menu " + (mainMenuOpen && "active")}>
            <ul>
                <li >
                    <p onClick={ (e) => changeContent(e)} id="1"> more about us</p>
                </li>
                <li >
                    <p onClick={ (e) => changeContent(e)} id="2"> Privacy</p>
                </li>
                <li >
                    <p onClick={ (e) => changeContent(e)} id="3"> faq</p>
                </li>
                <li >
                    <p onClick={ (e) => changeContent(e)} id="4">Join project</p>
                </li>
            </ul>
        </div>
    )
}