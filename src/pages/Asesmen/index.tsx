import React, { Component, Fragment } from "react"
import { Header } from "semantic-ui-react"
import DataTable from "../../components/DataTable"
import ErrorMessage from "../../components/ErrorMessage"
import { AsesmenService } from "../../services/AsesmenService";
import { UnitService } from "../../services/UnitService";
import { ElemenService } from "../../services/ElemenService";

interface IState {
    unit: IUnit[]
    asesmen: IAsesmen[]
    elemen: IElemen[]
    loading: boolean
    error?: Error
}

const fields: IField[] = [
    {
        name: "judul_elemen",
        label: "Judul Elemen",
    },
    {
        name: "id_unit",
        label: "Kode Unit",
        type: "option",
        validations: ["required"],
        optionData: {
            data: [],
            textKey: "kode_unit",
            valueKey: "kode_unit",
        },
        hide: true
    },
    {
        name: "id_unit",
        label: "Nama Unit",
        type: "option",
        validations: ["required"],
        optionData: {
            data: [],
            textKey: "judul_unit",
            valueKey: "judul_unit",
        },
        hide: true
    },
    {
        name: "judul_elemen",
        label: "Judul Elemen",
        type: "option",
        validations: ["required"],
        optionData: {
            data: [],
            textKey: "judul_elemen",
            valueKey: "judul_elemen",
        },
        hide: true
    },
    {
        name: "penilaian",
        label: "Penilaian",
        validations: ["required"],
    },
    {
        name: "bukti",
        label: "Bukti",
        validations: ["required"],
    },
    {
        name: "nilai",
        label: "Nilai",
        validations: ["required"],
    },
    {
        name: "username_asesor",
        label: "Username Asesor",
        validations: ["required"],
    },
    {
        name: "username_pemohon",
        label: "Username Pemohon",
        validations: ["required"],
    },
]

export default class Asesmen extends Component<{}, IState> {
    public state: IState = {
        unit: [],
        asesmen: [],
        elemen: [],
        loading: false,
    }

    public asesmenService = new AsesmenService()
    public unitService = new UnitService()
    public elemenService = new ElemenService()

    public componentDidMount() {
        this.getAsesmen()
        this.getUnit()
        this.getElemen()
    }

    public getElemen() {
        this.setState({ loading: true })
        this.elemenService
            .get()
            .then((elemen) => this.setState({ elemen }))
            .catch((error) => this.setState({ error }))
            .finally(() => this.setState({ loading: false }))
    }

    public getUnit() {
        this.setState({ loading: true })
        this.unitService
            .get()
            .then((unit) => this.setState({ unit }))
            .catch((error) => this.setState({ error }))
            .finally(() => this.setState({ loading: false }))
    }

    public getAsesmen() {
        this.setState({ loading: true })
        this.asesmenService
            .get()
            .then((asesmen) => this.setState({ asesmen }))
            .catch((error) => this.setState({ error }))
            .finally(() => this.setState({ loading: false }))
    }

    public createAsesmen(input: IAsesmen) {
        this.setState({ loading: true })
        this.asesmenService
            .create(input)
            .then(() => this.getAsesmen())
            .catch((error) => this.setState({ error, loading: false }))
    }

    public updateAsesmen(input: IAsesmen, id: string) {
        this.setState({ loading: true })
        this.asesmenService
            .update(input, id)
            .then(() => this.getAsesmen())
            .catch((error) => this.setState({ error, loading: false }))
    }

    public async deleteAsesmen(id: string) {
        this.setState({ loading: true })
        this.asesmenService
            .delete(id)
            .then(() => this.getAsesmen())
            .catch((error) => this.setState({ error, loading: false }))
    }

    public setOptionsData() {
        fields[3].optionData!.data = this.state.elemen
        fields[2].optionData!.data = this.state.unit
        fields[1].optionData!.data = this.state.unit
    }

    public render() {
        this.setOptionsData();
        return (
            <Fragment>
                <Header content="Asesi" subheader="Data Asesi anda" />
                <ErrorMessage
                    error={this.state.error}
                    onDismiss={() => this.setState({ error: undefined })}
                />
                <DataTable<IAsesmen>
                    data={this.state.asesmen}
                    loading={this.state.loading}
                    fields={fields}
                    onCreate={(input) => this.createAsesmen(input)}
                    onUpdate={(input) => this.updateAsesmen(input, input._id)}
                    onDelete={(input) => this.deleteAsesmen(input._id)}
                />
            </Fragment>
        )
    }
}
