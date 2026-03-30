import { FC, useCallback } from 'react';
import _ from 'lodash';
import { MainItem } from 'entities/automatization';
import { Sorted } from '..';
import { emptyIfUndefined } from 'shared/helpers/strings';
import './index.scss'; 



interface Props {
	sorted 				       : Sorted
	tableArr 			       : MainItem[]
	tableArrFiltred      : MainItem[]
	onSetIsModal         : (isModal: boolean) => void
	onSetSorted          : (sorted: Sorted) => void
	onSetTableArr        : (arr: MainItem[]) => void
	onSetTableArrFiltred : (arr: MainItem[]) => void
	onSearchClear        : () => void
}

export const BigTableTableBody: FC<Props> = ({
	sorted, tableArr, tableArrFiltred, onSetIsModal, onSetSorted, onSetTableArr, onSearchClear, onSetTableArrFiltred
}) => {

	// Изменение индивидуальных значений сч/ф
	// Меняем в tableArr но ищем пришедший ID из tableArrFiltred
	const handleChangeItem = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		const target = event.target;
		const filtredIndex = parseInt(event.target.id, 10);
		
		if (isNaN(filtredIndex)) {
			return;
		}
		const filtredSiteId = tableArrFiltred[filtredIndex].siteID;
		
		const idx  		   = tableArr.findIndex(item => item.siteID === filtredSiteId);
		const idxFiltred = tableArrFiltred.findIndex(item => item.siteID === filtredSiteId);
		if (idx === -1 || idxFiltred === -1) {
			return
		}

		const obj = { ...tableArrFiltred[idxFiltred] };

		switch (target.name) {
			case 'siteID':
				obj.siteID = target.value;
				break;

			case 'project':
				obj.project = Number(target.value);
				break;

			case 'organization':
				obj.organization = target.value;
				break;

			case 'mbCostServicies':
				obj.mbCostServicies = Number(target.value);
				break;
	
			default: break;
		};
		
		onSetTableArr([...tableArr.slice(0, idx), obj, ...tableArr.slice(idx + 1)]);
		onSetTableArrFiltred([...tableArrFiltred.slice(0, idxFiltred), obj, ...tableArrFiltred.slice(idxFiltred + 1)]);
	},
		[tableArr, tableArrFiltred, onSetTableArr, onSetTableArrFiltred]
	);


	// Устанавливаем выбранную строку
	const handleRowSelect = useCallback((row: MainItem) => {
		onSetSorted({ ...sorted, row });
		onSetIsModal(true); // Открываем модальное окно
	},
		[sorted, onSetSorted, onSetIsModal]
	);


	return (
		<tbody>
			{tableArrFiltred.map( (item, i) => (
				<tr key={item.siteID + i}>
					<td
						className='widthSiteId'
						onClick={() => handleRowSelect(item)}
					>
						{item.siteID}
					</td>
					<td
						className='widthProject'
						onClick={() => handleRowSelect(item)}
					>
						{item.project}
					</td>
					<td
						className='tdOrganization widthOrganization'
						onClick={() => handleRowSelect(item)}
					>
						{item.organization}
					</td>
					<td className='widthMbPrice'>{item.mbPrice}</td>
					<td className='widthFactura'>
						<input 
							id 				= {String(i)}
							className = 'inpMbCostServicies'
							type      = 'number'
							name      = 'mbCostServicies'
							value     = {emptyIfUndefined(item.mbCostServicies)}
							onChange  = {handleChangeItem}
							onBlur    = {onSearchClear}
						/>
					</td>
					<td className='widthMbTraffic'>{item.mbTraffic}</td>
					<td className='widthMbTrafficCost'>{item.mbCostTraffic ? item.mbCostTraffic : 0}</td>
					<td className='widthCostCorrect'>{item.mbCostCorrect}</td>
					<td className='widthSpTraffic'>{item.spTraffic}</td>
					<td className='widthSpTrafficCost'>{item.spCostTraffic}</td>
					<td className='widthCostResult'>{item.result || 0}</td>
				</tr>
				))}
		</tbody>
	)
}
