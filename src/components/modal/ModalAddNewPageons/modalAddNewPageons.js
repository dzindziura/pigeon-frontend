import React, { useState, useRef } from 'react';
import { useForm } from "react-hook-form";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

export const ModalAddNewPageons = ({setData, token}) => {
  const { register, handleSubmit } = useForm();
  const inputFileRef = useRef(null)
  const [show, setShow] = useState(false);
  const [selectedFile, setSelectedFile] = React.useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onSubmit = async (data) => {
    data.preventDefault();
    const formData = new FormData();
    formData.append("file", data.target.file.files[0]);
    formData.append("number", data.target.number.value);
    formData.append("year", data.target.year.value);
    formData.append("token", localStorage.token);
    formData.append("id", localStorage.id);
    setData(formData);
    // const res = await axios.post(`http://localhost:4000/posts/add`, formData).then((res) => res.json());
  };

  return (
    <>
      <Button onClick={handleShow}>
        Add New
      </Button>

      <Modal show={show} onHide={handleClose}>
      <Form onSubmit={onSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Add new Pageon</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Number</Form.Label>
              <Form.Control type="number" name="number" placeholder="Enter number" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Photo</Form.Label>
              <Form.Control type="file" name="file" {...register("file")}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Year</Form.Label>
              <Form.Control type="numer" name="year" placeholder="Enter number" />
            </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button type="submit" variant="success" onClick={handleClose}>
            Save
          </Button>
        </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}