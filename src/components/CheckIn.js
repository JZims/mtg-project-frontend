import { Button, Modal, Form, Header, TextArea, Select } from 'semantic-ui-react'
import { useState } from 'react'


function CheckIn({id, forceReload, rentalsArr}) {
    const [open, setOpen] = useState(false)
    const [review, setReview] = useState("")
    const [rating, setRating] = useState(0)
    const [wasClicked, setWasClicked] = useState(false)
    
    const ratingOptions = [
        {key: "⭐", value: 1, text: "⭐"},
        {key: "⭐⭐", value: 2, text: "⭐⭐"},
        {key: "⭐⭐⭐", value: 3, text: "⭐⭐⭐"},
        {key: "⭐⭐⭐⭐", value: 4, text: "⭐⭐⭐⭐"},
        {key: "⭐⭐⭐⭐⭐", value: 5, text: "⭐⭐⭐⭐⭐"}
    ]

    function handleSubmit() {
        // console.log(`Submitted review: ${review}`)
        // console.log(`Submitted rating: ${rating}`)
        setWasClicked(true)
        let reviewInfo = {
            review: review,
            rating: rating
        }

        fetch(`http://localhost:9292/decks/${id}`, {
            method: "PATCH",
            headers: {"content-type": "application/json"},
            body: JSON.stringify(reviewInfo)
        })
            .then(resp => resp.json())
            .then(function(updatedRental) {
                setOpen(false)
                forceReload()
            })
    }

    function handleOnChange(e, data) {
        setRating(data.value)
    }

    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Button className="info-panel-buttons" id="check-in">Check In</Button>}
            className="modal"
        >
            <Modal.Header>Thanks for playing!</Modal.Header>
            { rentalsArr.length === 0 ? null : <Header as='h3'>Total Due: ${(rentalsArr[rentalsArr.length - 1].rental_length) * 2}.00</Header> }
            <Header>Review Deck</Header>
            <Form onSubmit={handleSubmit}>
                <Form.Field>
                    <TextArea placeholder="Tell us how the deck played!" required value={review} onChange={e => setReview(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <Select placeholder="Rate this deck" required options={ratingOptions} onChange={handleOnChange}/>
                </Form.Field>
                { wasClicked ? <Button loading>Submit</Button> : <Button type='submit'>Submit</Button>}
            </Form>
        </Modal>
    )
}

export default CheckIn