import "./thinktankitem.scss"
import { Favorite, Share, Create } from "@material-ui/icons";
export default function ThinkTankItem ({id, image,message,tags,url}){
      return(
        <a className="thinktankItem" href={url}>
            <img src={"assets/"+image} alt=""/>
           <div className="thinktankItem__tags">
               {tags.map((p, index)=>(
                   <p key={index}>
                       #{tags[index].name}
                   </p>
               ))}
           </div>
            <div className="thinktankItem__message">{message}</div>
            <div className="thinktankItem__url">{url}</div>
            <div className="thinktankItem__icons">
                <div className="icon1"><Favorite/></div>
                <div className="icon2"><Share/></div>
                <div className="icon3"><Create/></div>
            </div>
        </a>
    )
}