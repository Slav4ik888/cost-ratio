import { FC, useCallback, useEffect, useState } from 'react';
import './big-table.scss'; 
import { BIG_TITLE } from '../../consts';
import ModalChangeRow from '../../components/ModalChangeRow';
import _ from 'lodash';
import { MainItem, useAutomatization } from 'entities/automatization';
import { useServiceDesk } from 'entities/service-desk';
import { calcMbCostAll, makeDataForBigTable, makeDataFromGoogle } from 'utils/make-data-for-bigtable';
import { changePointToComma, makeResultForFinishTable } from 'utils/make-result-for-finish-table';
import { getValueOrZero } from 'shared/helpers/numbers';
import { BigTableHeader as Header } from './header';
import { BigTableTableHead } from './table-head';
import { BigTableTableBody } from './table-body';



export interface Sorted {
	sortType   : 'asc' | 'desc'
	sortField  : typeof BIG_TITLE[number] // поле по умолчанию
	row        : MainItem | null 					// нажатая выбранная строка
}

export const BigTable: FC = () => {
	const { factura, mbPrice, arrForBigTable, spTrafficAll, setMbCostAll, setArrForBigTable, setArrResult } = useAutomatization();
	const { serviceDeskData } = useServiceDesk();
	
	const [tableArr, setTableArr] = useState(arrForBigTable);
	const [tableArrFiltred, setTableArrFiltred] = useState(arrForBigTable);
	const [isModal, setIsModal] = useState(false);
	const [searchText, setSearchText] = useState(''); // Поиск по SiteID
	const [sorted, setSorted] = useState<Sorted>({
		sortType   : 'asc',    // 'desc'
		sortField  : 'siteID', // поле по умолчанию
		row        : null 	   // нажатая выбранная строка
	});
	
	useEffect(() => {
		setTableArr(arrForBigTable);
		setTableArrFiltred(arrForBigTable);
	},
		[arrForBigTable]
	);
	
	
	useEffect(() => {
		console.log('BigTable useEffect!!!');

    // Обновляем "Сводную таблицу" обновлёнными значениями из данных сч/ф mbCostServicies - пересчитываем
		let mbCostAll = calcMbCostAll(serviceDeskData as MainItem[]);

    // Рассчитываем Затраты скорректированные
    const { newArrForBigTable } = makeDataForBigTable(serviceDeskData as MainItem[], factura, mbCostAll, spTrafficAll);

		const newArrForBigTable_2 = makeDataFromGoogle(tableArr, newArrForBigTable);
		
    // Рассчитываем данные для "Итоговой таблицы Анализа и 1C"
    const { arrResult } = makeResultForFinishTable(newArrForBigTable_2);

    // Меняем точку на запятую в итоговой ячейке "Сводной таблицы"
    const lastBigStore = changePointToComma(newArrForBigTable_2, 'result');

		setArrForBigTable(lastBigStore);
    setMbCostAll(mbCostAll);
    setArrResult(arrResult);
	},
		[factura, spTrafficAll, serviceDeskData, setArrForBigTable, setArrResult, setMbCostAll]
	);
	
	
	// При выходе из Search поле очищается
	const handleSearchClear = useCallback(() => {
		setSearchText('');
		setTableArrFiltred(tableArr); // Возвращаем целый  массив
	},
		[tableArr, setSearchText, setTableArrFiltred]
	);

	// Обрабатываем закрытие модального окна
	const handleModalOut = useCallback((obj: MainItem) => {
		if (obj) {
			let newObj = {} as MainItem;
			newObj.siteID          = obj.siteID   		  || '';
			newObj.project         = obj.project  		  || 0;
			newObj.organization    = obj.organization   || '';
			newObj.mbPrice         = mbPrice;
			newObj.mbTraffic       = +obj.mbTraffic     || 0;
			newObj.mbCostServicies = getValueOrZero(obj.mbCostServicies);
			newObj.mbCostTraffic   = getValueOrZero(obj.mbCostTraffic);
			newObj.mbCostCorrect   = getValueOrZero(obj.mbCostCorrect);
			newObj.spTraffic       = getValueOrZero(obj.spTraffic);
			newObj.spCostTraffic   = getValueOrZero(obj.spCostTraffic);
			newObj.result          = getValueOrZero(obj.result);

			let newArr = [];
			// Проверяем внесли ли изменения в существующий SiteID
			let result = tableArr.findIndex(item => item.siteID.toUpperCase() === obj.siteID.toUpperCase());
			// console.log('result: ', result);
			if (result !== -1) {
				// console.log(`Old Row`);
				newArr = [...tableArr.slice(0, result), newObj, ...tableArr.slice(result + 1)];
			}
			else {
				// console.log(`New Row`);
				newArr = [newObj, ...tableArr.slice(1)];
			}

			setTableArr(newArr);
		};
		
		setIsModal(false);
		setTimeout(() => handleSearchClear(), 0); // Очищаем строку поиска
	},
		[tableArr, mbPrice, setIsModal, setTableArr]
	);


	return (
		<div className='section'>
			<div className='centerBox'>
				{/* <form> */}
				<Header
					tableArr  				   = {tableArr}
					onSearchText 				 = {searchText}
					onSetTableArr 			 = {setTableArr}
					onSetTableArrFiltred = {setTableArrFiltred}
					onSetSearchText      = {setSearchText}
				/>

				{/* Редактирование строки */}
				{isModal && <ModalChangeRow
					element   		  = {sorted.row}
					serviceDeskData = {serviceDeskData}
					callback  		  = {handleModalOut}
				/>}

				<table className='tableFixedHead'>
					<BigTableTableHead
						sorted               = {sorted}
						tableArrFiltred      = {tableArrFiltred}
						onSetSorted          = {setSorted}
						onSetTableArrFiltred = {setTableArrFiltred}
					/>
					<BigTableTableBody
						sorted 				    	 = {sorted}
						tableArr          	 = {tableArr}
						tableArrFiltred   	 = {tableArrFiltred}
						onSetIsModal      	 = {setIsModal}
						onSetSorted       	 = {setSorted}
						onSetTableArr     	 = {setTableArr}
						onSearchClear     	 = {handleSearchClear}
						onSetTableArrFiltred = {setTableArrFiltred}
					/>
				</table>
				{/* </form> */}
			</div>
		</div>
	)
}
