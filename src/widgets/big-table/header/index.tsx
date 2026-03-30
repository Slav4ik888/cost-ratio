import React, {FC, useCallback} from 'react';
import { MainItem, useAutomatization } from 'entities/automatization';
import { useServiceDesk } from 'entities/service-desk';
import { calcMbCostAll, makeDataForBigTable } from 'utils/make-data-for-bigtable';
import { changePointToComma, makeResultForFinishTable } from 'utils/make-result-for-finish-table';
import './index.scss'; 



interface Props {
	tableArr             : MainItem[]
	onSearchText         : string
	onSetTableArr        : (arr: MainItem[]) => void
	onSetTableArrFiltred : (arr: MainItem[]) => void
	onSetSearchText      : (text: string) => void
}

export const BigTableHeader: FC<Props> = ({ tableArr, onSearchText, onSetTableArrFiltred, onSetTableArr, onSetSearchText }) => {
	const { factura, mbPrice, spTrafficAll, setMbCostAll, setArrForBigTable, setArrResult } = useAutomatization();
	const { serviceDeskData, serviceGetServiceDeskData } = useServiceDesk();
	
	/**
	 * Обновляем все данные по нажатию кнопки
	 * Меняем значения на обновлённые и пересчитываем итоговые значения
	 */
  const handleUpdate = useCallback(() => {
    // Обновляем "Сводную таблицу"  обновлёнными значениями из данных сч/ф mbCostServicies - пересчитываем
    let mbCostAll = calcMbCostAll(tableArr);
    // Рассчитываем Затраты скорректированные
    let {newArrForBigTable} = makeDataForBigTable(tableArr, factura, mbCostAll, spTrafficAll);

    // Рассчитываем данные для "Итоговой таблицы Анализа и 1C"
    const { arrResult } = makeResultForFinishTable(newArrForBigTable);

    // Меняем точку на запятую в итоговой ячейке "Сводной таблицы"
    const lastBigStore = changePointToComma(newArrForBigTable, 'result');

		setArrForBigTable(lastBigStore);
		setArrResult(arrResult);
		setMbCostAll(mbCostAll);
	},
		[tableArr, spTrafficAll, setArrForBigTable, setArrResult, setMbCostAll]
	);


	// Обновляем с гугл таблицы по нажатию кнопки
	// Обновляем все данные при повторном запроосе к Google
	const handleUpdateFromGoogle = useCallback(async () => {
		serviceGetServiceDeskData();
	},
		[serviceDeskData, serviceGetServiceDeskData]
	);

	// Поиск в таблице по SiteID
	const handleSearchItem = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		const arr = [] as any[];
		
		tableArr.forEach((item, i) => {
			const searchValue = value.toLowerCase();
			
			const siteIDMatch = item.siteID && item.siteID.toLowerCase().includes(searchValue);
			const organizationMatch = item.organization && item.organization.toLowerCase().includes(searchValue);
			// const projectMatch = item.project && item.project.toLowerCase().includes(searchValue); // если нужно включить project
			
			if (siteIDMatch || organizationMatch) {
				arr.push(item);
			}
		});
	
		onSetSearchText(value);
		onSetTableArrFiltred(arr);
	},
		[tableArr, onSetTableArrFiltred, onSetSearchText]
	);

	// Добавляем новую строку
	const handleAddRow = useCallback(() => {
		const newArr: MainItem[] = [{
			siteID          : '',
			project         : 0,
			organization    : '',
			mbPrice,
			mbTraffic       : 0,
			mbCostServicies : undefined,
			mbCostTraffic   : 0,
			mbCostCorrect   : 0,
			spTraffic       : 0,
			spCostTraffic   : 0,
			result          : 0,
			image           : '',
			title           : '',
			description     : '',
			price           : '',
			sumMbCost       : undefined,
			sumSpCost       : undefined
		}, ...tableArr];

		onSetTableArr(newArr);
		onSetTableArrFiltred(newArr);
	},
		[mbPrice, tableArr, onSetTableArr, onSetTableArrFiltred]
	);
	

	return (
		<>
			<div className='capt'>Сводная таблица</div>

			<div className='buttonsSprite'>
				<input
					className    = 'butAdd'
					type         = 'button'
					value        = '+ строку' 
					onClick      = {handleAddRow}
				/>
				<input
					className    = 'butUpdate'
					type         = 'button'
					value        = 'Пересчитать' 
					onClick      = {handleUpdate}
				/>
				<input
					className    = 'butSearch'
					type         = 'text' 
					name         = 'search'
					placeholder  = 'Поиск по SiteID'
					value        = {onSearchText}
					autoComplete = 'off'
					onChange     = {handleSearchItem}
				/>
				<input
					className    = 'butUpdate'
					type         = 'button'
					value        = 'Синхронизировать данные с ServiceDesk'
					onClick      = {handleUpdateFromGoogle}
				/>
			</div>
		</>
	)
}
