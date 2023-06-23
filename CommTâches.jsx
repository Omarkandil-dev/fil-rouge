import React, { useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useContext } from 'react';
import CommercialContext from '../context/CommercialContext';
import STcontext from '../context/STcontext';

export default function CommTâches() {
  
const {handleAddClient,submitAddClient} = useContext(CommercialContext);
const {getTaskInfo,NewTask} = useContext(STcontext);

useEffect(()=>{
  getTaskInfo();
},{})

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

  return (
    <div>
      <Button className='nouveauProfilButton'  style={{ width:"100%" }} onClick={handleShow}>
            Nouvelle tâche
      </Button>

      <Modal size='lg' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Nouvelle tâche</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            
        <Form noValidate method='POST' onSubmit={submitAddClient}>

          <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label>Nom complet : </Form.Label>
                <Form.Control
                  required
                  type="list"
                  autoComplete='off'
                  name="nomComplet"
                  placeholder="Nom complet"
                  onChange={handleAddClient}
                />
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom02">
                <Form.Label>Telephone : </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="+212 555555"
                  name="telephoneClient"
                  onChange={handleAddClient}
                />
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom02">
                <Form.Label>Email : </Form.Label>
                <Form.Control
                  type="email"
                  placeholder="example@example.com"
                  name="emailClient"
                  onChange={handleAddClient}
                />
              </Form.Group>
            </Row>

            <Row className='mb-3'>

           
              
            <Form.Group as={Col} md="4" controlId="validationCustom02">
                <Form.Label>Type tâche : </Form.Label>
                <Form.Control
                  list="dataTask"
                  name="typeTache"
                  autoComplete='off'
                  onChange={handleAddClient}
                />
                <datalist id="dataTask">
                     {NewTask.TypesTasks
                     .map((TypesTask
                      )=><option>{TypesTask.catache}</option>)}
                </datalist>
              </Form.Group>


              <Form.Group as={Col} md="4" controlId="validationCustom02">
                <Form.Label>Date :</Form.Label>
                <Form.Control
                  type="datetime-local"
                  name="Date"
                  autoComplete='off'

                  onChange={handleAddClient}
                />
              </Form.Group>
              

            <Form.Group as={Col} md="4" controlId="">
                    <Form.Label>Quantité : </Form.Label>
                    <Form.Control
                      type='number'
                      name="Quantite"
                      autoComplete='off'
                      onChange={handleAddClient}
                    />

                    </Form.Group>
       
            </Row>
            <Row>
            <Form.Group as={Col} md="4" controlId="">
                    <Form.Label>Observation: </Form.Label>
                    <Form.Control
                      as="textarea" rows={3}
                      type='text'
                      name="Obsirvation"
                      autoComplete='off'
                      onChange={handleAddClient}/>
                    </Form.Group>
            </Row>



      <Modal.Footer>
 
          <Button type='submit' className='Modelbutton' variant="primary" onClick={handleClose}>
            Envoyer
          </Button>
        </Modal.Footer>

      </Form>
        </Modal.Body>

      </Modal>

    </div>
  )
}
