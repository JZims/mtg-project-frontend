import { Button, Modal, Form, Label } from 'semantic-ui-react'
import { useState, useEffect } from 'react'

function CheckOut({setForceTrigger, forceTrigger, id, getNewRental}) {
    const [open, setOpen] = useState(false)
    const [renter, setRenter] = useState("")
    const [length, setLength] = useState("")
    const [rentersArray, setRentersArray] = useState([])

    useEffect(() =>{
        fetch("http://localhost:9292/renters")
        .then(res => res.json())
        .then(function(rentersOnServer) {
            setRentersArray(rentersOnServer)
        })
    },[])

    // console.log(renter, length)

    function handleSubmit() {
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
                setRentersArray([...rentersArray, newRenterObj])
                // console.log(newRenterObj)
                // fetch("http://localhost:9292/rentals", {
                    //     method: "POST",
                    //     headers: { "content-type": "application/json" },
                    //     body: JSON.stringify(newRental)
                    // })
                    //     .then(resp => resp.json())
                    //     .then(function(newRentalServerObj) {
                        //         getNewRental(newRentalServerObj)
                        //         // setForceTrigger(!forceTrigger)
                        //     })
            })
            console.log(rentersArray)
            // newRental.renter_id = 1321
            // console.log(`${renter} posted to server.`)
        } else {
            console.log("Existing renter found.")
            console.log(rentersArray)
            // console.log(`newRental.renter_id set to ${foundRenter.id}`)
            // newRental.renter_id = foundRenter.id
            // fetch("http://localhost:9292/rentals", {
            //         method: "POST",
            //         headers: { "content-type": "application/json" },
            //         body: JSON.stringify(newRental)
            //     })
            //         .then(resp => resp.json())
            //         .then(function(newRentalServerObj) {
            //             getNewRental(newRentalServerObj)
            //             setForceTrigger(!forceTrigger)
            //         })
        }

    }

    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Button>Check Out</Button>}
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
                <Button type='submit'>Submit</Button>
            </Form>
        </Modal>
    )
}

export default CheckOut