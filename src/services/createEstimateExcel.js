const excel = require('excel4node');

exports.createEstimate = async (data) => {
    const workbook = new excel.Workbook();
    const worksheet = workbook.addWorksheet('Sheet 1');

    worksheet.cell(1, 1).string('Clinet Name');
    worksheet.cell(1, 2).string(data.name? data.name: '');

    worksheet.cell(2, 1).string('Total');
    worksheet.cell(2, 2).string(data.total? data.total: '');

    worksheet.cell(3, 1).string('Cap Ex');
    worksheet.cell(3, 2).string(data.capex? data.capex: '');

    worksheet.cell(4, 1).string('Op Ex');
    worksheet.cell(4, 2).string(data.opex? data.opex: '');

    worksheet.cell(6, 1).string('Anticipated Revnue :');
    worksheet.cell(6, 2).string(data.anticipatedRevnue? data.anticipatedRevnue: '');

    worksheet.cell(7, 1).string('Populate (busiest 15 min) :');
    worksheet.cell(7, 2).string(data.busiest15Min?data.busiest15Min:'');

    worksheet.cell(8, 1).string('Contract Type :');
    worksheet.cell(8, 2).string(data.contractType?data.contractType:'');

    worksheet.cell(9, 1).string('Industry Type : ');
    worksheet.cell(9, 2).string(data.industryType?data.industryType:'');

    worksheet.cell(10, 1).string('Win Themes : ');
    worksheet.cell(10, 2).string(data.winThemes?data.winThemes:'');

    worksheet.cell(13, 1).string('POS');
    worksheet.cell(13, 2).string('[SELECTED POS] + [FOOTPRINT]');
    worksheet.cell(13, 3).string('$ [TOTAL]');

    let rowCount=13;
    if(data.pos){
        for(let i=0;i<data.pos.length;i++){
            rowCount++;
            worksheet.cell(rowCount, 2).string(data.pos[i].text);
            worksheet.cell(rowCount, 3).string(data.pos[i].value);
        }
    }

    rowCount++;

    worksheet.cell(rowCount, 1).string('Stations');
    worksheet.cell(rowCount, 2).string('Station Type');
    worksheet.cell(rowCount, 3).string('$ [TOTAL]');

    if(data.stations){
        for(let i=0;i<data.stations.length;i++){
            rowCount++;
            worksheet.cell(rowCount, 2).string(data.stations[i].text);
            worksheet.cell(rowCount, 3).string(data.stations[i].value);
        }
    }

    rowCount++;

    worksheet.cell(rowCount, 1).string('Additional Features');
    worksheet.cell(rowCount, 2).string('Feature');
    worksheet.cell(rowCount, 3).string('$ [TOTAL]');

    if(data.features){
        for(let i=0;i<data.features.length;i++){
            rowCount++;
            worksheet.cell(rowCount, 2).string(data.features[i].text);
            worksheet.cell(rowCount, 3).string(data.features[i].value);
        }
    }

    rowCount++;

    worksheet.cell(rowCount, 1).string('Highlighted Selections');
    worksheet.cell(rowCount, 2).string('Selection');
    worksheet.cell(rowCount, 3).string('$ [TOTAL]');

    if(data.selection){
        for(let i=0;i<data.selection.length;i++){
            rowCount++;
            worksheet.cell(rowCount, 2).string(data.selection[i].text);
            worksheet.cell(rowCount, 3).string(data.selection[i].value);
        }
    }


    workbook.write('Excel.xlsx');
}