import React, { useContext, useEffect, useState } from "react";
import _ from "lodash";
import './commercialstyle.css'
import Button from "react-bootstrap/Button";
import DetailsModel from "./DetailsModel";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {
  MDBBadge,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import TuneIcon from '@mui/icons-material/Tune';
import ProfilModel from "../Admin/Models/ProfilModel";
import CommTâches from "./CommTâches";
import CommercialContext from "../context/CommercialContext";
import axios from "../context/axios";


const pageSize = 10;
const Taches = () => {
  //context of c commercial have multipe functions and states check in the context commercial

  
  const {getClient,task,paginaed,setTask, handleChange, handleClick, setPaginated, filterData,inputDate,handleDateChange,handleDateClick } = useContext(CommercialContext);
  //state responsible for keeping tracking of the current page when pressing the button responsible for pagination and executing the 
  //the page function
  const [currentPage, setCurrentPage] = useState();
let clientNumber;
  useEffect(() => {
    getClient();
  }, []);
  // test state used for debugging
  // const [details, setDetails] = useState({});

//useEffect State that set the pagination to the filtered data executing by the search function
  useEffect(() => {
    if (filterData != null) {
      console.log("condition passed")
      setPaginated(_(filterData).slice(0).take(pageSize).value())
    }
  }, [filterData])
  //pagination logic related to the button of pagination uppon click depends whether its related the filtered data state is full
  // and therefore setting up the page function with the logic related to pagination if the filteredata is executed
  let pageCount;
  if (filterData != null) {
    pageCount = filterData ? Math.ceil(filterData.length / pageSize) : 0;

  } else {
    pageCount = task ? Math.ceil(task.length / pageSize) : 0;

  }
  //pagination function related to the click button
  const pages = _.range(1, pageCount + 1);
  const pagination = (pageNo) => {
    setCurrentPage(pageNo);
    const startIndex = (pageNo - 1) * pageSize;
    if (filterData != null) {
      console.log("data exist")
      const paginatedTask = _(filterData).slice(startIndex).take(pageSize).value();
      setPaginated(paginatedTask)
    } else {
      console.log("doesnt exist")
      const paginatedTask = _(task).slice(startIndex).take(pageSize).value();
      setPaginated(paginatedTask);
    }

  };



  return (


    <div>
      <div className="bar-table">
        <div>
          <h5>Clients &nbsp;   <span class="vl"></span> &nbsp;  <span style={{ fontSize: '15px' }}> {task.length} clients</span> </h5>
        </div>

        <div class="search input-group rounded">
          <input type="search" className="form-control rounded" onChange={handleChange} placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
          <span class="input-group-text border-0" style={{ cursor: 'pointer' }} onClick={handleClick} id="search-addon">
            <i class="fas fa-search"></i>
          </span>
        </div>
        <div className="">
          <CommTâches />
        </div>
      </div>
      <div className="tâches-tech">

        <div className="Table-tech">
          <MDBTable align="middle">
            <MDBTableHead >
              <tr>
                <th scope="col">Nom du client</th>
                <th scope="col">Telephone</th>
                <th scope="col" className="mobileversion">Email</th>
                <th scope="col" className="mobileversion">Date création</th>
                <th scope="col">Détail</th>
              </tr>
            </MDBTableHead>
            {paginaed.map((TASK) => (
              <MDBTableBody>
                <tr key={TASK.id}>
                  <td>
                    <p className="fw-bold mb-1">{TASK.nomComplet}</p>
                  </td>
                  <td>
                    <p className="fw-normal mb-1">{TASK.telephone_client}</p>
                  </td>
                  <td className="mobileversion">
                    <p className="fw-normal mb-1">{TASK.email_client}</p>
                  </td>
                  <td className="mobileversion">
                    {TASK.created_at}
                  </td>
                  {/* <td className="mobileversion">
                    <p className="fw-normal mb-1">
                      {filterData != null && TASK.utilisateurs != null
                      ? TASK.utilisateurs.map((user) => user.pivot.besoin)
                      : TASK.pivot.besoin}
                    </p>

                  </td> */}
                <td>
                    <DetailsModel data={TASK} />
                  </td>
                </tr>
              </MDBTableBody>
            ))}
          </MDBTable>
          <nav className="d-flex justify-content-end">
            <ul className="pagination">
              {pages.map((page) => (
                <div
                  className={`${page === currentPage ? "page-item active" : "page-item"
                    }`}
                >
                  <p className="page-link" onClick={() => pagination(page)}>
                    {page}
                  </p>
                </div>
              ))}
            </ul>
          </nav>

        </div>


        <div className="Filter">
          <h5> <TuneIcon />&nbsp; <span style={{ marginTop: "100px" }}>Filtrer</span></h5>
          <hr></hr>

          <div>
            <Row className="mb-3">
              <Form.Group as={Col} md="12" controlId="validationCustom03">
                <Form.Label>Depuis : </Form.Label>
                <Form.Control
                  type="date"
                  value={inputDate.startDate}
                  name="startDate"
                  onChange={handleDateChange}
                  required

                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="12" controlId="validationCustom03">
                <Form.Label>Jusqu'a : </Form.Label>
                <Form.Control
                  type="date"
                  value={inputDate.endDate}
                  name="endDate"
                  onChange={handleDateChange}
                  required

                />
              </Form.Group>
            </Row>

            <div className="filter-button">

              <Button onClick={handleDateClick}> <TuneIcon />Filtrer</Button>
            </div>


          </div>

        </div>


      </div>
    </div>

  );
};


export default Taches;