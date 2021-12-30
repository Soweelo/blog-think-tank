import "./menuitem.scss"
import useClickOutside from "../../hooks/useClickOutside"
import {useEffect, useRef} from 'react';


export default function MenuItem({id, title, entries, menuOpen, setMenuOpen}){
   const ref = useRef(null);
    useClickOutside(ref,() => setMenuOpen(0))
    const isCurrent =  id === menuOpen ? true :false

    return(
        <li ref={ref} className={"menu__item btn btn--dropdown " + (isCurrent && "active")} onClick={(e)=> isCurrent ? setMenuOpen(0): setMenuOpen(id) } >
            <div className="menu__item-title">
                <a href="#">{title}</a> <div className="seeMore">{isCurrent ? "-": "+"}</div>
            </div>


                <ul>
                    {entries.map((entry, index) =>
                        <li>{entries[index]}</li>)}

                </ul>


        </li>
    )

}
