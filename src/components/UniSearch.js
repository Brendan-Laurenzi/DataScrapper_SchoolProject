import React, { Component } from 'react'
import Table from 'react-bootstrap/Table'
import { Col, Container } from 'react-bootstrap'
import { Row } from 'react-bootstrap'
import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Form'
import axios from 'axios';

const UniversitySearch = () => {

    const [departments, setDepartments] = useState(
        [""]
    )

    const [departmentInput, setdepartmentInput] = useState ("")
    const [courseInput, setcourseInput] = useState ("")
    const [semesterInput, setsemesterInput] = useState ("")
    const [creditInput, setcreditInput] = useState ("")
    const [universityInput, setuniversityInput] = useState ("University of Guelph")

    const handleUniSelect = (e) => {
        setuniversityInput(e.target.value)

        if (e.target.value === 'University of Guelph') {
            axios.get('https://131.104.49.103:80/departmentlist?getlist=guelph', {
            headers: { "Access-Control-Allow-Origin": "*" }
            })
            .then((response) => {
                
                
                console.log(response.data['departments'])
                var departmentNames = []

                for (let i=0; i<response.data['departments'].length; i++ ){
                    departmentNames.push (response.data['departments'][i]['department'])
                }

                console.log(departmentNames)

                setDepartments(departmentNames)
                
            })
            .catch(err => {
                console.log(err.code);
                console.log(err.message);
                console.log(err.stack);
            });
        } else {
            
        }
    }

    var corsesFormatedForTable = []

    const [courses, setCourses] = useState([
        ["course1", "name1", "semester1", "credit1"],
        ["course2", "name1", "semester2", "credit2"],
        ["course3", "name1", "semester3", "credit3"],
        ["course4", "name1", "semester4", "credit4"],
        ["course5", "name1", "semester5", "credit5"],

    ])

    const tableStyle = {
        marginTop: '50px',
    };


    const submitSearch = (event) => {

        console.log(courseInput)
        console.log(semesterInput)
        console.log(creditInput)
        console.log(universityInput)
        
        let departmentLocalInput = departmentInput
        let courseLocalInput = courseInput
        let semesterLocalInput = semesterInput
        let creditLocalInput = creditInput

        if (!departmentLocalInput || departmentLocalInput == null) {
            departmentLocalInput = "none"
        }
        if (!courseLocalInput || courseLocalInput == null) {
            courseLocalInput = "none"
        }
        if (!semesterLocalInput || semesterLocalInput == null) {
            semesterLocalInput = "none"
        }
        if (!creditLocalInput || creditLocalInput == null) {
            creditLocalInput = "none"
        }

        console.log('https://131.104.49.103:80/?course=' + courseLocalInput + '&semester=' +semesterLocalInput +'&credit=' + creditLocalInput + '&department=' + departmentLocalInput + '&university=' + universityInput)
        axios.get('https://131.104.49.103:80/?course=' + courseLocalInput + '&semester=' +semesterLocalInput +'&credit=' + creditLocalInput + '&department=' + departmentLocalInput + '&university=' + universityInput, {
        headers: { "Access-Control-Allow-Origin": "*" }})
        .then((response) => {
            
            var listFoundCourses = response.data['courses'];
            console.log(typeof(listFoundCourses));
            console.log (listFoundCourses);
            console.log (listFoundCourses[4]);

            corsesFormatedForTable = [];
            
            for (let i=0; i<listFoundCourses.length; i++ ){
                corsesFormatedForTable.push ([listFoundCourses[i]["code"], listFoundCourses[i]["name"], listFoundCourses[i]["semester"], listFoundCourses[i]["credit"]])
            }

            setCourses (corsesFormatedForTable)

        })
        .catch(err => {
            console.log(err.code);
            console.log(err.message);
            console.log(err.stack);
      });

    }

    return (
        <div class="container-fluid">
            <h2>University Course Search</h2>
            <Container style={{border:'1px solid #cecece', width: 800, textAlign:'left', padding:'15px'}}>

                <Form>
                    <Form.Group className="mb-2">
                        <Form.Label htmlFor='universitySelect'>University</Form.Label>
                        <Form.Select id="universitySelect" onChange={handleUniSelect}>
                            <option></option>
                            <option>University of Guelph</option>
                            {/* <option>Queens University</option> */}
                        </Form.Select>
                    </Form.Group>
                    <Row className='mb-2'>
                        <Col>
                            <Form.Group>
                                <Form.Label htmlFor='departmentSelect'>Department</Form.Label>
                                <Form.Select id='departmentSelect' onChange={(e) => setdepartmentInput(e.target.value)}>
                                    <option></option>
                                    {departments.map((department, index) => (
                                        <option key={index}>{department}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label htmlFor='coursecodeTextInput'>Course Code</Form.Label>
                                <Form.Control id='coursecodeTextInput' placeholder='Example: "1300"' onChange={(e) => setcourseInput(e.target.value)}/>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group className='mb-2'>
                        <Form.Label htmlFor='semesterTextInput'>Semester</Form.Label>
                        <Form.Select id="semesterTextInput" onChange={(e) => setsemesterInput(e.target.value)}>
                            <option></option>
                            <option>Fall</option>
                            <option>Winter</option>
                            <option>Summer</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className='mb-4'>
                    <Form.Label htmlFor='creditTextInput'>Credit</Form.Label>
                        <Form.Control id='creditTextInput' placeholder='Example: "0.5"' onChange={(e) => setcreditInput(e.target.value)}/>
                    </Form.Group>
                    <button type="button" class="btn btn-primary" onClick={submitSearch}>Submit</button>
                </Form>

            </Container>

            <Container style={tableStyle}>
                <Row className="justify-content-md-center">
                    <Table striped bordered hover style={{ fontSize: 20, alignItems: 'center', width: 1000 }}>
                        <thead>
                            <tr>
                                <th>Course</th>
                                <th>Course Name</th>
                                <th>Semester</th>
                                <th>Credit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                courses.map((course, index) => (
                                    <tr key={index}>
                                        <td>{course[0]}</td>
                                        <td>{course[1]}</td>
                                        <td>{course[2]}</td>
                                        <td>{course[3]}</td>
                                    </tr>
                                ))
                            }
                        </tbody>


                    </Table>
                </Row>
            </Container>


        </div>

    )
}

export default UniversitySearch
