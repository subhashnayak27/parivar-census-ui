import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/AuthService";
import { saveAuth } from "../../utils/tokenStorage";
import { Form, Button, Card, Container } from "react-bootstrap";

function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
  const handleSubmit = async (e) => {

      e.preventDefault();

      try {

          const response = await login(username, password);

          console.log(response);

          saveAuth(response.data);

          navigate("/");

      } catch (error) {

          alert(
              error.response?.data?.message ||
              "Invalid Username or Password"
          );
      }
  };

    return (
        <Container
            className="d-flex vh-100 justify-content-center align-items-center">

            <Card style={{ width: "400px" }}>

                <Card.Body>

                    <h3 className="text-center mb-4">
                        Parivar Census
                    </h3>

                    <Form onSubmit={handleSubmit}>

                        <Form.Group className="mb-3">

                            <Form.Label>Username</Form.Label>

                            <Form.Control
                                value={username}
                                onChange={(e)=>setUsername(e.target.value)}
                            />

                        </Form.Group>

                        <Form.Group className="mb-3">

                            <Form.Label>Password</Form.Label>

                            <Form.Control
                                type="password"
                                value={password}
                                onChange={(e)=>setPassword(e.target.value)}
                            />

                        </Form.Group>

                        <Button
                            className="w-100"
                            type="submit">

                            Login

                        </Button>

                    </Form>

                </Card.Body>

            </Card>

        </Container>
    );

}

export default Login;