import React, {useState, useEffect} from "react";
import { withFormik, Form, Field,} from "formik";
import * as Yup from "yup";
import axios from 'axios';

const UserForm = ({ values, errors, touched, status}) => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        if (status) {
            setUsers([...users, status])
        }
    }, [status])

    return (
      
      
      <div className="user-form">
            <Form>
                <Field className="input" type="text" name="name" placeholder="Name" />
                {touched.name && errors.name && (<p className="error">{errors.name}</p>)}

                <Field className="input" type="text" name="email" placeholder="Email" />
                {touched.email && errors.email && (<p className="error">{errors.email}</p>)}

                

                <label>
                   <Field className="input" type={values.showPass ? 'text' : 'password'}   name="password"  placeholder="Password" />
                    {touched.name && errors.name && (<p className="error">{errors.name}</p>)} 
                    
                   
                    
                   
               
                </label> 
                <label>
                    <Field className="input"
                    type="checkbox"
                    name="showPass"
                    checked={values.showPass}    /> 
                    <span>Show Password</span>
                </label>
                <label>
                    <Field className="input" type="checkbox" name="terms" checked={values.terms} />
                    <span>Terms of Service</span>
                </label>
               
                <button className="input" type="submit">Submit</button>
            </Form>
            {users.map(user => (
                <ul>
                    <li>Name: {user.name}</li>
                    <li>Email: {user.email}</li>
                    <li>Password: {user.password}</li>

                </ul>
            ))}
        </div>
    );
}

const FormikUserForm = withFormik({
    mapPropsToValues ({ name, email, password, terms}) {
        return{
            name: name || "",
            email: email || "",
            password: password || "",
            terms: terms || false
        };
    },
    
    validationSchema: Yup.object().shape({
        name: Yup.string().required("You must add your name"),
        email: Yup.string().required("Email is required"),
        terms: Yup.boolean().oneOf([true], "You must accept the terms of service")
    }),

    handleSubmit (values, {setStatus}) {
        axios
            .post ("https://reqres.in/api/users", values)
            .then (result => {
                setStatus(result.data);
            })
            .catch(err => console.log("wahh wahhhhh"));
    }
})(UserForm);

export default FormikUserForm