import { useState } from 'react';
import './App.css';
import FormularioJPG from './assets/formulario.jpg';
import FormularioSVG from './assets/formulario.svg';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

function App() {

  //Transform image to base 64
  const getImage = (url) => {
    return fetch(url)
      .then(response => response.blob())
      .then(blob => new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result)
        reader.onerror = reject
        reader.readAsDataURL(blob)
      }))
  }

  const generatePDF = async () => {
  
      const image = await getImage(FormularioJPG);
      const pdf = new jsPDF('p', 'pt', 'letter');
      //pdf.internal.scaleFactor = 1.7;
      pdf.addImage(image, 'JPG', 0, 0, 615, 780);
      pdf.save('Informe de pausas.pdf')
      window.open(pdf.output('bloburl'));
  }

  /*function generatePDFFromHTML() {
    var pdf = new jsPDF({ format: "a4", orientation: 'portrait', unit: 'px' });

    html2canvas(document.getElementById("capture"), {
        scale: "1"
    }).then(canvas => {
        canvas.imgFile = canvas;
        pdf.addImage(canvas.imgFile, "JPG", 0, 0, 850, 650);
        pdf.save('formulario.pdf');
        window.open(pdf.output('bloburl'));
    });

    /*let image = document.getElementById("capture");
    pdf.html(image, {
      callback: function () {
        pdf.save('informe de pausas.pdf');
        window.open(pdf.output('bloburl'));
      }
    })
  }*/

  return (
    <div className="App">
      <div id='capture'>
        <img src={FormularioJPG} alt="" />
      </div>
      <div style={{ width: '7em', margin: 'auto' }}>
        <button onClick={generatePDF}>Download pdf</button>
      </div>
    </div>
  )
}

export default App
