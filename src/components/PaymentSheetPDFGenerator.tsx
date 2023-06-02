import React from 'react'
import ReactPDF, { Page, Text, View, Document, StyleSheet, Font, Path, PDFViewer, Image } from '@react-pdf/renderer'
import styled from 'styled-components'
import { Container } from 'react-bootstrap'
import logo from '../images/LogoCXN.jpg'
import { size } from '@floating-ui/react-dom'
import { AlignStart, BorderBottom } from 'react-bootstrap-icons'
import { IFoodHousing, IPaymentSheet, IRegularTransportList, ISelfVehicle } from './Types/Types'
import { useLocation } from 'react-router-dom'
// Create styles
const styles = StyleSheet.create({
    pdfViewer: {
        height: 600,
        width: 900
    },
    page: {
        display: 'flex',
        backgroundColor: 'white'
    },
    logo: {
        width: 120,
        height: 80
    },
    logoText: {
        fontSize: 9,
        textAlign: 'center',
        flexDirection: 'row',
        paddingLeft: 7
    },
    tittleText: {
        fontSize: 20,
        textTransform: 'uppercase',
        textAlign: 'center'
    },
    logoTextAndTittleContainer: {
        flexDirection: 'column'
    },
    logoAndTextContainer: {
        flexDirection: 'row'
    },

    tableRow: {
        flexDirection: 'row'
    },
    cellContent: {
        flexGrow: 1
    },
    cellText: {
        fontSize: 12,
        flexGrow: 3
    },
    rowCellHeader: {
        flexBasis: '30%',
        borderRight: 1,
        borderColor: 'black'
    },
    priceCell: {
        flexBasis: '15%',
        borderBottom: 1,
        borderLeft: 1
    },
    firstPage: {
        marginLeft: 40,
        marginTop: 60,
        marginRight: 40
    },
    tableContainer: {
        border: 1,
        borderColor: 'black',
        marginTop: 20
    },
    tableTittleText: {
        fontSize: 12
    }
})
const MainContainer = styled(Container)`
    height: 100%;
    width: 100%;
`

interface propState {
  userName: string
  userFirstSurname: string
  userSecondSurname: string
  userDomicile: string
  userDNI: string
  reason: string
  place: string
  startDate: Date
  endDate: Date
  selfVehicle?: ISelfVehicle
  regularTransportList: IRegularTransportList
  foodHousing?: IFoodHousing
}


const PaymentSheetPDFGenerator = (props:any) => {
  
  const location = useLocation()
  console.log("LALALALALALALALALLA")
  //console.log(props, " props");
console.log(location, " useLocation Hook");
const { userName } = location.state as propState
const {userFirstSurname} = location.state as propState
const {userSecondSurname} = location.state as propState
const {userDomicile} = location.state as propState
const {userDNI} = location.state as propState
const {reason} = location.state as propState
const {place} = location.state as propState
const {startDate} = location.state as propState
const {endDate} = location.state as propState
const {selfVehicle} = location.state as propState
const {regularTransportList} = location.state as propState
const {foodHousing} = location.state as propState
console.log(userName + " JAJAJAJAJAJAJAJAJ")
  
  return (
    <MainContainer>
    <PDFViewer style={styles.pdfViewer}>
        <Document title="xustificante de gastos por desprazamento e manutención en actividades" author="Circulo Xadrez Naron" language="Galician">
            <Page size="A4" style={styles.page}>
                <View style={styles.firstPage}>
                    <View style={styles.logoTextAndTittleContainer}>
                        <View style={styles.logoAndTextContainer}>
                            <Image src={logo} style={styles.logo}></Image>
                            <Text style={styles.tittleText}>
                                xustificante de gastos por {'\n'}desprazamento e manutención {'\n'}en actividades
                            </Text>
                        </View>
                        <View style={styles.logoText}>
                            <View>
                                <Text style={styles.logoText}>
                                    Nº Rexistro Xunta: 925 {'\n'}
                                    C.I.F.: G-15.227.556 {'\n'}
                                    R/Manoel Antonio, 9, {'\n'} San Xosé Obrero{'\n'}
                                    15570 Narón, A Coruña
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.tableContainer}>
                        <View style={styles.tableRow}>
                            <View style={[styles.rowCellHeader, { borderBottom: 1 }]}>
                                <Text style={styles.cellText}>NOMBRE:</Text>
                            </View>
                            <View style={[styles.cellContent, { borderBottom: 1 }]}>
                                <Text style={styles.cellText}>{userName}  {userFirstSurname}  {userSecondSurname}</Text>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={[styles.rowCellHeader, { borderBottom: 1 }]}>
                                <Text style={styles.cellText}>ENDEREZO:</Text>
                            </View>
                            <View style={[styles.cellContent, { borderBottom: 1 }]}>
                                <Text style={styles.cellText}>{userDomicile}</Text>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={styles.rowCellHeader}>
                                <Text style={styles.cellText}>DNI:</Text>
                            </View>
                            <View style={styles.cellContent}>
                                <Text style={styles.cellText}>{userDNI}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.tableContainer}>
                        <View style={styles.tableRow}>
                            <View style={[styles.rowCellHeader, { borderBottom: 1 }]}>
                                <Text style={styles.cellText}>MOTIVO DO ABONO:</Text>
                            </View>
                            <View style={[styles.cellContent, { borderBottom: 1 }]}>
                                <Text style={styles.cellText}>{reason}</Text>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={[styles.rowCellHeader, { borderBottom: 1 }]}>
                                <Text style={styles.cellText}>LUGAR E PAÍS:</Text>
                            </View>
                            <View style={[styles.cellContent, { borderBottom: 1 }]}>
                                <Text style={styles.cellText}>{place}</Text>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={styles.rowCellHeader}>
                                <Text style={styles.cellText}>DURACIÓN:</Text>
                            </View>
                            <View style={styles.cellContent}>
                                <Text style={styles.cellText}> Inicio: {startDate.toString()}  Fin: {endDate.toString()}</Text>
                            </View>
                        </View>
                    </View>

                    <Text style={styles.tableTittleText}> GASTOS DE LOCOMOCION:</Text>
                    <Text style={styles.tableTittleText}> --TRANSPORTE REGULAR: {regularTransportList.regularTransportList.length  ? "" : "N/A"}</Text>
                    <View style={styles.tableContainer}>
                        <View style={styles.tableRow}>
                            <View style={[styles.rowCellHeader, { borderBottom: 1 }]}>
                                <Text style={styles.cellText}>FERROCARRIL:</Text>
                            </View>
                            <View style={[styles.cellContent, { borderBottom: 1 }]}>
                                <Text style={styles.cellText}>VARIABLE DE EL FERROCARRIL</Text>
                            </View>
                            <View style={styles.priceCell}>
                                <Text style={styles.cellText}>PRECIO</Text>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={[styles.rowCellHeader, { borderBottom: 1 }]}>
                                <Text style={styles.cellText}>AVIÓN:</Text>
                            </View>
                            <View style={[styles.cellContent, { borderBottom: 1 }]}>
                                <Text style={styles.cellText}>VARIABLE DE AVION</Text>
                            </View>
                            <View style={styles.priceCell}>
                                <Text style={styles.cellText}>PRECIO</Text>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={[styles.rowCellHeader, { borderBottom: 1 }]}>
                                <Text style={styles.cellText}>AUTOBUS:</Text>
                            </View>
                            <View style={[styles.cellContent, { borderBottom: 1 }]}>
                                <Text style={styles.cellText}>VARIABLE DE AUTOBUS</Text>
                            </View>
                            <View style={styles.priceCell}>
                                <Text style={styles.cellText}>PRECIO</Text>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={styles.rowCellHeader}>
                                <Text style={styles.cellText}>OUTROS(sinalar):</Text>
                            </View>
                            <View style={styles.cellContent}>
                                <Text style={styles.cellText}>VARIABLE DE OUTROS</Text>
                            </View>
                            <View style={[styles.priceCell, { borderBottom: 0 }]}>
                                <Text style={styles.cellText}>PRECIO</Text>
                            </View>
                        </View>
                    </View>

                    <Text style={styles.tableTittleText}> --VEHICULO PROPIO: {selfVehicle ? "" : "N/A"}</Text>
                    <View style={styles.tableContainer}>
                        <View style={styles.tableRow}>
                            <View style={[styles.rowCellHeader, { borderBottom: 1 }]}>
                                <Text style={styles.cellText}>ITINERARIO:</Text>
                            </View>
                            <View style={[styles.cellContent, { borderBottom: 1 }]}>
                                <Text style={styles.cellText}>{selfVehicle?.places}</Text>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={[styles.rowCellHeader, { borderBottom: 1 }]}>
                                <Text style={styles.cellText}>KM PERCORRIDOS:</Text>
                            </View>
                            <View style={[styles.cellContent, { borderBottom: 1 }]}>
                                <Text style={styles.cellText}>{selfVehicle?.distance} X {selfVehicle?.kmPrice} €/Km:</Text>
                            </View>
                            <View style={styles.priceCell}>
                                <Text style={styles.cellText}>PRECIO</Text>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={styles.rowCellHeader}>
                                <Text style={styles.cellText}>OUTROS GASTOS:</Text>
                            </View>
                            <View style={styles.cellContent}>
                                <Text style={styles.cellText}>VARIABLE DE OUTROS GASTOS</Text>
                            </View>
                            <View style={[styles.priceCell, { borderBottom: 0 }]}>
                                <Text style={styles.cellText}>PRECIO</Text>
                            </View>
                        </View>
                    </View>

                    <Text style={styles.tableTittleText}> MANUTENCION E ALOXAMENTO: {foodHousing ? "" : "N/A"}</Text>
                    <View style={styles.tableContainer}>
                        <View style={styles.tableRow}>
                            <View style={[styles.rowCellHeader, { borderBottom: 1 }]}>
                                <Text style={styles.cellText}>SEN PERNOCTA:</Text>
                            </View>
                            <View style={[styles.cellContent, { borderBottom: 1 }]}>
                                <Text style={styles.cellText}>Nº DIAS ____ X ____€/día</Text>
                            </View>
                            <View style={styles.priceCell}>
                                <Text style={styles.cellText}>PRECIO</Text>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={[styles.rowCellHeader, { borderBottom: 1 }]}>
                                <Text style={styles.cellText}>CON PERNOCTA:</Text>
                            </View>
                            <View style={[styles.cellContent, { borderBottom: 1 }]}>
                                <Text style={styles.cellText}>Nº DÍAS _____X____€/día</Text>
                            </View>
                            <View style={styles.priceCell}>
                                <Text style={styles.cellText}>PRECIO</Text>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={[styles.rowCellHeader, { borderBottom: 1 }]}>
                                <Text style={styles.cellText}>ALOXAMENTO(*):</Text>
                            </View>
                            <View style={[styles.cellContent, { borderBottom: 1 }]}>
                                <Text style={styles.cellText}>VARIABLE DE ALOXAMENTO</Text>
                            </View>
                            <View style={styles.priceCell}>
                                <Text style={styles.cellText}>PRECIO</Text>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={styles.rowCellHeader}>
                                <Text style={styles.cellText}>OUTROS GASTOS(*):</Text>
                            </View>
                            <View style={styles.cellContent}>
                                <Text style={styles.cellText}>VARIABLE DE OUTROS</Text>
                            </View>
                            <View style={[styles.priceCell, { borderBottom: 0 }]}>
                                <Text style={styles.cellText}>PRECIO</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.tableRow}>
                        <View style={styles.cellContent}>
                            <Text style={styles.cellText}>Xustificantes que se adxuntan:</Text>
                        </View>
                        <View style={styles.cellContent}>
                            <Text style={styles.cellText}>variable para os xustificantes</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.cellText}>En Narón, a ____ de ____ do _____</Text>
                    </View>
                    <View>
                        <Text style={styles.cellText}>O interesado:</Text>
                    </View>
                </View>
            </Page>
        </Document>
    </PDFViewer>
</MainContainer>
  )
}


export default PaymentSheetPDFGenerator
