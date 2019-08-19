import React, { Component } from "react"
import { RouteComponentProps } from "react-router"
import { Button, Card, Form, Header, Input, Loader } from "semantic-ui-react"
import { Consumer } from "../../Main"

interface IState {
  input: {
    username: string,
    email: string,
    password: string,
    fullname: string,
    date: string,
    gender: string,
    nationality: string,
    address: string,
    education: string,
  }
  loading: boolean
}

export default class Register extends Component<RouteComponentProps, IState> {
  public state: IState = {
    input: {
      username: "",
      email: "",
      password: "",
      fullname: "",
      date: "",
      gender: "",
      nationality: "",
      address: "",
      education: "",
    },
    loading: false,
  }

  public changeValue(value: string, name: "username" | "password" | "email" | "fullname" | "date" | "gender" | "nationality" | "address" | "education") {
    const { input } = this.state
    input[name] = value
    this.setState({ input })
  }

  public resetValue() {
    const { input } = this.state
    input.password = ""
    this.setState({ input })
  }

  public getLoginButtonText() {
    return this.state.loading ? (
      <Loader active inline inverted size="small" />
    ) : (
        "Daftar"
      )
  }

  public render() {
    let options = [
      { text: 'Laki-Laki', value: 'Laki-Laki' },
      { text: 'Perempuan', value: 'Perempuan' },
    ]
    return (
      <Consumer>
        {(context) => {
          return (
            <div style={styles.container}>
              <Card style={styles.card}>
                <Card.Content>
                  <Card.Header textAlign="center">
                    <Header
                      content="Daftar"
                      icon="user circle outline"
                    />
                  </Card.Header>
                </Card.Content>
                <Card.Content>
                  <Form style={styles.form}>
                    <Form.Field>
                      <Input
                        label="Username"
                        value={this.state.input.username}
                        onChange={(event) =>
                          this.changeValue(event.target.value, "username")}
                      />
                    </Form.Field>
                    <Form.Field>
                      <Input
                        label="Email"
                        value={this.state.input.email}
                        onChange={(event) =>
                          this.changeValue(event.target.value, "email")}
                      />
                    </Form.Field>
                    <Form.Field>
                      <Input
                        label="Password"
                        type="password"
                        value={this.state.input.password}
                        onChange={(event) =>
                          this.changeValue(event.target.value, "password")} />
                    </Form.Field>
                    <Form.Field>
                      <Input
                        label="Fullname"
                        value={this.state.input.fullname}
                        onChange={(event) =>
                          this.changeValue(event.target.value, "fullname")}
                      />
                    </Form.Field>
                    <Form.Field>
                      <Input
                        label="Date"
                        type="date"
                        value={this.state.input.date}
                        onChange={(event) =>
                          this.changeValue(event.target.value, "date")}
                      />
                    </Form.Field>
                    <Form.Field>
                      <Input
                        label="Address"
                        value={this.state.input.address}
                        onChange={(event) =>
                          this.changeValue(event.target.value, "address")}
                      />
                    </Form.Field>
                    <Form.Field>
                      <Input
                        label="Education"
                        value={this.state.input.education}
                        onChange={(event) =>
                          this.changeValue(event.target.value, "education")}
                      />
                    </Form.Field>
                    <Form.Field>
                      <Form.Select label="Gender" options={options} placeholder='Gender' />
                    </Form.Field>
                    <Form.Field>
                      <Input
                        label="Nationality"
                        value={this.state.input.nationality}
                        onChange={(event) =>
                          this.changeValue(event.target.value, "nationality")}
                      />
                    </Form.Field>
                  </Form>
                </Card.Content>
                <Card.Content>
                  <Button
                    color="green"
                    fluid
                    content={this.getLoginButtonText()}
                    onClick={() => ''}
                  />
                </Card.Content>
              </Card>
            </div>
          )
        }}
      </Consumer>
    )
  }
}

const styles = {
  card: {
    width: 500
  },
  container: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  form: {
    marginTop: 15,
  },
}