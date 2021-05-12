import { Button, Modal, Form, Label } from 'semantic-ui-react'
import { useState } from 'react'

function CheckOut() {
    const [open, setOpen] = useState(false)

    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Button>Check Out</Button>}
            className="modal"
        >
            <Modal.Header>Check Out Deck</Modal.Header>
            <Form>
                <Form.Field>
                    <Label>Renter</Label>
                    <input placeholder="Who's renting this deck?" />
                </Form.Field>
                <Form.Field>
                <Label>Rental Length</Label>
                    <input placeholder="How many days?" />
                </Form.Field>
                <Button type='submit'>Submit</Button>
            </Form>
        </Modal>
    )
}

export default CheckOut