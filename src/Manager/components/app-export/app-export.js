import React from 'react'
import Button from 'react-bootstrap/Button';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import store from "store";

const AppExportCSV = ({csvData, fileName}) => {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    let exportBtnDisabled = false;

    if(JSON.stringify(csvData) === JSON.stringify(store.get("todoData"))){
        exportBtnDisabled = true;
    };

    if(csvData.length === 0){
        exportBtnDisabled = true;
    };
    
    const exportToCSV = (csvData, fileName) => {
        const ws = XLSX.utils.json_to_sheet(csvData);
        var wscols = [
            {wch:80},
            {wch:10},
            {wch:20},
            {wch:15}
        ];
        
        ws['!cols'] = wscols;
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], {type: fileType});
        FileSaver.saveAs(data, fileName + fileExtension);
    }
    return (
        <Button variant="warning" disabled={exportBtnDisabled} className="mt-3 w-100" onClick={(e) => exportToCSV(csvData,fileName)}>Экспорт данных</Button>
    )
}

export default AppExportCSV;