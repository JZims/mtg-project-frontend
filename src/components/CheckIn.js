import { Button, Modal, Form, Label, Header, TextArea } from 'semantic-ui-react'
import { useState, useEffect } from 'react'
// import { useHistory } from "react-router";

function CheckIn() {
    const [open, setOpen] = useState(false)
    

    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Button>Check In</Button>}
            className="modal"
        >
            <Modal.Header>Thanks for playing!</Modal.Header>
            <Header>Review Deck</Header>
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

export default CheckIn