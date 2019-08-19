import React, { Component, Fragment } from "react";
import { RouteComponentProps } from "react-router";
import { Header } from "semantic-ui-react";
import ErrorMessage from "../../components/ErrorMessage";
import DataTable from "../../components/DataTable";
import { PekerjaanService } from "../../services/PekerjaanService";


interface IState {
    pekerjaan: IPekerjaan[]
    loading: boolean
    error?: Error
}

const fields: IField[] = [
    {
        name: "username",
        label: "Username",
        validations: ["required"],
    },
    {
        name: "lembaga",
        label: "Lembaga",
        validations: ["required"],
    },
    {
        name: "alamat",
        label: "Alamat",
        validations: ["required"],
    },
    {
        name: "telepon",
        label: "Telepon",
        validations: ["required"],
    },
    {
        name: "email",
        label: "Email",
        validations: ["required"],
    },
    {
        name: "kodepos",
        label: "Kodepos",
        validations: ["required"],
    },
    {
        name: "fax",
        label: "Fax",
        validations: ["required"],
    },
]

export default class Pekerjaan extends Component<RouteComponentProps, IState> {

    public state: IState = {
        pekerjaan: [],
        loading: false,
    }

    public PekerjaanService = new PekerjaanService()

    public componentDidMount() {
        this.getPekerjaan()
    }

    public getPekerjaan() {
        this.setState({ loading: true })
        this.PekerjaanService
            .getByUsername()
            .then((pekerjaan) => this.setState({ pekerjaan: [pekerjaan] }))
            .catch((error) => this.setState({ error }))
            .finally(() => this.setState({ loading: false }))
    }

    public createPekerjaan(input: IPekerjaan) {
        this.setState({ loading: true })
        this.PekerjaanService
            .create(input)
            .then(() => this.getPekerjaan())
            .catch((error) => this.setState({ error, loading: false }))
    }

    public updatePekerjaan(input: IPekerjaan, id: string) {
        this.setState({ loading: true })
        this.PekerjaanService
            .update(input, id)
            .then(() => this.getPekerjaan())
            .catch((error) => this.setState({ error, loading: false }))
    }

    public async deletePekerjaan(id: string) {
        this.setState({ loading: true })
        this.PekerjaanService
            .delete(id)
            .then(() => this.getPekerjaan())
            .catch((error) => this.setState({ error, loading: false }))
    }

    public render() {
        return (
            <Fragment>
                <Header content="Pekerjaan" subheader="Data Pekerjaan anda" />
                <ErrorMessage
                    error={this.state.error}
                    onDismiss={() => this.setState({ error: undefined })}
                />
                <DataTable<IPekerjaan>
                    data={this.state.pekerjaan}
                    loading={this.state.loading}
                    fields={fields}
                    onCreate={(input) => this.createPekerjaan(input)}
                    onUpdate={(input) => this.updatePekerjaan(input, input._id)}
                    onDelete={(input) => this.deletePekerjaan(input._id)}
                />
            </Fragment>
        )
    }
}

