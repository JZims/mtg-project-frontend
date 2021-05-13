import { Button, Modal, Form, Label } from 'semantic-ui-react'
import { useState, useEffect } from 'react'
// import { useHistory } from "react-router";

function CheckOut({id, forceReload, renterName}) {
    const [open, setOpen] = useState(false)
    const [renter, setRenter] = useState("")
    const [length, setLength] = useState("")
    const [rentersArray, setRentersArray] = useState([])
    const [wasClicked, setWasClicked] = useState(false)
    // const history = useHistory()

    useEffect(() =>{
        fetch("http://localhost:9292/renters")
        .then(res => res.json())
        .then(function(rentersOnServer) {
            setRentersArray(rentersOnServer)
            setWasClicked(false)
        })
    },[])

    // console.log(renter, length)

    function handleSubmit() {
        setWasClicked(true)
        let newRental = {
            review: null,
            rating: null,
            rental_length: parseInt(length, 10),
            deck_id: id,
            renter_id: null
        }

        let foundRenter = rentersArray.find(function(renterObj) {
            return renterObj.name.toLowerCase() === renter.toLowerCase()
        })

        if (foundRenter === undefined) {
            fetch("http://localhost:9292/renters", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    name: renter})
            })
            .then(resp => resp.json())
            .then(function(newRenterObj) {
                newRental.renter_id = newRenterObj.id
                renterName(newRenterObj)
                fetch("http://localhost:9292/rentals", {
                        method: "POST",
                        headers: { "content-type": "application/json" },
                        body: JSON.stringify(newRental)
                    })
                        .then(resp => resp.json())
                        .then(function(newRentalServerObj) {
                            fetch("http://localhost:9292/renters")
                            .then(res => res.json())
                            .then(function(rentersOnServer) {
                                setRentersArray(rentersOnServer)
                                setOpen(false)
                                forceReload()
                            })
                                // getNewRental(newRentalServerObj)
                                // setForceTrigger(!forceTrigger)
                            })
                
                // setRentersArray([...rentersArray, newRenterObj])
                // console.log(newRenterObj)
            })
            console.log(`${renter} added to sever.`)
            // newRental.renter_id = 1321
            // console.log(`${renter} posted to server.`)
        } else {
            console.log("Existing renter found.")
            // console.log(rentersArray)
            // console.log(`newRental.renter_id set to ${foundRenter.id}`)
            newRental.renter_id = foundRenter.id
            renterName(foundRenter)
            fetch("http://localhost:9292/rentals", {
                    method: "POST",
                    headers: { "content-type": "application/json" },
                    body: JSON.stringify(newRental)
                })
                    .then(resp => resp.json())
                    .then(function(newRentalServerObj) {
                        // getNewRental(newRentalServerObj)
                        // setForceTrigger(!forceTrigger)
                        fetch("http://localhost:9292/renters")
                            .then(res => res.json())
                            .then(function(rentersOnServer) {
                                setRentersArray(rentersOnServer)
                                setOpen(false)
                                forceReload()
                            })
                    })
        }

    }

    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Button className="info-panel-buttons" id="check-out">Check Out</Button>}
            className="modal"
        >
            <Modal.Header>Check Out Deck</Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Form.Field>
                    <Label>Renter</Label>
                    <input placeholder="Who's renting this deck?"
                           name="renter"
                           value={renter}
                           onChange={e => setRenter(e.target.value)} />
                </Form.Field>
                <Form.Field>
                <Label>Rental Length</Label>
                    <input placeholder="How many days?"
                           name="length"
                           value={length}
                           onChange={e => setLength(e.target.value)} />
                </Form.Field>
                { wasClicked ? <Button loading>Submit</Button> : <Button type='submit'>Submit</Button>}
            </Form>
        </Modal>
    )
}

export default CheckOut