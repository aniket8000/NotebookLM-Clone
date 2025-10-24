import { useContext } from 'react'
import { PdfContext } from '../context/PdfContext'

export default function usePdf() {
  const ctx = useContext(PdfContext)
  return ctx
}
