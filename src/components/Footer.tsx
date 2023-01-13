import React,{useState, useRef} from 'react'
import {usePopper} from 'react-popper'
import Button from 'react-bootstrap/Button'


import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';


const Footer = () => {
/*   const [isOpen, setIsOpen] = useState(false)
  const boxRef = useRef(null)
  const tooltipRef = useRef(null)

  const {styles,attributes} = usePopper(boxRef.current,tooltipRef.current,{
    placement:'bottom-end'
  })
  const onClickHandler = ()=>{
    setIsOpen(!isOpen)
  } */


/*   const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Popover right</Popover.Header>
      <Popover.Body>
        And heres some <strong>amazing</strong> content. Its very engaging.
        right
      </Popover.Body>
    </Popover>
  ); */


  return (
    <footer>
{/*           <OverlayTrigger trigger="focus" placement="right" overlay={popover}>
    <Button variant="success">Click me to see</Button>
  </OverlayTrigger> */}
    </footer>
  )
}

export default Footer