/* eslint-disable jsx-a11y/alt-text */
import React,{Component} from "react";

class Camera extends Component{
    
    render(){
        const divStyle = {
    display:"flex"
  };
        return(
            <div style={divStyle}>

            <div className="div1">
            <h4>Drone Live Stream</h4> 
            <img src="http://192.168.26.203:8080/stream?topic=/tb3_2/cv_camera/image_raw" style={{ transform: 'rotate(180deg)' }}></img>  
</div>
       
    
            </div>

        )
        
    }
}
export default Camera;