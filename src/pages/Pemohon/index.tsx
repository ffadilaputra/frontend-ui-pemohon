import React, { Component, Fragment } from "react"
import { Header } from "semantic-ui-react"
import DataTable from "../../components/DataTable"
import ErrorMessage from "../../components/ErrorMessage"
import { PemohonService } from "../../services/PemohonService"
import { UnitService } from "../../services/UnitService";

interface IState {
    pemohon: IPemohon[]
    unit: IUnit[]
    loading: boolean
    error?: Error
}

const fields: IField[] = [
    {
        name: "username",
        label: "Username",
        validations: ["required"],
    },
]

export default class Pemohon extends Component<{}, IState> {
    public state: IState = {
        pemohon: [],
        unit: [],
        loading: false,
    }

    public PemohonService = new PemohonService()
    public unitService = new UnitService()

    public componentDidMount() {
        this.getPemohon()
        this.getUnit()
    }

    public getUnit() {
        this.setState({ loading: true })
        this.unitService
            .get()
            .then((unit) => this.setState({ unit }))
            .catch((error) => this.setState({ error }))
            .finally(() => this.setState({ loading: false }))
    }

    public getPemohon() {
        this.setState({ loading: true })
        this.PemohonService
            .getByUsername()
            .then((pemohon) => this.setState({ pemohon: [pemohon] }))
            .catch((error) => this.setState({ error }))
            .finally(() => this.setState({ loading: false }))
    }

    public updatePemohon(input: IPemohon, id: string) {
        this.setState({ loading: true })
        this.PemohonService
            .update(input, id)
            .then(() => this.getPemohon())
            .catch((error) => this.setState({ error, loading: false }))
    }

    public async deletePemohon(id: string) {
        this.setState({ loading: true })
        this.PemohonService
            .delete(id)
            .then(() => this.getPemohon())
            .catch((error) => this.setState({ error, loading: false }))
    }

    public render() {
        return (
            <Fragment>
                <Header content="Pemohon" subheader="Data Pemohon" />
                <ErrorMessage
                    error={this.state.error}
                    onDismiss={() => this.setState({ error: undefined })}
                />
                <DataTable<IPemohon>
                    data={this.state.pemohon}
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
