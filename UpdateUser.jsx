import React, { useContext, useEffect } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./style/profilModel.css";
import { ContextAdmin } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import axios from "axios";

export default function UpdateUser(data) {
  //admin Context we import the utilisateur state , and other functions used in the logic within this component
  const { utilisateurs, getUtilisateurs, handleUpdateProfil} =
    useContext(ContextAdmin);
const  [UsersData,setusersData]=useState({
  idUser:data.data.id,
  userName:data.data.name,
  emailUser:data.data.email,
  telephoneUser:data.data.telephone,
  newNameProfil:data.data.nameProfil,
  newMot_de_passe:""

})
const handleUserUpdate = (e)=>{
  const{name,value}=e.target
  setusersData({...UsersData,[name]:value})
}

const updateProfilSubmit = async(e)=>{
  e.preventDefault();
  const submitUpdateUser = await axios.put('http://localhost:8000/dashboard',UsersData,{ 
    headers: {
      'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')
    },
    withCredentials: true,

  })
  getUtilisateurs();
}


  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navTo = useNavigate();
  console.log(data)
  return (
    <div>
        <ModeEditOutlineIcon onClick={handleShow} style={{ cursor:'pointer' }} />

      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update utilisateur</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate method="POST" onSubmit={updateProfilSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="validationCustom01">
                <Form.Label>Nom complet: </Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="userName"
                  placeholder="Nom complet"
                  onChange={handleUserUpdate}
                  value={UsersData.userName} 
                />
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="validationCustom02">
                <Form.Label>Email : </Form.Label>
                <Form.Control
                  type="email"
                  placeholder="example@example.com"
                  name="emailUser"
                  onChange={handleUserUpdate}
                  value={UsersData.emailUser}
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="validationCustom03">
                <Form.Label>Télephone</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="0505050505"
                  name="telephoneUser"
                  required
                  onChange={handleUserUpdate}
                  value={UsersData.telephoneUser}
                />
         
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="validationCustom04">
                <Form.Label>Profil</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  name="newNameProfil"
                  onChange={handleUserUpdate}
                >
                  <option>{UsersData.newNameProfil}</option>
                  {utilisateurs.Profils.map((profil) => (
                    <option key={profil.id}>
                      {profil.nameProfil}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="validationCustom02">
                <Form.Label>Nouveau mot de passe  : </Form.Label>
                <Form.Control
                  type="password"
                  name="newMot_de_passe"
                  placeholder="*****"
                  onChange={handleUserUpdate}
                />
              </Form.Group>
            </Row>
            <Modal.Footer>
              <Button type="submit" variant="primary" onClick={handleClose}>
                Envoyer
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}