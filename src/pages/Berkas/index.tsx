import React, { Component, Fragment } from "react";
import { RouteComponentProps } from "react-router";
import { Header } from "semantic-ui-react";
import ErrorMessage from "../../components/ErrorMessage";
import DataTable from "../../components/DataTable";
import { BerkasService } from "../../services/BerkasService"


interface IState {
    berkas: IBerkas[]
    dummy: any
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
        name: "bukti_ktp",
        label: "Bukti Ktp",
        validations: ["required"],
    },
    {
        name: "pas_foto",
        label: "Pas Foto",
        validations: ["required"],
    },
    {
        name: "laporan",
        label: "Laporan Hasil Studi",
        validations: ["required"],
    },
    {
        name: "surat",
        label: "Surat Keterangan",
        validations: ["required"],
    },
]

export default class Berkas extends Component<RouteComponentProps, IState> {

    public berkasService = new BerkasService()

    public getBerkas() {
        this.setState({ loading: true })
        this.berkasService
            .get()
            .then((berkas) => this.setState({ berkas }))
            .catch((error) => this.setState({ error }))
            .finally(() => this.setState({ loading: false }))
    }

    public state: IState = {
        berkas: [],
        dummy: [
            { "username": "ffadilaputra", "bukti_ktp": "ada", "pas_foto": "ada", "laporan": "ada", "surat": "ada" },
        ],
        loading: false,
    }

    public render() {
        return (
            <Fragment>
                <Header content="Berkas" subheader="Berkas anda" />
                <ErrorMessage
                    error={this.state.error}
                    onDismiss={() => this.setState({ error: undefined })}
                />
                <DataTable<IBerkas>
                    data={this.state.dummy}
                    loading={this.state.loading}
                    fields={fields}
                    onCreate={(input) => ''}
                    onUpdate={(input) => ''}
                    onDelete={(input) => ''}
                />
            </Fragment>
        )
    }
}

