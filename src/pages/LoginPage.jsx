import { useAuth } from '../contexts/AuthContext'
import { Link, Navigate } from 'react-router-dom'

import Navbar from '../components/Navbar'
import { Form } from '../components/Form'
import { FormInput } from '../components/FormInput'
import { Button } from '../components/Button'

import { layout, userFormWrapper, actionButton, additionalLink } from './user-data-form.module.css'

function LoginPage() {
    const { signIn, isSigned } = useAuth()
    if (isSigned())
        return <Navigate to="/" />

    const loginRequest = (formData) => {
        signIn(formData.get('email'), formData.get('password'))
            .catch((e) => {
                console.error(e)
                alert('Invalid credentials')
            })
    }

    return (
        <section className={layout}>
            <Navbar />
            <section className={userFormWrapper}>
                <Form title="Login" onSubmit={loginRequest}>
                    <FormInput labelText="E-mail">
                        <input type="email" name="email" placeholder="Your account e-mail" required />
                    </FormInput>

                    <FormInput labelText="Password">
                        <input type="password" name="password" placeholder="Yout Password" required />
                    </FormInput>

                    <Button className={actionButton}>Login</Button>
                    <span className={additionalLink}>Don&#39;t have an account? Register <Link to="/signup">here</Link></span>
                </Form>
            </section>
        </section>
    )
}


export default LoginPage;