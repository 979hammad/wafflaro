import {React, Card, CardContent, CardMedia, Typography, CardActionArea } from "../../../assets/MaterialUiImports.js";

const CardDesign = (props) => {
  return (
    <>
   <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="170"
          image={props.url}
          alt="Lotus Me"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.description}
          </Typography>
          <Typography gutterBottom variant="body2" component="div" >
            <p className='prices'><b>Price : {props.price} RS/- </b></p>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </>
  )
}

export default CardDesign