import React from "react"
import FormDialog from "../FormDialog/FormDialog"


function Card(props) {
    const [open, setOpen] = React.useState(false)

    const handleClickCard = () => {
        setOpen(true);
    }

    return(
    <>
    <FormDialog 
    open={open}
    setOpen={setOpen}
    title={props.title}
    content={props.content}
    listCard={props.listCard}
    setListCard={props.setListCard}
    id={props.id}
    />
        
    <div className="card" onClick={() => handleClickCard()}>
            
            <h1 className="cardTitle">{props.title}</h1>
            <p className="cardContent">{props.content}</p>
    </div>

        </>
    )
}

export default Card