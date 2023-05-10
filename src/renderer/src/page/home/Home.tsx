import React, { useState } from 'react'
import { useBarcode } from 'next-barcode'
import { QRCodeCanvas, } from 'qrcode.react'
import html2canvas from 'html2canvas';
import './_home.scss'


const Home = (): JSX.Element => {
  const [text, settext] = useState('exemple')
  const [bgColorState, setbgColorState] = useState('#ffffff')
  const [colorState, setColorState] = useState('#000000')
  const {inputRef} = useBarcode({
    value:text,
    options:{
      background: bgColorState, 
      lineColor: colorState 

    }
  })
  //function telechargement qrcode
  const handleDllQrcode = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    e.preventDefault()
    const qrCode = document.getElementById('qr-code-svg') as HTMLCanvasElement
    const image = qrCode!.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = 'qr-code.png';
    link.href = image;
    link.click();
  }

  //function print qrcode
  const handlePrintQrcode = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>):Promise<void> => {
    e.preventDefault()
    const qrCodeSvg = document.getElementById('qr-code-svg') as HTMLElement

      const canvasImg = await html2canvas(qrCodeSvg);
      const printWindow = window.open('', 'PrintWindow');
      printWindow!.document.write(`
        <html>
          <head>
            <title>Print QR Code</title>
          </head>
          <body>
            <img src="${canvasImg.toDataURL('image/png')}"/>
          </body>
        </html>
      `);
      printWindow!.print();
      printWindow!.close();
    
  }

  //function dll code barre
  const handleDllBarcode = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    e.preventDefault()
    const barcode = document.getElementById('barcode-svg') as HTMLCanvasElement
    const image = barcode!.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = 'barcode-svg.png';
    link.href = image;
    link.click();
  }

  //function print code barre
  const handlePrintBarcode = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    e.preventDefault()
    const barcodeSvg = document.getElementById('barcode-svg') as HTMLElement

  }

  //useState pour qrCode
  const [sizeState, setsizeState] = useState(180)

  return (
    <div className="container-qrcode" id="image-Qrcode">
      <form action="" method="get" className="container-form">
        <label className="labelCss" htmlFor="sizeQrCode">
          Entrée la taille en px de votre Qr-Code par default (180px):
        </label>
        <input
          className="inputCss"
          type="number"
          onChange={(e): void => setsizeState(Number(e.target.value))}
          id="sizeQrCode"
        />
        <br />
        <label className="labelCss" htmlFor="lienQrCode">
          Entrée le lien de votre Qr-Code ou de votre texte/lien de Code-Barre:
        </label>
        <input
          className="inputCss"
          type="text"
          onChange={(e): void => settext(e.target.value)}
          id="lienQrCode"
        />
        <br />
        <label className="labelCss" htmlFor="bgQrCode colorQrCode ">
          veuillez choisir le background color par default (blanc)
        </label>
        <input
          className="bgcolorCss"
          type="color"
          id="bgQrCode"
          onChange={(e): void => setbgColorState(e.target.value)}
        />
        <br />
        <label className="labelCss" htmlFor="colorQrCode">
          Veuillez choisir la couleur du Qr-code par default(noir)
        </label>
        <input
          className="bgcolorCss"
          type="color"
          id="colorQrCode"
          onChange={(e): void => setColorState(e.target.value)}
        />
        <br />

        <QRCodeCanvas
          //création d'un Id pour que l'utilisateur puisse imprimé le QRcode et ou le code barre.
          id="qr-code-svg"
          value={text}
          size={sizeState}
          bgColor={bgColorState}
          fgColor={colorState}
          level="Q"
          includeMargin={false}
          // image settings permet d'ajouter un filigrame sur le QRCODE
          // imageSettings={{
          //       // src: 'https://static.zpao.com/favicon.png',
          //       x: undefined,
          //       y: undefined,
          //       height: 24,
          //       width: 24,
          //       excavate: true,
          // }}
        />
        <div className="container-button">
          <button className="buttonCss" onClick={handleDllQrcode}>
            Download
          </button>
          <button className="buttonCss" onClick={handlePrintQrcode}>
            Print
          </button>
        </div>
        <br />
        <div >
          <canvas ref={inputRef} id="barcode-svg" />
        </div>
        <div className="container-button">
          <button className="buttonCss" onClick={handleDllBarcode}>
            Download
          </button>
          <button className="buttonCss" onClick={handlePrintBarcode}>
            Print
          </button>
        </div>
        <div className="container-copy">
          <p className="copyright">&copy; 2023 code-genius.vercel.app/</p>
        </div>
      </form>
    </div>
  )
}

export default Home

//How to print with an Electron app with React and Type Script without using the web browser but using the live printer on Windows


//https://www.electronjs.org/docs/tutorial/quick-start