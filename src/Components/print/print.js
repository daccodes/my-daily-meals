import './print.css';
import { PDFDocument, StandardFonts } from 'pdf-lib';
import { saveAs } from 'file-saver';

const Print = ({ data }) => {
  const sum = (obj, attribute) => {
    return obj
      .map((item) => item[attribute])
      .reduce((prev, curr) => parseFloat(prev) + parseFloat(curr), 0);
  };

  const createPdf = async () => {
    const pdfDoc = await PDFDocument.create();
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
    const page = pdfDoc.addPage();
    const { width, height } = page.getSize();
    const fontSize = 24;
    page.drawText('Your Meal Plan:', {
      x: 38,
      y: height - 4 * fontSize,
      size: fontSize,
      font: timesRomanFont,
    });
    page.drawText(new Date().toLocaleDateString(), {
      x: width - 130,
      y: height - 4 * fontSize,
      size: 20,
      font: timesRomanFont,
    });
    const labels = [...new Set(data.map((d) => d.label[0]))];

    const ordMeals = [[], [], [], []];
    for (let i = 0; i < data.length; i++) {
      if (data[i].label[0] === labels[0]) {
        ordMeals[0].push(data[i]);
      } else {
        if (data[i].label[0] === labels[1]) {
          ordMeals[1].push(data[i]);
        } else {
          if (data[i].label[0] === labels[2]) {
            ordMeals[2].push(data[i]);
          } else {
            if (data[i].label[0] === labels[3]) {
              ordMeals[3].push(data[i]);
            }
          }
        }
      }
    }
    var y = 700;
    for (let i = 0; i < labels.length; i++) {
      y -= 20;
      page.drawText(labels[i], { x: 46, y, size: 14 });
      y -= 30;
      page.drawText('Fats', { x: 350, y, size: 12 });
      page.drawText('Pro', { x: 400, y, size: 12 });
      page.drawText('Carbs', { x: 450, y, size: 12 });
      page.drawText('Kcals', { x: 500, y, size: 12 });
      y -= 20;
      ordMeals[i].map((meal) => {
        page.drawText(meal.qta + ' gr.', {
          x: 46,
          y,
          size: 10,
        });
        page.drawText(meal.label[1], {
          x: 90,
          y,
          size: 10,
        });
        page.drawText(meal.fat, {
          x: 350,
          y,
          size: 10,
        });
        page.drawText(meal.pro, {
          x: 400,
          y,
          size: 10,
        });
        page.drawText(meal.cho, {
          x: 450,
          y,
          size: 10,
        });
        page.drawText(meal.cal, {
          x: 500,
          y,
          size: 10,
        });
        y -= 20;
      });
    }
    y -= 30;
    page.drawLine({ start: { x: 25, y }, end: { x: width - 25, y } });
    y -= 50;
    page.drawText('Fats', { x: 350, y, size: 12 });
    page.drawText('Pro', { x: 400, y, size: 12 });
    page.drawText('Carbs', { x: 450, y, size: 12 });
    page.drawText('Kcals', { x: 500, y, size: 12 });
    y -= 20;
    page.drawText('Daily Total:', { x: 46, y, size: 12 });
    page.drawText(sum(data, 'fat').toFixed(1), { x: 350, y, size: 12 });
    page.drawText(sum(data, 'pro').toFixed(1), { x: 400, y, size: 12 });
    page.drawText(sum(data, 'cho').toFixed(1), { x: 450, y, size: 12 });
    page.drawText(sum(data, 'cal').toFixed(1), { x: 500, y, size: 12 });
    page.drawText('Made by dac.dev', { x: width - 100, y: 30, size: 10 });

    const pdfBytes = await pdfDoc.saveAsBase64({ dataUri: true });
    return pdfBytes;
  };
  const SavePdf = () => {
    createPdf().then((pdf) => saveAs(pdf, 'daily_plan.pdf'));
  };

  return (
    <div className="container">
      <button onClick={SavePdf} className="printbutton">
        Print
      </button>
    </div>
  );
};

export default Print;
