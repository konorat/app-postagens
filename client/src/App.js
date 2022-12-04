import React, {useState, useEffect } from "react"
import styles from './index.css'
import Card from './components/card/Card'
import Axios from 'axios'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as yup from 'yup'
import Button from '@mui/material/Button'

function App() {
  const [values, setValues] = useState();
  const [listCard, setListCard] = useState([]);
  console.log(listCard);

  const handleChangeValues = (values) => {
    setValues(prevValues => ({
      ...prevValues,
      [values.target.title]: values.target.value,
    }))
  }

  const handleClickRegister = (values) => {
      Axios.post("http://localhost:3001/registerPost", {
          title: values.title,
          content: values.content,
      }).then(() => {
          setListCard([
            ...listCard,
            {
              title: values.title,
              content: values.content,
            },
          ])
      })
  }

  useEffect(() => {
      Axios.get("http://localhost:3001/getPosts")
        .then((response) => {
        setListCard(response.data)
      })
    }, [])

  const validationPost = yup.object().shape({
      title: yup
          .string()
          .min(10, "Título deve conter 10 caracteres")
          .max(50, "Título deve conter no máximo 50 caracteres")
          .required("Campo obrigatório"),
      content: yup
          .string()
          .min(30, "Conteúdo deve conter no mínimo 30 caracteres")
          .max(3000,"Conteúdo deve conter no máximo 3000 caracteres")
          .required("Campo Obrigatório")
  })



  return (
    <div className="App">
            <div className="createPost">
            <h1>Criar Postagem</h1>
            <Formik initialValues={{}} onSubmit={handleClickRegister}
            validationSchema={validationPost} className>
              <Form className={styles.form}>
                <div className="field">
                
                <Field name='title' 
                className={styles.titlepost} 
                placeholder='Título do Post'
                />

                <ErrorMessage
                component='span'
                name='title'
                className="fieldError"
                />
                </div>
                
                <div className="field">
                
                <Field as='textarea' name='content'
                className={styles.contentPost}
                placeholder='Conteúdo do Post'
                rows="6" cols="50"
                >
                </Field>

                <ErrorMessage
                component='span'
                name='content'
                className="fieldError"
                />
                </div>

                


                <Button variant="contained" type="submit">Registrar</Button>
              </Form>
            </Formik>
            </div>
        
            <div className="cards">

            {listCard.map((val) => (
              <Card
              listCard={listCard}
              setListCard={setListCard}
              key={val.id_post}
              id={val.id_post}
              title={val.title}
              content={val.content}
              />
              ))}   
              </div>

    </div>  
  )
}

export default App;
