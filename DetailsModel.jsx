import React, { useContext, useEffect } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { useNavigate } from "react-router-dom";
import { MDBAccordion, MDBAccordionItem, MDBContainer } from "mdb-react-ui-kit";
import {
  MDBBadge,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";



export default function DetailsModel({data}) {
 
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navTo = useNavigate();
  const [fullscreen, setFullscreen] = useState(true);

  
  return (

    <div>
      
      <Button style={{ background:'none' , color:'black' , border:'none' }} variant="primary" onClick={handleShow}>
          <AddCircleIcon />
      </Button>

      <Modal fullscreen={fullscreen} show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Détails tâches</Modal.Title>
        </Modal.Header>

        {/* <ul>
          <h5><u>Information Client</u></h5>
          <li>Nom client : {data.nomComplet} </li>
          <li>Telephone :  </li>
          <li>Email :  {data.email_client} </li>
          <li>Date création : {data.created_at} </li>
          <li>Besoin :  {data.utilisateurs != null
                      ? data.utilisateurs.map((user) => user.pivot.besoin)
                      : data.pivot.besoin} </li>
        </ul>
                    
         */}
    
        <Modal.Body style={{ display:'flex', maxHeight:'70vh', justifyContent:'start',flexWrap:'wrap', gap:'20px', overflowY:'scroll'}}>

      {/* {data.vehicules.map((vehicule)=>
      
      <Card style={{ minWidth:'21rem' }}>
      <Card.Header>Matricule :{vehicule.matricule}</Card.Header>
      {vehicule.taches.map((tache)=>
      (
      <ListGroup key={tache.id} variant="flush">
        <ListGroup.Item>Tâche associée : {tache.cataches.catache}</ListGroup.Item>
        <ListGroup.Item>Type d'appreil : {vehicule.articles.map((article)=>article.modeles.types.nameType)}</ListGroup.Item>
        <ListGroup.Item>Type du SIM : {vehicule.articles.map((article)=>article.articles_combination.map((articles_combination)=>articles_combination.modeles.types.nameType))}</ListGroup.Item>
        <ListGroup.Item>Propriétaire d'appareil : {data.vehicules.map((vehicule)=>vehicule.articles.map((article)=>article.proprietaire)) ==1 ? data.nomComplet :"interne"}</ListGroup.Item>
        <ListGroup.Item>Propriétaire du SIM  : {data.vehicules.map((vehicule)=>vehicule.articles.map((article)=>article.proprietaire)) ==1 ? data.nomComplet :"interne"}</ListGroup.Item>
        <ListGroup.Item>Date réalisation : {tache.date_debut_realisation}</ListGroup.Item>
        <ListGroup.Item>Statut :
        {tache.etat_tache == 0 ? "en attente" : ""}
        {tache.etat_tache == 1 ? "en cours" : ""}
        {tache.etat_tache == 2 ? "terminée" : ""}
        {tache.etat_tache == 3 ? "reportée" : ""}
        {tache.etat_tache == 4 ? "annulée" : ""}
        </ListGroup.Item>
      </ListGroup>
      )


    )}
    
    </Card>
      )
  } */}

      

      <div className="Table-tech" style={{width:"100%" , overflowX:"auto" }}>
          <MDBTable align="middle">
            <MDBTableHead >
              <tr>
                <th scope="col">Nom du client</th>
                <th scope="col">Telephone</th>
                <th scope="col">Matricule</th>
                <th scope="col">Type tâche </th>
                <th scope="col">Type d'app</th>
                <th scope="col">Prop d'app </th>
                <th scope="col">Type SIM</th>
                <th scope="col">date_previsionnelle_debut</th>
                <th scope="col">Staut</th>
              </tr>
            </MDBTableHead>
            
            <MDBTableBody>
            {data.vehicules.map((vehicule) => 
            
                          vehicule.taches ? vehicule.taches.map((tache)=>

                <tr key={vehicule.id}>
                  <td>{data.nomComplet}</td>
                  <td>{data.telephone_client}</td>
                  <td>{vehicule.matricule}</td>
                  <td>{tache.cataches.catache}</td>
                  <td> {vehicule.articles.map((article)=>article.modeles.types.nameType)}</td>
                  <td>{data.vehicules.map((vehicule)=>vehicule.articles.map((article)=>article.proprietaire)) ==1 ? data.nomComplet :"interne"}</td>
                  {console.log(vehicule.articles)}
                  <td>{vehicule.articles.map((article)=>article.articles_combination.map((articles_combination)=>articles_combination.modeles.types.nameType))}</td>
                  <td>{tache.date_debut_realisation}</td>
                  <td>  {tache.etat_tache == 0 ? "en attente" : ""}
                      {tache.etat_tache == 1 ? "en cours" : ""}
                      {tache.etat_tache == 2 ? "terminée" : ""}
                      {tache.etat_tache == 3 ? "reportée" : ""}
                      {tache.etat_tache == 4 ? "annulée" : ""}</td>

                  
          
                </tr>
                          ):""
                )}

              </MDBTableBody>

            </MDBTable>
</div>

        </Modal.Body>
      </Modal>
    </div>
  );
}