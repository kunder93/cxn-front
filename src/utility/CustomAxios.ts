import axios, {  } from 'axios';
import { useEffect, useState } from 'react';
import { LoginFormValues } from '../components/LoginForm';
import { ICompany, IInvoice } from '../components/Types/Types';
  
type companiesAxiosResponse = {
  companiesList:ICompany[]
}

type invoicesAxiosResponse = {
  invoicesList:IInvoice[]
}


export const useAxiosGetCompanies = (url:string) => {
  const [data, setData]: [companiesAxiosResponse, (data: companiesAxiosResponse) => void] = useState<companiesAxiosResponse>({companiesList:[]})
  const [loaded, setLoaded]: [boolean, (loading: boolean) => void] = useState<boolean>(false)
  const [error, setError]: [string, (error: string) => void] = useState("")

  useEffect(() => {
    axios
      .get(url)
      .then((response) => setData(response.data))
      .catch((error) => setError(error.message))
      .finally(() => setLoaded(true));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, error, loaded };
}


export const useAxiosGetInvoices = (url:string) => {
  const [data, setData]: [invoicesAxiosResponse, (data: invoicesAxiosResponse) => void] = useState<invoicesAxiosResponse>({invoicesList:[]})
  const [loaded, setLoaded]: [boolean, (loading: boolean) => void] = useState<boolean>(false)
  const [error, setError]: [string, (error: string) => void] = useState("")

  useEffect(() => {
    axios
      .get(url)
      .then((response) => setData(response.data))
      .catch((error) => setError(error.message))
      .finally(() => setLoaded(true));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, error, loaded };
}









export const useAxiosPostLogin = (url:string, payload:LoginFormValues) => {
  const [data, setData]: [string, (data: string) => void] = useState<string>('')
  const [loaded, setLoaded]: [boolean, (loading: boolean) => void] = useState<boolean>(false)
  const [error, setError]: [string, (error: string) => void] = useState("")

  useEffect(() => {
    axios
      .post(url,payload)
      .then((response) => setData(response.data))
      .catch((error) => setError(error.message))
      .finally(() => setLoaded(true));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, error, loaded }
}



